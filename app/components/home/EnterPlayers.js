import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";

import BlockButton from "./../button/BlockButton";
import BasicModal from "../common/BasicModal";
import AppInput from "./../form/AppInput";
import SecondaryHeader from "./../text/SecondaryHeader";

function EnterPlayers({
  players,
  onEditPlayer,
  onResetNames,
  onConfirm,
  visible,
  setVisible,
}) {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const refs = [ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8];

  const handleNextField = (index, finalField) => {
    if (finalField) return;
    refs[index + 1].current.focus();
  };

  return (
    <BasicModal
      visible={visible}
      setVisible={setVisible}
      header={<SecondaryHeader>Enter Player/Team Names</SecondaryHeader>}
      footer={<BlockButton title="Start" color="btnInfo" onPress={onConfirm} />}
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
        color="btnPrimary"
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
