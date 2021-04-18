import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { storageFunctions } from "../functions";
import { Screen, Header, DarkMode, Divider } from "../components";
import SettingsContext from "./../context/settingsContext";

function Settings() {
  const { darkMode, setDarkMode } = useContext(SettingsContext);

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

  const settings = [
    { Component: DarkMode, current: darkMode, onChange: handleToggleDarkMode },
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
