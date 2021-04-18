import React from "react";
import { StyleSheet } from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  Octicons,
} from "@expo/vector-icons";

function IconRender({ icon, iconType, color, iconSize, style }) {
  const size = iconSize || 20;
  return (
    (iconType === "ant" && (
      <AntDesign
        name={icon}
        size={size}
        color={color}
        style={[styles.icon, style]}
      />
    )) ||
    (iconType === "material" && (
      <MaterialCommunityIcons
        name={icon}
        size={size}
        color={color}
        style={[styles.icon, style]}
      />
    )) ||
    (iconType === "font" && (
      <FontAwesome
        name={icon}
        size={size}
        color={color}
        style={[styles.icon, style]}
      />
    )) ||
    (iconType === "oct" && (
      <Octicons
        name={icon}
        size={size}
        color={color}
        style={[styles.icon, style]}
      />
    ))
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});

export default IconRender;
