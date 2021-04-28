import React from "react";
import { StyleSheet } from "react-native";

import Divider from "./../common/Divider";
import TypeSelect from "./TypeSelect";
import PlayerSelect from "./PlayerSelect";
import BlockButton from "./../button/BlockButton";
import InitialValue from "./InitialValue";

function CreationForm({
  type,
  setType,
  initialValue,
  setInitialValue,
  numberOfPlayers,
  setNumberOfPlayers,
  onNext,
}) {
  return (
    <>
      <TypeSelect type={type} setType={setType} />
      <Divider />
      {type === "countdown" && (
        <>
          <InitialValue value={initialValue} setValue={setInitialValue} />
          <Divider />
        </>
      )}
      <PlayerSelect
        numberOfPlayers={numberOfPlayers}
        setNumberOfPlayers={setNumberOfPlayers}
      />
      <Divider />
      <BlockButton title="Enter Names" color="btnInfo" onPress={onNext} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CreationForm;
