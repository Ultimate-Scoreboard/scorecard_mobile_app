import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import ButtonText from "../text/ButtonText";
import { defaultStyles, clicks } from "../../config";
import IconRender from "../icon/IconRender";

function RoundedButton({ onPress, size, icon, color }) {
  const height =
    size === "small"
      ? defaultStyles.sizes.buttonSmall
      : size === "medium"
      ? defaultStyles.sizes.buttonMedium
      : size === "large"
      ? defaultStyles.sizes.buttonLarge
      : 70;
  const textColor = color
    ? defaultStyles.colors[color].color
    : defaultStyles.colors.btnPrimary.color;
  const backgroundColor = color
    ? defaultStyles.colors[color].backgroundColor
    : defaultStyles.colors.btnPrimary.backgroundColor;

  const styles = StyleSheet.create({
    button: {
      backgroundColor,
      width: height,
      height,
      borderRadius: Math.floor(height * 0.2),
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      margin: 5,
      width: height,
      height,
    },
    iconStyle: {
      position: "absolute",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={clicks.clickOpacity}
        style={styles.button}
        onPress={onPress}
      >
        <IconRender
          icon={icon.icon}
          iconType={icon.iconType}
          iconSize={icon.iconSize || height / 1.5}
          color={textColor}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
}

export default RoundedButton;
