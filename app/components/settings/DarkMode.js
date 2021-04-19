import React from "react";
import { StyleSheet, View, Switch } from "react-native";

import { defaultStyles } from "../../config";
import AppText from "./../text/AppText";

function DarkMode({ current, onChange }) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <AppText style={styles.text}>Dark Mode</AppText>
        </View>
        <View style={styles.switch}>
          <Switch
            onValueChange={onChange}
            value={current}
            thumbColor={
              current
                ? defaultStyles.colors.info
                : defaultStyles.colors.holdLight
            }
            trackColor={{
              false: defaultStyles.colors.muted,
              true: defaultStyles.colors.muted,
            }}
          />
        </View>
      </View>
      <AppText style={styles.subText}>
        Toggle dark mode and go easy on your eyes
      </AppText>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginVertical: 10 },
  switch: { flex: 0.2, marginRight: 15 },
  textContainer: {
    flex: 0.8,
    marginLeft: 15,
  },
  text: {
    fontSize: 20,
  },
  subText: {
    fontSize: 15,
    marginHorizontal: 15,
  },
});

export default DarkMode;