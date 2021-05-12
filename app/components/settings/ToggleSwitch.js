import React from "react";
import { StyleSheet, View, Switch } from "react-native";

import { defaultStyles } from "../../config";
import AppText from "./../text/AppText";

function ToggleSwitch({ current, onChange, title, subtitle }) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <AppText style={styles.text}>{title}</AppText>
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
      {subtitle ? <AppText style={styles.subText}>{subtitle}</AppText> : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginVertical: 0 },
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

export default ToggleSwitch;
