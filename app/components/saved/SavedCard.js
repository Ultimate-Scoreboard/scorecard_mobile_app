import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import AppText from "./../text/AppText";
import { defaultStyles, clicks } from "../../config";
import { allowables } from "../../functions";
import RoundedButton from "./../button/RoundedButton";

function SavedCard({ card, onSelect, onDelete, expandAll }) {
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
        style={styles.header}
      >
        <AppText style={styles.cardTitle}>
          {allowables.convertTimestamp(card.date)} -{" "}
          {allowables.capLetterOne(card.type)} - {card.numberOfPlayers} Players
        </AppText>
        <AppText style={styles.secondaryTitle}>
          {card.type === "countdown" ? "Low" : "High"} Score: {highScore.name} -{" "}
          {highScore.points[0].points} points
        </AppText>
      </TouchableOpacity>
      {(expanded || expandAll) && (
        <View style={styles.container}>
          <View style={{ flex: 0.7 }}>
            {getScores().map((p) => {
              return (
                <View style={styles.container} key={p._id}>
                  <View style={{ flex: 0.7 }}>
                    <AppText key={p._id} style={styles.playerName}>
                      {p.name}
                    </AppText>
                  </View>
                  <View style={{ flex: 0.3 }}>
                    <AppText key={p._id} style={styles.playerPoints}>
                      {p.points[0].points}
                    </AppText>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={{ flex: 0.15 }}>
            <RoundedButton
              icon={{ icon: "open-in-app", iconType: "material" }}
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
    marginVertical: 3,
    backgroundColor: defaultStyles.colors.muted,
  },
  cardTitle: {
    fontWeight: "bold",
    marginHorizontal: 10,
    color: defaultStyles.colors.holdDark,
  },
  secondaryTitle: {
    marginHorizontal: 20,
    fontSize: 17,
    color: defaultStyles.colors.holdDark,
  },
  playerName: {
    marginLeft: 15,
    fontSize: 16,
    textAlign: "right",
    marginRight: 25,
  },
  playerPoints: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SavedCard;
