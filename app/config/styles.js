import { Platform } from "react-native";

import colors from "./colors";
import fonts from "./fonts";
import sizes from "./sizes";

export default {
  colors,
  sizes,
  text: {
    fontSize: fonts.fontSize,
    fontFamily: Platform.OS === "android" ? fonts.android : fonts.ios,
  },
  navTabLabelStyle: {
    fontSize: 18,
  },
};
