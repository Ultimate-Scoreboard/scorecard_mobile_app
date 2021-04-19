import React from "react";
import { StyleSheet, View } from "react-native";

import BlockButton from "./../button/BlockButton";
import Divider from "./../common/Divider";

function ScorecardSettings({ onResetScore }) {
  return (
    <>
      <BlockButton title="Reset Scores" onPress={onResetScore} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ScorecardSettings;
