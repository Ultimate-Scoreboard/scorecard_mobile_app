import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import ButtonText from "../text/ButtonText";
import { defaultStyles, clicks } from "../../config";
import IconRender from "../icon/IconRender";

function BlockButton({ onPress, size, title, icon, color }) {
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
      width: "100%",
      height: height,
      borderRadius: Math.floor(height * 0.2),
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      marginVertical: 5,
    },
    container: {
      width: "100%",
      paddingHorizontal: 10,
      alignItems: "center",
    },
    buttonIcon: {
      position: "absolute",
      left: 25,
      top: height / 3,
      paddingVertical: 5,
      zIndex: 99,
      width: 25,
    },
    buttonText: {
      textAlign: "center",
      color: textColor,
    },
  });

  return (
    <View style={styles.container}>
      {icon && (
        <IconRender
          icon={icon.icon}
          iconType={icon.iconType}
          iconSize={icon.iconSize}
          color={textColor}
          style={styles.buttonIcon}
          suggestedColor={icon.suggestedColor}
        />
      )}
      <TouchableOpacity
        activeOpacity={clicks.clickOpacity}
        style={styles.button}
        onPress={onPress}
      >
        <ButtonText styles={styles.buttonText}>{title}</ButtonText>
      </TouchableOpacity>
    </View>
  );
}

export default BlockButton;
