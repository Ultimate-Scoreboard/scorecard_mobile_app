import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";

import defaultStyles from "../config/styles";
import SettingsContext from "./../context/settingsContext";

function Screen({
  style,
  scroll,
  paddingTop,
  header,
  footer,
  forwardRef,
  children,
}) {
  const { theme } = useContext(SettingsContext);
  const padding =
    paddingTop > -1 ? paddingTop : defaultStyles.sizes.statusBarHeight;

  return (
    <SafeAreaView
      style={[styles.screen, theme, { paddingTop: padding }, style]}
    >
      {scroll && (footer || header) ? (
        <React.Fragment>
          {header}
          <ScrollView style={[styles.view, style]} ref={forwardRef}>
            {children}
          </ScrollView>
          {footer}
        </React.Fragment>
      ) : scroll ? (
        <ScrollView style={[styles.view, style]} ref={forwardRef}>
          {children}
        </ScrollView>
      ) : (
        <>
          {header}
          <View style={[styles.view, style]}>{children}</View>
          {footer}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: defaultStyles.colors.light,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
