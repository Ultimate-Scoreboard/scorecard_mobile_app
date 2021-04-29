import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import AppText from "./../text/AppText";
import { defaultStyles, clicks } from "../../config";
import { allowables } from "../../functions";
import RoundedButton from "./../button/RoundedButton";

function SavedCard({ card, index, onSelect, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const highScore = card.score.reduce((acc, cur) => {
    if (card.type === "countdown")
      return cur.points[0].points < acc.points[0].points ? cur : acc;
    return cur.points[0].points > acc.points[0].points ? cur : acc;
  });

  const getScores = () => {
    let score = [...card.score];
    score = score.sort((a, b) => {
      let x = 0;
      if (a.points[0].points > b.points[0].points) x = -1;
      else x = 1;
      if (card.type === "countdown") x = x * -1;
      return x;
    });
    return score;
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={clicks.clickOpacity}
        onPress={() => setExpanded(!expanded)}
        style={[
          styles.header,
          index % 2 === 0 ? styles.evenHeader : styles.oddHeader,
          expanded ? styles.expanded : {},
        ]}
      >
        <AppText
          style={[styles.cardTitle, expanded ? styles.expandedText : {}]}
        >
          {allowables.convertTimestamp(card.date)} -{" "}
          {allowables.capLetterOne(card.type)} - {card.numberOfPlayers} Players
        </AppText>
        <AppText
          style={[styles.secondaryTitle, expanded ? styles.expandedText : {}]}
        >
          Best Score: {highScore.name} - {highScore.points[0].points} points
        </AppText>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.container}>
          <View style={{ flex: 0.7 }}>
            {getScores().map((p) => {
              return (
                <AppText key={p.id} style={styles.player}>
                  {p.name}: {p.points[0].points}
                </AppText>
              );
            })}
          </View>
          <View style={{ flex: 0.15 }}>
            <RoundedButton
              icon={{ icon: "file-download", iconType: "material" }}
              size="small"
              color="btnSuccess"
              onPress={() => onSelect(card)}
            />
          </View>
          <View style={{ flex: 0.15 }}>
            <RoundedButton
              icon={{ icon: "delete", iconType: "material" }}
              size="small"
              color="btnLight"
              onPress={() => onDelete(card)}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  header: {
    paddingVertical: 10,
  },
  evenHeader: {
    backgroundColor: defaultStyles.colors.muted,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  secondaryTitle: {
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  player: {
    marginHorizontal: 25,
  },
  expanded: {
    backgroundColor: defaultStyles.colors.info,
  },
  expandedText: {
    color: defaultStyles.colors.holdLight,
  },
});

export default SavedCard;
