import React from "react";
import { StyleSheet, View } from "react-native";

import BlockButton from "./../button/BlockButton";
import Divider from "./../common/Divider";
import AppText from "./../text/AppText";
import Sharing from "./Sharing";

function ScorecardSettings({ onResetScore, onSave }) {
  return (
    <>
      <Divider />
      <BlockButton title="Reset Scores" onPress={onResetScore} />
      <Divider />
      <BlockButton title="Save this Card" onPress={onSave} />
      <Divider />
      <Sharing />
      <Divider />
      <AppText style={styles.header}>Help</AppText>
      <AppText style={styles.miniHeader}>Update Names</AppText>
      <AppText style={styles.text}>
        From the main tab you can update a player by long pressing on their
        name. This will bring up the player name edit box. Enter the new name
        and tap done. Tap on any player to get back to updating scores.
        {"\n"}
      </AppText>
      <AppText style={styles.miniHeader}>Incrementer Scorecards</AppText>
      <AppText style={styles.text}>
        Tap the player's name whose score you need to change, and use the left
        and right arrows to add or remove points. A long press on either arrow
        will increment or decrement the score by 10 points.
        {"\n"}
        Tap the player name again to deselect them and hide the incrementer.
        {"\n"}
      </AppText>
      <AppText style={styles.miniHeader}>Countdown & Tally Scorecards</AppText>
      <AppText style={styles.text}>
        There are a couple ways to update this type of scorecard. The simplest
        way is on the main tab. Tap the player you need to update, enter their
        score for the round and hit Done on your keyboard.
        {"\n"}
        If you need to edit a score from a previous round you can do so on the
        history tab. Select the score you want to edit to bring up the input.
        Enter the new score for the round and tap Done. If you want to delete
        that round entirely just leave the input blank and hit done. You will be
        asked to confirm and the round will be deleted. Any rounds remaining
        after the deleted round will shift up by one.
        {"\n"}
        You can also enter new round scores from the history tab by tapping the
        area below the last round for a player.
        {"\n"}
      </AppText>
      <AppText style={styles.miniHeader}>Sorting</AppText>
      <AppText style={styles.text}>
        From the main tab you can sort by Name, Total Points or order in which
        you entered the names by tapping on the header. Tap again to reverse the
        sort order.
        {"\n"}
        For Tally scorecards this order will also apply to the history tab.
        {"\n"}
        {"\n"}
      </AppText>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontSize: 14,
    marginRight: 5,
  },
  miniHeader: {
    marginHorizontal: 15,
    fontWeight: "bold",
    fontSize: 18,
  },
  header: {
    marginHorizontal: 15,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 5,
  },
});

export default ScorecardSettings;
