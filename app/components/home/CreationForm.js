import React from "react";
import { StyleSheet } from "react-native";

import Divider from "./../common/Divider";
import TypeSelect from "./TypeSelect";
import PlayerSelect from "./PlayerSelect";
import BlockButton from "./../button/BlockButton";

function CreationForm({
  type,
  setType,
  numberOfPlayers,
  setNumberOfPlayers,
  onNext,
}) {
  return (
    <>
      <TypeSelect type={type} setType={setType} />
      <Divider />
      <PlayerSelect
        numberOfPlayers={numberOfPlayers}
        setNumberOfPlayers={setNumberOfPlayers}
      />
      <Divider />
      <BlockButton title="Enter Players" color="btnInfo" onPress={onNext} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CreationForm;
