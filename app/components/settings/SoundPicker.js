import React from "react";
import { StyleSheet, View } from "react-native";
import { Audio } from "expo-av";

import HorizontalButtons from "./../common/HorizontalButtons";
import AppText from "./../text/AppText";

function SoundPicker({ selected, setSelected }) {
  const playSound = async (file) => {
    try {
      if (file === "short")
        await Audio.Sound.createAsync(
          require(`../../../assets/sounds/shortBeep.wav`),
          { shouldPlay: true }
        );
      else if (file === "medium")
        await Audio.Sound.createAsync(
          require(`../../../assets/sounds/longBuzzer.wav`),
          { shouldPlay: true }
        );
      else if (file === "long")
        await Audio.Sound.createAsync(
          require(`../../../assets/sounds/longBuzzer.wav`),
          { shouldPlay: true }
        );
    } catch (error) {
      console.log(error);
    }
  };

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
    playSound(id);
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
