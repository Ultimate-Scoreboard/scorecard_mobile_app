import React, { useContext } from "react";
import { View, Alert } from "react-native";

import { storageFunctions } from "../functions";
import {
  Screen,
  Header,
  Divider,
  BlockButton,
  ScorecardSettings,
  ToggleSwitch,
  SoundPicker,
} from "../components";
import SettingsContext from "./../context/settingsContext";

function Settings() {
  const {
    darkMode,
    setDarkMode,
    hideRounds,
    setHideRounds,
    hideTimer,
    setHideTimer,
    sound,
    setSound,
  } = useContext(SettingsContext);

  const handleToggle = async (id, onChange) => {
    const mode = await storageFunctions.getAsyncStorage(id);
    if (mode) {
      await storageFunctions.removeAsyncStorage(id);
      onChange(false);
    } else {
      await storageFunctions.saveAsyncStorage(id, "on");
      onChange(true);
    }
  };
  const handleSelect = async (id, value, onChange) => {
    await storageFunctions.saveAsyncStorage(id, value);
    onChange(value);
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
    setHideRounds(false);
  };

  const settings = [
    {
      id: "darkMode",
      current: darkMode,
      onChange: setDarkMode,
      title: "Dark Mode",
      subtitle: "Go easy on your eyes with dark mode.",
    },
    {
      id: "hideRounds",
      current: hideRounds,
      onChange: setHideRounds,
      title: "Hide Round Numbers",
      subtitle:
        "Hide round numbers on the history tab for a Tally and Countdown scorecards",
    },
    {
      id: "hideTimer",
      current: hideTimer,
      onChange: setHideTimer,
      title: "Hide Timer",
      subtitle:
        "Hide the timer from the Main and History tabs of the Scorecard screen",
    },
  ];

  return (
    <Screen
      scroll={true}
      footer={
        <BlockButton
          title="Reset And Clear"
          onPress={alertReset}
          size="small"
        />
      }
    >
      <Header>Settings</Header>
      <Divider />
      {settings.map((s, i) => {
        return (
          <View key={i}>
            <ToggleSwitch
              current={s.current}
              onChange={() => handleToggle(s.id, s.onChange)}
              title={s.title}
              subtitle={s.subtitle}
            />
            <Divider />
          </View>
        );
      })}
      <SoundPicker
        selected={sound}
        setSelected={(value) => handleSelect("sound", value, setSound)}
      />
      <Divider />
      <ScorecardSettings nonCard={true} />
    </Screen>
  );
}

export default Settings;
