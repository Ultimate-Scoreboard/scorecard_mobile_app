import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import Divider from "../common/Divider";

import AppText from "./../text/AppText";
import { allowables } from "../../functions";
import { clicks } from "../../config";

function History({ score, onSelect }) {
  console.log(score);
  const highestRound = new Array(
    score.map((p) => p.history.length).reduce((p, c) => (p > c ? p : c))
  ).fill(null);
  return (
    <View style={styles.container}>
      <View style={styles.round}>
        <AppText style={[styles.headerText, styles.smallHeaderText]}>
          Round
        </AppText>
        <Divider />
        {highestRound.map((r, i) => {
          return (
            <View key={i}>
              <AppText style={styles.text}>{i + 1}</AppText>
              <Divider />
            </View>
          );
        })}
      </View>
      <ScrollView style={styles.view} horizontal={true}>
        {score.map((p) => {
          return (
            <View style={styles.column} key={p._id}>
              <AppText style={styles.headerText}>
                {allowables.truncName(p.name)}
              </AppText>
              <Divider />
              {p.history.map((h, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={clicks.clickOpacity}
                    onPress={() => onSelect(p, i)}
                  >
                    <AppText style={styles.text}>{h.points}</AppText>
                    <Divider />
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  view: { flex: 1 },
  column: {
    marginTop: 10,
    width: 80,
    marginHorizontal: -5,
  },
  round: {
    marginTop: 10,
    width: 40,
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    height: 40,
  },
  text: {
    textAlign: "center",
  },
  smallHeaderText: {
    fontSize: 12,
  },
});

export default History;
