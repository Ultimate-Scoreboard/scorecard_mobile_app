import React from "react";
import { StyleSheet } from "react-native";

import HorizontalButtons from "./../common/HorizontalButtons";
import AppText from "./../text/AppText";
import { sounds } from "../../functions";

function SoundPicker({ selected, setSelected }) {
  const buttons = [
    { icon: { icon: "volume-low", iconType: "material" }, id: "short" },
    {
      icon: { icon: "volume-medium", iconType: "material" },
      id: "medium",
    },
    {
      icon: { icon: "volume-high", iconType: "material" },
      id: "long",
    },
  ];

  const handleSelect = (id) => {
    sounds.playSound(id);
    setSelected(id);
  };

  return (
    <>
      <AppText style={styles.text}>Timer Buzzer Sound</AppText>
      <HorizontalButtons
        buttons={buttons}
        selected={selected}
        setSelected={handleSelect}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    marginLeft: 15,
    fontSize: 20,
  },
});

export default SoundPicker;
