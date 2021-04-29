import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, FlatList } from "react-native";

import { storageFunctions, allowables } from "../functions";
import { Screen, Header, SavedCard } from "../components";
import routes from "../navigation/routes";

function Saved({ navigation, route }) {
  const [savedCards, setSavedCards] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const retriveCards = async () => {
    let currentSavedCards = await storageFunctions.getAsyncStorage(
      "savedCards"
    );
    if (currentSavedCards) {
      currentSavedCards = JSON.parse(currentSavedCards);
      currentSavedCards = currentSavedCards.map((c) => JSON.parse(c));
    } else currentSavedCards = [];
    setSavedCards(currentSavedCards);
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
      } players\n\nAre you sure you want to delete this card?`,
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
    });
  };

  return (
    <Screen
      header={
        <>
          <Header>Saved Scorecards</Header>
        </>
      }
    >
      <FlatList
        data={savedCards}
        keyExtractor={(d) => d.date}
        renderItem={({ item, index }) => {
          return (
            <SavedCard
              card={item}
              index={index}
              onSelect={handleSelect}
              onDelete={alertDelete}
            />
          );
        }}
        refreshing={refreshing}
        onRefresh={retriveCards}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Saved;
