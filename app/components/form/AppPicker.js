import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { defaultStyles } from "../../config";
import SettingsContext from "./../../context/settingsContext";
import AppText from "./../text/AppText";

function AppPicker({ title, options, selected, setSelected, placeholder }) {
  const { theme } = useContext(SettingsContext);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <AppText style={styles.text}>{title}</AppText>
      </View>
      <View style={styles.picker}>
        <Picker
          selectedValue={selected}
          onValueChange={(itemValue) => setSelected(itemValue)}
          style={theme}
          itemStyle={theme}
          mode="dialog"
          prompt={placeholder}
        >
          {options.map((o) => {
            return (
              <Picker.Item key={o.value} label={o.label} value={o.value} />
            );
          })}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    textAlign: "left",
    marginLeft: 15,
    fontSize: 16,
  },
  textContainer: {
    flex: 0.35,
    justifyContent: "center",
  },
  picker: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderColor: defaultStyles.colors.info,
    borderWidth: 1,
    borderRadius: 5,
    flex: 0.65,
  },
});

export default AppPicker;
