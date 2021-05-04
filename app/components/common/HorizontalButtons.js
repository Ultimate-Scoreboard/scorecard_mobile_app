import React from "react";
import { StyleSheet, View } from "react-native";

import RoundedButton from "./../button/RoundedButton";

function HorizontalButtons({ buttons, selected, setSelected }) {
  return (
    <View style={styles.container}>
      {buttons.map((b) => {
        return (
          <View
            style={[styles.button, { flex: 1 / buttons.length }]}
            key={b.id}
          >
            <RoundedButton
              icon={b.icon}
              onPress={() => setSelected(b.id)}
              color={selected === b.id ? "btnInfo" : "btnLight"}
              size="small"
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  button: {
    alignItems: "center",
  },
});

export default HorizontalButtons;
