import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "./../text/AppText";

function Incrementer({ score, setScore }) {
  return (
    <>
      {score.map((p, i) => {
        return (
          <View style={styles.container} key={i}>
            <View style={[styles.text, styles.name]}>
              <AppText style={styles.text}>{p.name}</AppText>
            </View>
            <View style={[styles.text, styles.score]}>
              <AppText style={styles.text}>
                {(score.points && score.points.points) || 0}
              </AppText>
            </View>
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  name: {
    flex: 0.7,
  },
  score: {
    flex: 0.3,
  },
  text: {
    fontWeight: "bold",
  },
});

export default Incrementer;
