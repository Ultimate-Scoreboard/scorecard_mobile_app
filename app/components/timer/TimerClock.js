import React from "react";
import { StyleSheet, View } from "react-native";

import RoundedButton from "../button/RoundedButton";
import { allowables } from "../../functions";
import { defaultStyles } from "../../config";
import AppText from "../text/AppText";

function TimerClock({
  timeRemaining,
  timerStarted,
  setTimerStarted,
  resetTime,
  timesUp,
}) {
  return (
    <View style={[styles.container, timesUp ? styles.timesUp : {}]}>
      <>
        <View style={styles.stop}>
          <RoundedButton
            icon={{
              icon: timerStarted ? "pause-circle" : "play-circle",
              iconType: "material",
            }}
            onPress={() => setTimerStarted(!timerStarted)}
            size="small"
            color={timerStarted ? "btnLight" : "btnSuccess"}
          />
        </View>
        <View style={styles.next}>
          <RoundedButton
            icon={{ icon: "skip-next-outline", iconType: "material" }}
            onPress={resetTime}
            size="small"
            color="btnInfo"
          />
        </View>
      </>
      <View style={[styles.timeContainer, timesUp ? styles.timesUp : {}]}>
        <AppText style={[styles.time, timesUp ? styles.timesUp : {}]}>
          {allowables.convertMS(timeRemaining)}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  timeContainer: {
    flex: 1,
  },
  time: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  next: {
    position: "absolute",
    right: 20,
    top: -5,
    zIndex: 99,
  },
  stop: {
    position: "absolute",
    left: 20,
    top: -5,
    zIndex: 99,
  },
  timesUp: {
    backgroundColor: defaultStyles.colors.danger,
    color: defaultStyles.colors.holdLight,
  },
});

export default TimerClock;
