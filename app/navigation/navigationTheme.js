import { DefaultTheme } from "@react-navigation/native";
import { defaultStyles } from "../config";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: defaultStyles.colors.lightBG,
    background: defaultStyles.colors.darkText,
  },
};
