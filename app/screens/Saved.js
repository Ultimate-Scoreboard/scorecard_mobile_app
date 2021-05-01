import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, FlatList, View } from "react-native";

import { storageFunctions, allowables } from "../functions";
import {
  Screen,
  Header,
  PullToRefresh,
  SavedCard,
  NoSavedCards,
  BlockButton,
  BannerAd,
} from "../components";
import routes from "../navigation/routes";

function Saved({ navigation, route }) {
  const [savedCards, setSavedCards] = useState([]);
  const [expandAll, setExpandAll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const retriveCards = async () => {
    setRefreshing(true);
    let currentSavedCards = await storageFunctions.getAsyncStorage(
      "savedCards"
    );
    if (currentSavedCards) {
      currentSavedCards = JSON.parse(currentSavedCards);
      currentSavedCards = currentSavedCards.map((c) => JSON.parse(c));
    } else currentSavedCards = [];
    setSavedCards(currentSavedCards);
    setRefreshing(false);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) retriveCards();

    return function cleanup() {
      mounted = false;
    };
  }, []);

  const alertDelete = (card) => {
    Alert.alert(
      "Delete Saved Card",
      `${allowables.convertTimestamp(card.date)} - ${allowables.capLetterOne(
        card.type
      )} - ${
        card.numberOfPlayers
      } players\n\nAre you sure you want to delete this scorecard?`,
      [{ text: "No" }, { text: "Yes", onPress: () => handleDelete(card) }],
      { cancelable: true }
    );
  };
  const handleDelete = async (card) => {
    let currentSavedCards = [...savedCards];
    const index = savedCards.findIndex((c) => c.date === card.date);
    if (index >= 0) currentSavedCards.splice(index, 1);
    setSavedCards(currentSavedCards);
    currentSavedCards = currentSavedCards.map((c) => JSON.stringify(c));
    await storageFunctions.saveAsyncStorage(
      "savedCards",
      JSON.stringify(currentSavedCards)
    );
  };

  const handleSelect = (card) => {
    navigation.navigate(routes.SCORECARD, {
      type: card.type,
      players: card.score,
      initialValue: card.initialValue || 0,
      date: card.date,
      saved: true,
    });
  };

  return (
    <Screen
      header={
        <>
          <Header>Saved Scorecards</Header>
        </>
      }
      footer={<BannerAd route={route.name} />}
    >
      <BlockButton
        title={(expandAll ? "Collapse" : "Expand") + " All Scorecards"}
        onPress={() => setExpandAll(!expandAll)}
        color="btnInfo"
        size="small"
      />
      <PullToRefresh />
      <FlatList
        data={savedCards}
        keyExtractor={(d) => String(d.date)}
        renderItem={({ item }) => {
          return (
            <SavedCard
              card={item}
              onSelect={handleSelect}
              onDelete={alertDelete}
              expandAll={expandAll}
            />
          );
        }}
        refreshing={refreshing}
        onRefresh={retriveCards}
        ListEmptyComponent={<NoSavedCards />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Saved;
