import React from "react";
import { StyleSheet, View } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
import Constants from "expo-constants";

function BannerAd({ route }) {
  const productionID = route.toLowerCase().includes("scorecard")
    ? "ca-app-pub-6613892524077913/3385699092"
    : route.toLowerCase().includes("saved")
    ? "ca-app-pub-6613892524077913/5572701124"
    : "";
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
