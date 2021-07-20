import React, { useRef, useEffect, useState } from "react";
import { View } from "react-native";

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
  const itemsRef = useRef([]);
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, players.length);
  }, [players.length]);

  const handleNextField = (index, finalField) => {
    if (finalField) return;
    itemsRef.current[index + 1].focus();
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
            forwardedRef={(r) => (itemsRef.current[i] = r)}
            onSubmitEditing={() => handleNextField(i, finalField)}
            returnKeyType={
              finalField || allowables.devicePlatform() === "ios"
                ? "done"
                : "next"
            }
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

export default EnterPlayers;
