import React from "react";
import { StyleSheet } from "react-native";

import { defaultStyles } from "../../config";
import AppText from "./../text/AppText";

function Score({ player, type, isSelected }) {
  if (!player.points) return null;
  const pointsDisplay = type === "sets" ? 0 : player.points[0].points;

  return (
    <AppText
      style={[
        styles.text,
        ,
        isSelected ? { color: defaultStyles.colors.holdLight } : {},
      ]}
    >
      {pointsDisplay}
    </AppText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    marginLeft: 15,
    marginRight: 5,
  },
});

export default Score;
