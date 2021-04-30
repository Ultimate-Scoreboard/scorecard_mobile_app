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
  const [showRounds, setShowRounds] = useState(false);

  const retrieveSettings = async () => {
    const darkMode = await storageFunctions.getAsyncStorage("darkMode");
    if (darkMode) setDarkMode(true);
    const showRounds = await storageFunctions.getAsyncStorage("showRounds");
    if (showRounds) setShowRounds(true);
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
          showRounds,
          setShowRounds,
        }}
      >
        <MainNavigator />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </SettingsContext.Provider>
    </NavigationContainer>
  );
}
