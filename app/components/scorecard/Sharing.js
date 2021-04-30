import React from "react";
import { StyleSheet, Share, Alert, Linking } from "react-native";
import Constants from "expo-constants";
import * as StoreReview from "expo-store-review";

import BlockButton from "../button/BlockButton";
import AppText from "./../text/AppText";

function Sharing() {
  const platform = Constants.platform;
  const onShare = async () => {
    let content = {
      message: "I just had an awesome game night using Scorecard!",
    };
    let url =
      "https://play.google.com/store/apps/details?id=com.scorecard.ultimatescoreboard";
    if ("android" in platform) {
      content.title = "Check out Scorecard on Google Play";
      content.message = content.message + "\n\n" + url;
    } else if ("ios" in platform) content.url = url;
    try {
      await Share.share(content);
    } catch (error) {
      Alert.alert("Something went wrong", error.message, [{ text: "OK" }], {
        cancelable: true,
      });
    }
  };

  const onReview = async () => {
    const reviewable = await StoreReview.isAvailableAsync();
    const hasAction = await StoreReview.hasAction();
    if (reviewable && hasAction) {
      let url = StoreReview.storeUrl();
      if (url) {
        if ("android" in platform)
          url =
            url.replace("https://play.google.com/store/apps/", "market://") +
            "&showAllReviews=true";
        else if ("ios" in platform)
          url = url.replace(
            "https://apps.apple.com/app/apple-store/",
            "itms-apps://itunes.apple.com/app/viewContentsUserReviews"
          );
      }
      Linking.openURL(url);
    }
  };

  return (
    <>
      <AppText style={[styles.text, styles.header]}>Love the App?</AppText>
      <BlockButton
        title="Share the App"
        onPress={onShare}
        color="btnInfo"
        size="small"
      />
      <AppText style={styles.text}>or</AppText>
      <BlockButton
        title="Write a Review"
        onPress={onReview}
        color="btnInfo"
        size="small"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    fontSize: 20,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Sharing;
