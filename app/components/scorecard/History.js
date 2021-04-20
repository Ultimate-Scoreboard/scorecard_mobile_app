import React, { useState, useContext } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import Divider from "../common/Divider";

import AppText from "./../text/AppText";
import { allowables } from "../../functions";
import { clicks, defaultStyles } from "../../config";
import AppInput from "./../form/AppInput";
import RoundedButton from "./../button/RoundedButton";
import SettingsContext from "./../../context/settingsContext";

function History({ score, onCompleteEdit }) {
  const { showRounds } = useContext(SettingsContext);
  const [edit, setEdit] = useState(null);
  const [editedScore, setEditedScore] = useState("");
  const highestRound = new Array(
    score.map((p) => p.history.length).reduce((p, c) => (p > c ? p : c))
  ).fill(null);

  const cancelEdit = () => {
    setEdit(null);
    setEditedScore("");
  };

  const editScore = (player, index) => {
    onCompleteEdit(player, index, editedScore);
    cancelEdit();
  };

  return (
    <View style={styles.container}>
      {showRounds && (
        <View style={styles.round}>
          <AppText style={[styles.headerText, styles.smallHeaderText]}>
            Round
          </AppText>
          <Divider />
          <AppText
            style={[
              styles.headerText,
              styles.smallHeaderText,
              styles.totalHeader,
            ]}
          >
            Total
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
      )}
      <ScrollView style={styles.view} horizontal={true}>
        {score.map((p) => {
          const addingScore =
            edit &&
            edit.player._id === p._id &&
            edit.index === p.history.length;
          return (
            <View key={p._id}>
              <View style={styles.column} key={p._id}>
                <AppText style={styles.headerText}>
                  {allowables.truncName(p.name)}
                </AppText>
                <Divider />
                <AppText style={[styles.headerText, styles.totalHeader]}>
                  {p.points[0].points}
                </AppText>
                <Divider />
                {p.history.map((h, i) => {
                  const editing =
                    edit && edit.player._id === p._id && edit.index === i;
                  return editing ? (
                    <View key={i} style={styles.container}>
                      <AppInput
                        autoFocus={true}
                        value={editedScore}
                        onChangeText={(value) => setEditedScore(value)}
                        placeholder=""
                        keyboardType="numeric"
                        onSubmitEditing={() => editScore(p, i)}
                        returnKeyType="done"
                        blurOnSubmit={true}
                        onEndEditing={cancelEdit}
                        style={{ height: 40 }}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      key={i}
                      activeOpacity={clicks.clickOpacity}
                      onPress={() => setEdit({ player: p, index: i })}
                    >
                      <AppText style={styles.text}>{h.points}</AppText>
                      <Divider />
                    </TouchableOpacity>
                  );
                })}
                {addingScore ? (
                  <AppInput
                    autoFocus={true}
                    value={editedScore}
                    onChangeText={(value) => setEditedScore(value)}
                    placeholder=""
                    keyboardType="numeric"
                    onSubmitEditing={() => editScore(p, p.history.length)}
                    returnKeyType="done"
                    blurOnSubmit={true}
                    onEndEditing={cancelEdit}
                  />
                ) : (
                  <TouchableOpacity
                    activeOpacity={clicks.clickOpacity}
                    onPress={() =>
                      setEdit({ player: p, index: p.history.length })
                    }
                  >
                    <AppText style={styles.text}></AppText>
                    <Divider />
                  </TouchableOpacity>
                )}
              </View>
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
    marginHorizontal: 0,
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
  totalHeader: {
    height: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
  },
  smallHeaderText: {
    fontSize: 12,
  },
  miniButton: {
    justifyContent: "center",
    zIndex: 99,
  },
});

export default History;
