import React, { useContext } from "react";
import { View, Alert } from "react-native";

import { storageFunctions } from "../functions";
import {
  Screen,
  Header,
  DarkMode,
  ShowRounds,
  Divider,
  BlockButton,
} from "../components";
import SettingsContext from "./../context/settingsContext";

function Settings() {
  const { darkMode, setDarkMode, showRounds, setShowRounds } = useContext(
    SettingsContext
  );

  const handleToggleDarkMode = async () => {
    const mode = await storageFunctions.getAsyncStorage("darkMode");
    if (mode) {
      await storageFunctions.removeAsyncStorage("darkMode");
      setDarkMode(false);
    } else {
      await storageFunctions.saveAsyncStorage("darkMode", "on");
      setDarkMode(true);
    }
  };

  const handleToggleShowRounds = async () => {
    const mode = await storageFunctions.getAsyncStorage("showRounds");
    if (mode) {
      await storageFunctions.removeAsyncStorage("showRounds");
      setShowRounds(false);
    } else {
      await storageFunctions.saveAsyncStorage("showRounds", "on");
      setShowRounds(true);
    }
  };

  const alertReset = () => {
    Alert.alert(
      "Reset Everything",
      "You are about to reset all settings and clear all saved scorecard information. Your current scorecard will remain available to continue until you close the app.\n\nDo you want to continue?",
      [{ text: "No" }, { text: "Yes", onPress: () => handleReset() }],
      { cancelable: true }
    );
  };
  const handleReset = () => {
    storageFunctions.clearAsyncStorage();
    setDarkMode(false);
    setShowRounds(false);
  };

  const settings = [
    { Component: DarkMode, current: darkMode, onChange: handleToggleDarkMode },
    {
      Component: ShowRounds,
      current: showRounds,
      onChange: handleToggleShowRounds,
    },
  ];

  return (
    <Screen
      scroll={true}
      footer={<BlockButton title="Reset And Clear" onPress={alertReset} />}
    >
      <Header>Settings</Header>
      <Divider />
      {settings.map((s, i) => {
        return (
          <View key={i}>
            <s.Component current={s.current} onChange={s.onChange} />
            <Divider />
          </View>
        );
      })}
    </Screen>
  );
}

export default Settings;
