import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import AppText from "../text/AppText";
import Divider from "../common/Divider";
import Score from "./Score";
import { clicks, defaultStyles } from "../../config";

function Names({ score, setScore, selectedPlayer, setSelectedPlayer, type }) {
  const handleSelectPlayer = (index) => {
    if (selectedPlayer === index) setSelectedPlayer(null);
    else setSelectedPlayer(index);
  };

  return (
    <>
      <Divider />
      {score.map((p, i) => {
        const isSelected = selectedPlayer === i;
        return (
          <View key={i}>
            <TouchableOpacity
              style={[
                styles.container,
                isSelected
                  ? { backgroundColor: defaultStyles.colors.info }
                  : {},
              ]}
              key={i}
              activeOpacity={clicks.clickOpacity}
              onPress={() => handleSelectPlayer(i)}
            >
              <View style={[styles.text, styles.name]}>
                <AppText
                  style={[
                    styles.text,
                    isSelected ? { color: defaultStyles.colors.holdLight } : {},
                  ]}
                >
                  {p.name}
                </AppText>
              </View>
              <View style={[styles.text, styles.score]}>
                <Score player={p} type={type} isSelected={isSelected} />
              </View>
            </TouchableOpacity>
            <Divider />
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  name: {
    flex: 0.7,
  },
  score: {
    flex: 0.3,
  },
  text: {
    fontWeight: "bold",
    marginLeft: 15,
    marginRight: 5,
  },
});

export default Names;
