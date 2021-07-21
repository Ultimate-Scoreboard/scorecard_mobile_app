import React from "react";
import { StyleSheet, View } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
import Constants from "expo-constants";

function BannerAd({ route }) {
  const lcRoute = route.toLowerCase();
  const androidScorecard = "ca-app-pub-6613892524077913/3385699092";
  const androidSaved = "ca-app-pub-6613892524077913/5572701124";
  const androidSudoku = "ca-app-pub-6613892524077913/8662387562";
  const iosScorecard = "ca-app-pub-6613892524077913/2617069954";
  const iosSaved = "ca-app-pub-6613892524077913/8990906613";
  const iosSudoku = "ca-app-pub-6613892524077913/2501805290";
  let productionID;
  if (Constants.platform.android) {
    productionID = lcRoute.includes("scorecard")
      ? androidScorecard
      : lcRoute.includes("saved")
      ? androidSaved
      : lcRoute.includes("sudoku")
      ? androidSudoku
      : "";
  } else {
    productionID = lcRoute.includes("scorecard")
      ? iosScorecard
      : lcRoute.includes("saved")
      ? iosSaved
      : lcRoute.includes("sudoku")
      ? iosSudoku
      : "";
  }

  const testID = Constants.platform.android
    ? "ca-app-pub-3940256099942544/6300978111"
    : "ca-app-pub-3940256099942544/2934735716";
  const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;

  return (
    <View style={styles.container}>
      <AdMobBanner
        bannerSize="banner"
        adUnitID={adUnitID}
        servePersonalizedAds={true}
        onDidFailToReceiveAdWithError={(error) => console.log(error)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export default BannerAd;
