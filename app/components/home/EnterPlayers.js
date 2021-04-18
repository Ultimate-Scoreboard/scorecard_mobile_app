import React from "react";
import { StyleSheet, View } from "react-native";

import BlockButton from "./../button/BlockButton";
import Divider from "./../common/Divider";
import AppInput from "./../form/AppInput";
import SecondaryHeader from "./../text/SecondaryHeader";

function EnterPlayers({
  onPrevious,
  type,
  players,
  onEditPlayer,
  onResetNames,
  onConfirm,
}) {
  return (
    <>
      <SecondaryHeader>Enter Player/Team Names</SecondaryHeader>
      <View style={styles.container}>
        <View style={styles.back}>
          <BlockButton
            title="Back"
            color="btnPrimary"
            onPress={onPrevious}
            size="small"
          />
        </View>
        <View style={styles.reset}>
          <BlockButton
            title="Reset Names"
            color="btnPrimary"
            onPress={onResetNames}
            size="small"
          />
        </View>
      </View>
      {players.map((p, i) => {
        return (
          <AppInput
            key={i}
            value={p.name}
            onChangeText={(value) => onEditPlayer(value, i)}
            placeholder="Player/Team Name"
            keyboardType="default"
          />
        );
      })}
      <BlockButton title="Start" color="btnInfo" onPress={onConfirm} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  back: {
    flex: 0.4,
  },
  reset: {
    flex: 0.6,
  },
});

export default EnterPlayers;
