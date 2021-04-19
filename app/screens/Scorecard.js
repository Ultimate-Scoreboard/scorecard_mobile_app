import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";

import {
  Screen,
  Header,
  Names,
  BlockButton,
  Error,
  HorizontalTabs,
  Incrementer,
} from "./../components";
import { storageFunctions } from "../functions";
import routes from "../navigation/routes";

function Scorecard({ navigation, route }) {
  const [tab, setTab] = useState("scorecard");
  const [score, setScore] = useState([]);
  const [type, setType] = useState("incrementer");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [error, setError] = useState(null);

  const tabs = [
    { name: "scorecard", icon: "star", iconType: "font" },
    { name: "history", icon: "history", iconType: "font" },
  ];

  const checkForParams = () => {
    return route.params && route.params.type && route.params.players;
  };

  const checkForExistingCard = async () => {
    setError(null);
    let currentScore = await storageFunctions.getAsyncStorage("score");
    let currentType = await storageFunctions.getAsyncStorage("type");
    if (currentScore && currentType) {
      if (checkForParams())
        Alert.alert(
          "Start New Scorecard",
          "You already have a scorecard in progress. Starting a new scorecard will delete your old data.\n\nAre you sure?",
          [
            {
              text: "No",
              onPress: () => retrieveScore(currentScore, currentType),
            },
            { text: "Yes", onPress: () => startNewCard() },
          ]
        );
      else retrieveScore(currentScore, currentType);
    } else startNewCard();
  };

  const startNewCard = async () => {
    setSelectedPlayer(null);
    if (!checkForParams()) return setError("No scorecard in progress");
    let newScore = [...route.params.players];
    setScore(newScore);
    setType(route.params.type);
    newScore = newScore.map((p) => JSON.stringify(p));
    await storageFunctions.saveAsyncStorage("score", JSON.stringify(newScore));
    await storageFunctions.saveAsyncStorage("type", route.params.type);
  };

  const retrieveScore = async (currentScore, currentType) => {
    currentScore = JSON.parse(currentScore);
    setScore(currentScore.map((p) => JSON.parse(p)));
    setType(currentType);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) checkForExistingCard();

    return function cleanup() {
      mounted = false;
    };
  }, [route.params]);

  const handleSelectTab = (tab) => {
    setTab(tab.name);
  };

  const handleSetScore = async (value) => {
    if (!selectedPlayer && selectedPlayer !== 0) return;
    let currentScore = [...score];
    let player = { ...currentScore[selectedPlayer] };
    if (type !== "sets") {
      player.points = [{ set: 1, points: value }];
    }
    currentScore.splice(selectedPlayer, 1, player);
    setScore(currentScore);
    currentScore = currentScore.map((p) => JSON.stringify(p));
    await storageFunctions.saveAsyncStorage(
      "score",
      JSON.stringify(currentScore)
    );
  };

  return (
    <Screen
      scroll={true}
      header={
        <HorizontalTabs tabs={tabs} selected={tab} onSelect={handleSelectTab} />
      }
    >
      {/* <Header>Scorecard</Header> */}
      {error ? (
        <>
          <Error>No scorecard in progress</Error>
          <BlockButton
            title="Create New"
            color="btnInfo"
            onPress={() => navigation.navigate(routes.HOME)}
          />
        </>
      ) : (
        <>
          <Names
            score={score}
            setScore={setScore}
            selectedPlayer={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
          />
          {type == "incrementer" && (
            <Incrementer
              score={score}
              setScore={handleSetScore}
              selectedPlayer={selectedPlayer}
            />
          )}
        </>
      )}
      <BlockButton
        title="reset"
        onPress={() => storageFunctions.clearAsyncStorage()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Scorecard;
