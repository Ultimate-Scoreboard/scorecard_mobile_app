import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import AppText from "../text/AppText";
import Divider from "../common/Divider";
import Score from "./Score";
import { clicks, defaultStyles } from "../../config";
import Incrementer from "./Incrementer";
import IconRender from "./../icon/IconRender";
import SettingsContext from "./../../context/settingsContext";
import Tally from "./Tally";

function Names({
  score,
  setScore,
  selectedPlayer,
  setSelectedPlayer,
  type,
  sortColumn,
  onSort,
}) {
  const { theme } = useContext(SettingsContext);
  const handleSelectPlayer = (_id) => {
    if (selectedPlayer === _id) setSelectedPlayer(null);
    else setSelectedPlayer(_id);
  };

  const renderSortIcon = (col) => {
    if (col !== sortColumn.path) return null;
    let icon = "caret-down";
    if (sortColumn.order === "asc") icon = "caret-up";
    return <IconRender icon={icon} iconType="font" color={theme.color} />;
  };

  const ScoreComponent =
    type === "incrementer" ? Incrementer : type === "tally" ? Tally : null;

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles._id}
          activeOpacity={clicks.clickOpacity}
          onPress={() => onSort("_id")}
        >
          <View style={styles.container}>
            <View style={styles.name}>
              <AppText style={styles.header}></AppText>
            </View>
            <View style={[styles.socre, styles.icon]}>
              {renderSortIcon("_id")}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.name}
          activeOpacity={clicks.clickOpacity}
          onPress={() => onSort("name")}
        >
          <View style={styles.container}>
            <View style={styles.name}>
              <AppText style={styles.header}>Name</AppText>
            </View>
            <View style={[styles.score, styles.icon]}>
              {renderSortIcon("name")}
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.score}
          activeOpacity={clicks.clickOpacity}
          onPress={() => onSort("points")}
        >
          <View style={styles.container}>
            <View style={styles.name}>
              <AppText style={styles.header}>Points</AppText>
            </View>
            <View style={[styles.score, styles.icon]}>
              {renderSortIcon("points")}
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Divider />
      {score.map((p, i) => {
        const isSelected = selectedPlayer === p._id;
        return (
          <View key={i}>
            <TouchableOpacity
              style={[
                styles.container,
                isSelected
                  ? { backgroundColor: defaultStyles.colors.info }
                  : {},
              ]}
              key={i}
              activeOpacity={clicks.clickOpacity}
              onPress={() => handleSelectPlayer(p._id)}
            >
              <View style={[styles.text, styles._id]}>
                <AppText
                  style={[
                    styles.smallText,
                    isSelected ? { color: defaultStyles.colors.holdLight } : {},
                  ]}
                >
                  {p._id + 1}
                </AppText>
              </View>
              <View style={[styles.text, styles.name]}>
                <AppText
                  style={[
                    styles.text,
                    isSelected ? { color: defaultStyles.colors.holdLight } : {},
                  ]}
                >
                  {p.name}
                </AppText>
              </View>
              <View style={[styles.text, styles.score]}>
                <Score player={p} type={type} isSelected={isSelected} />
              </View>
            </TouchableOpacity>
            {isSelected && (
              <ScoreComponent
                score={score}
                setScore={setScore}
                selectedPlayer={i}
              />
            )}
            <Divider />
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  _id: {
    flex: 0.1,
  },
  name: {
    flex: 0.6,
  },
  score: {
    flex: 0.3,
  },
  text: {
    fontWeight: "bold",
    marginLeft: 15,
    marginRight: 5,
  },
  header: {
    paddingTop: 5,
    textAlign: "center",
  },
  icon: {
    alignItems: "flex-start",
  },
  smallText: {
    fontSize: 14,
  },
});

export default Names;
