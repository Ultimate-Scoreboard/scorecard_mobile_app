import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { storageFunctions } from "../functions";
import { Screen, Header, DarkMode, ShowRounds, Divider } from "../components";
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

  const settings = [
    { Component: DarkMode, current: darkMode, onChange: handleToggleDarkMode },
    {
      Component: ShowRounds,
      current: showRounds,
      onChange: handleToggleShowRounds,
    },
  ];

  return (
    <Screen scroll={true}>
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

const styles = StyleSheet.create({});

export default Settings;
