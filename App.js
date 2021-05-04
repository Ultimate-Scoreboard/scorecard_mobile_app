import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import navigationTheme from "./app/navigation/navigationTheme";
import { navigationRef } from "./app/navigation/rootNavigation";
import MainNavigator from "./app/navigation/mainNavigator";
import { storageFunctions } from "./app/functions";
import SettingsContext from "./app/context/settingsContext";
import { defaultStyles } from "./app/config";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [hideRounds, setHideRounds] = useState(false);
  const [hideTimer, setHideTimer] = useState(false);

  const retrieveSettings = async () => {
    const darkMode = await storageFunctions.getAsyncStorage("darkMode");
    if (darkMode) setDarkMode(true);
    const hideRounds = await storageFunctions.getAsyncStorage("hideRounds");
    if (hideRounds) setHideRounds(true);
    const hideTimer = await storageFunctions.getAsyncStorage("hideTimer");
    if (hideTimer) setHideTimer(true);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) retrieveSettings();

    return function cleanup() {
      mounted = false;
    };
  });

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <SettingsContext.Provider
        value={{
          darkMode,
          setDarkMode,
          theme: {
            backgroundColor: darkMode
              ? defaultStyles.colors.dark
              : defaultStyles.colors.light,
            color: darkMode
              ? defaultStyles.colors.light
              : defaultStyles.colors.dark,
          },
          hideRounds,
          setHideRounds,
          hideTimer,
          setHideTimer,
        }}
      >
        <MainNavigator />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </SettingsContext.Provider>
    </NavigationContainer>
  );
}
