import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import TimerClock from "./TimerClock";
import TimeSetter from "./TimeSetter";
import TimerControls from "./TimeControls";

function TimerHome({
  timeRemaining,
  setTimeRemaining,
  countdownTime,
  setCountdownTime,
  timerStarted,
  setTimerStarted,
}) {
  const onSetCountdownTime = (time) => {
    if (isNaN(time.minutes) || isNaN(time.seconds)) return;
    const minutes = Number(time.minutes) * 60000;
    const seconds = Number(time.seconds) * 1000;
    const totalTime = minutes + seconds;
    setCountdownTime(totalTime);
    setTimeRemaining(totalTime);
  };

  return (
    <View style={styles.container}>
      <TimerClock
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
        countdownTime={countdownTime}
        timerStarted={timerStarted}
        setTimerStarted={setTimerStarted}
      />
      <View style={{ height: 25 }} />
      {!timerStarted ? (
        <TimeSetter
          countdownTime={countdownTime}
          setCountdownTime={onSetCountdownTime}
          setTimerStarted={setTimerStarted}
        />
      ) : (
        <View style={{ height: 120 }} />
      )}
      <TimerControls
        timerStarted={timerStarted}
        setTimerStarted={setTimerStarted}
        countdownTime={countdownTime}
        setCountdownTime={setCountdownTime}
        setTimeRemaining={setTimeRemaining}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default TimerHome;
