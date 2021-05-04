import { Audio } from "expo-av";

const playSound = async (file) => {
  try {
    if (!file || file === "short")
      await Audio.Sound.createAsync(
        require(`../../assets/sounds/shortBeep.wav`),
        {
          shouldPlay: true,
        }
      );
    else if (file === "medium")
      await Audio.Sound.createAsync(
        require(`../../assets/sounds/fourBeep.wav`),
        {
          shouldPlay: true,
        }
      );
    else if (file === "long")
      await Audio.Sound.createAsync(
        require(`../../assets/sounds/cassette.wav`),
        {
          shouldPlay: true,
        }
      );
  } catch (error) {
    console.log(error);
  }
};

export default {
  playSound,
};
