import React, { useState, useEffect } from "react";
import { StyleSheet, View, Keyboard, ScrollView } from "react-native";

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
  resetTime,
  timesUp,
  setTimesUp,
}) {
  const [timeOpen, setTimeOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => Keyboard.removeListener("keyboardDIdHide", _keyboardDidHide);
  });
  const _keyboardDidHide = () => {
    setTimeOpen(false);
  };

  const onSetCountdownTime = (time) => {
    if (isNaN(time.minutes) || isNaN(time.seconds)) return;
    const minutes = Number(time.minutes) * 60000;
    const seconds = Number(time.seconds) * 1000;
    const totalTime = minutes + seconds;
    setCountdownTime(totalTime);
    setTimeRemaining(totalTime);
    setTimeOpen(false);
    setTimesUp(false);
  };

  return (
    <ScrollView style={styles.container}>
      <TimerClock
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
        countdownTime={countdownTime}
        timerStarted={timerStarted}
        setTimerStarted={setTimerStarted}
        resetTime={resetTime}
        timesUp={timesUp}
      />
      <View style={{ height: 25 }} />
      {!timerStarted ? (
        <TimeSetter
          countdownTime={countdownTime}
          setCountdownTime={onSetCountdownTime}
          setTimerStarted={setTimerStarted}
          timeOpen={timeOpen}
          setTimeOpen={setTimeOpen}
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
        resetTime={resetTime}
        setTimesUp={setTimesUp}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default TimerHome;
