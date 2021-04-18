import React from "react";
import { StyleSheet, View } from "react-native";

import HorizontalIncrementer from "./../form/HorizontalIncrementer";

function PlayerSelect({ numberOfPlayers, setNumberOfPlayers }) {
  return (
    <HorizontalIncrementer
      value={numberOfPlayers}
      setValue={setNumberOfPlayers}
      increment={1}
      min={1}
      max={8}
      header="Number of players/teams"
    />
  );
}

const styles = StyleSheet.create({});

export default PlayerSelect;
