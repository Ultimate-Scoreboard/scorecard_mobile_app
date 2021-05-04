import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";

import BlockButton from "./../button/BlockButton";
import AppInput from "./../form/AppInput";
import Toast from "react-native-toast-message";

function TimeSetter({
  countdownTime,
  setCountdownTime,
  timeOpen,
  setTimeOpen,
}) {
  const secondsRef = useRef(null);
  const [tempTime, setTempTime] = useState({
    minutes:
      Math.floor(countdownTime / (60 * 1000)) > 0
        ? String(Math.floor(countdownTime / (60 * 1000)))
        : "",
    seconds:
      Math.floor((countdownTime / 1000) % 60) > 0
        ? String(Math.floor((countdownTime / 1000) % 60))
        : "",
  });

  const onTimeChange = (id, value) => {
    let currentTime = { ...tempTime };
    if (value < 0) return;
    if (id === "seconds" && value > 59) {
      value = "59";
      Toast.show({
        type: "error",
        text1: "Invalid Time",
        text2: "Maximum allowable seconds is 59",
        position: "top",
        visibilityTime: 3000,
        topOffset: 175,
        onPress: () => Toast.hide(),
      });
    }
    if (id === "minutes" && value > 5999) {
      value = "5999";
      Toast.show({
        type: "error",
        text1: "Invalid Time",
        text2: "Maximum allowable minutes is 5999 (99 hours, 99 minutes)",
        position: "top",
        visibilityTime: 3000,
        topOffset: 175,
        onPress: () => Toast.hide(),
      });
    }
    currentTime[id] = value;
    setTempTime(currentTime);
  };
  const getPlaceholder = (id) => {
    const minutes = Math.floor(countdownTime / (60 * 1000));
    const seconds = Math.floor((countdownTime / 1000) % 60);
    return {
      minutes:
        minutes > 0
          ? String(Math.floor(countdownTime / (60 * 1000)))
          : "Minutes",
      seconds:
        seconds > 0
          ? String(Math.floor((countdownTime / 1000) % 60))
          : "Seconds",
    };
  };

  return (
    <>
      <BlockButton
        title="Set Countdown Time"
        color="btnInfo"
        size="small"
        onPress={
          timeOpen
            ? () => setCountdownTime(tempTime)
            : () => {
                setTimeOpen(true);
              }
        }
      />
      {timeOpen ? (
        <View style={styles.container}>
          {[{ id: "minutes" }, { id: "seconds" }].map((e) => {
            return (
              <View style={styles.third} key={e.id}>
                <AppInput
                  forwardedRef={e.id === "seconds" ? secondsRef : null}
                  autoFocus={e.id === "minutes"}
                  value={tempTime[e.id]}
                  onChangeText={(value) => onTimeChange(e.id, value)}
                  placeholder={getPlaceholder()[e.id]}
                  keyboardType="numeric"
                  onSubmitEditing={
                    e.id === "minutes"
                      ? () => secondsRef.current.focus()
                      : () => setCountdownTime(tempTime)
                  }
                  returnKeyType="done"
                  blurOnSubmit={e.id === "seconds"}
                  returnKeyType={e.id === "minutes" ? "next" : "done"}
                />
              </View>
            );
          })}
        </View>
      ) : (
        <View style={{ height: 70 }} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  third: {
    flex: 0.5,
  },
});

export default TimeSetter;
