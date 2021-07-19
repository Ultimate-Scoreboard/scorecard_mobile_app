import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";

import BlockButton from "./../button/BlockButton";
import BasicModal from "../common/BasicModal";
import AppInput from "./../form/AppInput";
import SecondaryHeader from "./../text/SecondaryHeader";
import { allowables } from "../../functions";

function EnterPlayers({
  players,
  onEditPlayer,
  onResetNames,
  onConfirm,
  visible,
  setVisible,
}) {
  let refs = [];
  players.forEach(() => {
    refs.push(useRef(null));
  });

  const handleNextField = (index, finalField) => {
    if (finalField) return;
    refs[index + 1].current.focus();
  };

  return (
    <BasicModal
      visible={visible}
      setVisible={setVisible}
      header={<SecondaryHeader>Enter Player/Team Names</SecondaryHeader>}
      footer={
        allowables.devicePlatform() === "android" && (
          <BlockButton
            title="Start"
            color="btnInfo"
            onPress={() => onConfirm("players")}
          />
        )
      }
    >
      {players.map((p, i) => {
        const finalField = i === players.length - 1;
        return (
          <AppInput
            key={i}
            autoFocus={i === 0}
            value={p.name}
            onChangeText={(value) => onEditPlayer(value, i)}
            placeholder={`Player ${String(i + 1)}`}
            keyboardType="default"
            forwardedRef={refs[i]}
            onSubmitEditing={() => handleNextField(i, finalField)}
            returnKeyType={finalField ? "done" : "next"}
            blurOnSubmit={finalField}
          />
        );
      })}
      <View style={{ height: 15 }} />
      <BlockButton
        title="Reset Names"
        color="btnLight"
        onPress={onResetNames}
        size="small"
      />
    </BasicModal>
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
