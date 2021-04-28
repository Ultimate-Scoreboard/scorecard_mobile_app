import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import * as StoreReview from "expo-store-review";

import {
  Screen,
  Header,
  Names,
  BlockButton,
  Error,
  HorizontalTabs,
  History,
  ScorecardSettings,
} from "./../components";
import { storageFunctions, allowables } from "../functions";
import routes from "../navigation/routes";

function Scorecard({ navigation, route }) {
  const [tab, setTab] = useState("home");
  const [score, setScore] = useState([]);
  const [type, setType] = useState("incrementer");
  const [initialValue, setInitialValue] = useState(501);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [nameEdit, setNameEdit] = useState(false);
  const [sortColumn, setSortColumn] = useState({
    path: "",
    order: "",
  });
  const [error, setError] = useState(null);

  const multiplier = type === "countdown" ? -1 : 1;
  const tabs = [
    { name: "home", icon: "clipboard-text", iconType: "material" },
    { name: "help", icon: "help-circle", iconType: "material" },
  ];
  if (type === "tally" || type === "countdown")
    tabs.splice(1, 0, { name: "history", icon: "history", iconType: "font" });

  const checkForParams = () => {
    return route.params && route.params.type && route.params.players;
  };

  const checkForExistingCard = async () => {
    setError(null);
    let currentScore = await storageFunctions.getAsyncStorage("score");
    let currentType = await storageFunctions.getAsyncStorage("type");
    let currentInitialValue = await storageFunctions.getAsyncStorage(
      "initialValue"
    );
    if (currentScore && currentType) {
      if (checkForParams())
        Alert.alert(
          "Start New Scorecard",
          "You already have a scorecard in progress. Starting a new scorecard will delete your old data.\n\nAre you sure?",
          [
            {
              text: "No",
              onPress: () =>
                retrieveScore(currentScore, currentType, currentInitialValue),
            },
            { text: "Yes", onPress: () => startNewCard() },
          ]
        );
      else retrieveScore(currentScore, currentType, currentInitialValue);
    } else startNewCard();
  };

  const startNewCard = async () => {
    setSelectedPlayer(null);
    setSortColumn({ path: "", order: "" });
    if (!checkForParams()) return setError("No scorecard in progress");
    let newScore = [...route.params.players];
    setScore(newScore);
    setType(route.params.type);
    setInitialValue(route.params.initialValue);
    newScore = newScore.map((p) => JSON.stringify(p));
    await storageFunctions.saveAsyncStorage("score", JSON.stringify(newScore));
    await storageFunctions.saveAsyncStorage("type", route.params.type);
    if (route.params.type === "countdown")
      await storageFunctions.saveAsyncStorage(
        "initialValue",
        String(route.params.initialValue)
      );
    setTab("home");
  };

  const retrieveScore = async (
    currentScore,
    currentType,
    currentInitialValue
  ) => {
    currentScore = JSON.parse(currentScore);
    setScore(currentScore.map((p) => JSON.parse(p)));
    setType(currentType);
    setInitialValue(Number(currentInitialValue));
    setTab("home");
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

  const spreadToEdit = (player) => {
    let currentScore = [...score];
    const index = currentScore.findIndex((p) => p._id == player._id);
    let currentPlayer = { ...currentScore[index] };
    return { currentScore, index, currentPlayer };
  };

  const saveScore = async (updatedScore) => {
    setScore(updatedScore);
    updatedScore = updatedScore.map((p) => JSON.stringify(p));
    await storageFunctions.saveAsyncStorage(
      "score",
      JSON.stringify(updatedScore)
    );
  };

  const handleSetScore = async (value) => {
    if (!value) return setSelectedPlayer(null);
    if (!selectedPlayer && selectedPlayer !== 0) return;
    let { currentScore, index, currentPlayer } = spreadToEdit({
      _id: selectedPlayer,
    });
    if (type === "incrementer") {
      currentPlayer.points = [{ set: 1, points: value }];
    }
    if (type === "tally" || type === "countdown") {
      currentPlayer.points = [
        {
          set: 1,
          points:
            Number(currentPlayer.points[0].points) + Number(value) * multiplier,
        },
      ];
      let history = [...currentPlayer.history];
      history.push({ round: history.length + 1, points: Number(value) });
      currentPlayer.history = history;
      setSelectedPlayer(null);
    }
    currentScore.splice(index, 1, currentPlayer);
    await saveScore(currentScore);
  };

  const alertResetScores = () => {
    Alert.alert(
      "Reset Scores",
      "You are about to reset all scores to zero.\n\nAre you sure?",
      [{ text: "No" }, { text: "Yes", onPress: () => handleResetScore() }],
      { cancelable: true }
    );
  };
  const handleResetScore = async () => {
    let currentScore = [...score];
    let resetScores = [];
    currentScore.forEach((p) => {
      let player = { ...p };
      player.points = [
        { points: type === "countdown" ? initialValue : 0, set: 1 },
      ];
      player.history = [];
      resetScores.push(player);
    });
    setScore(resetScores);
    resetScores = resetScores.map((p) => JSON.stringify(p));
    await storageFunctions.saveAsyncStorage(
      "score",
      JSON.stringify(resetScores)
    );
    setTab("home");
    setSelectedPlayer(null);

    // request store review, cannot really test, multiple instances keep getting blocked
    const reviewable = await StoreReview.isAvailableAsync();
    const hasAction = await StoreReview.hasAction();
    if (reviewable && hasAction) StoreReview.requestReview();
  };

  const handleSort = (col) => {
    let newSortColumn = { ...sortColumn };
    if (col === sortColumn.path) {
      if (sortColumn.order === "asc") newSortColumn.order = "desc";
      else newSortColumn.order = "asc";
    } else {
      newSortColumn.path = col;
      if (col === "points") newSortColumn.order = "desc";
      else newSortColumn.order = "asc";
    }
    setSortColumn(newSortColumn);
    getPlayers(newSortColumn);
  };

  const alertUndo = (player, historyIndex) => {
    Alert.alert(
      "Undo Score",
      `Remove round ${historyIndex + 1} score of ${
        player.history[historyIndex].points
      } for ${player.name}?`,
      [
        { text: "No" },
        { text: "Yes", onPress: () => handleUndo(player, historyIndex) },
      ],
      { cancelable: true }
    );
  };
  const handleUndo = async (player, index) => {
    const { currentScore, index: playerIndex, currentPlayer } = spreadToEdit(
      player
    );
    let history = [...currentPlayer.history];
    currentPlayer.points = [
      {
        set: 1,
        points: currentPlayer.points[0].points - history[index].points,
      },
    ];
    history.splice(index, 1);
    currentPlayer.history = history;
    currentScore.splice(playerIndex, 1, currentPlayer);
    await saveScore(currentScore);
  };

  const setScoreFromHistory = async (player, historyIndex, value) => {
    let { currentScore, index, currentPlayer } = spreadToEdit(player);
    let history = [...currentPlayer.history];
    if (!value) {
      if (history.length <= historyIndex) return;
      else return alertUndo(player, historyIndex);
    }
    let newTotal = 0;
    if (historyIndex === history.length) {
      newTotal = currentPlayer.points[0].points + Number(value) * multiplier;
      history.push({ round: historyIndex, points: Number(value) });
    } else {
      newTotal =
        currentPlayer.points[0].points -
        history[historyIndex].points * multiplier +
        Number(value) * multiplier;
      history.splice(historyIndex, 1, {
        round: historyIndex + 1,
        points: Number(value),
      });
    }
    currentPlayer.points = [
      {
        set: 1,
        points: newTotal,
      },
    ];
    currentPlayer.history = history;
    currentScore.splice(index, 1, currentPlayer);
    await saveScore(currentScore);
  };

  const handleNameEdit = async (name) => {
    if (!name) return setSelectedPlayer(null);
    if (!selectedPlayer && selectedPlayer !== 0) return;
    let { currentScore, index, currentPlayer } = spreadToEdit({
      _id: selectedPlayer,
    });
    currentPlayer.name = name;
    currentScore.splice(index, 1, currentPlayer);
    setSelectedPlayer(null);
    await saveScore(currentScore);
  };

  const handleRemovePlayer = async (player) => {
    let { currentScore, index } = spreadToEdit(player);
    if (currentScore.length <= 1)
      return Alert.alert(
        "Cannot Remove Player",
        "This is the last player remaining on the scorecard. They cannot be removed",
        [{ text: "OK" }],
        { cancelable: true }
      );
    Alert.alert(
      "Remove Player",
      `You are about to remove ${player.name} from the scorecard. This cannot be undone.\n\nAre you sure?`,
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: async () => {
            currentScore.splice(index, 1);
            setSelectedPlayer(null);
            await saveScore(currentScore);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleAddPlayer = async () => {
    let currentScore = [...score];
    let newPlayer = { ...allowables.blankPlayer };
    const highIndex = score.map((p) => p._id).reduce((p, c) => (p > c ? p : c));
    if (!highIndex && highIndex !== 0) newPlayer._id = score.length;
    else newPlayer._id = highIndex + 1;
    newPlayer.name = "Player " + String(newPlayer._id + 1);
    currentScore.push(newPlayer);
    setSelectedPlayer(null);
    await saveScore(currentScore);
  };

  const getPlayers = (newSortColumn) => {
    let players = [...score];
    if (newSortColumn.path === "points")
      players = players.sort((a, b) => {
        let x = 0;
        if (a.points[0].points > b.points[0].points) x = 1;
        else if (a.points[0].points < b.points[0].points) x = -1;
        if (newSortColumn.order === "desc") x = x * -1;
        return x;
      });
    else if (newSortColumn.path === "name")
      players = players.sort((a, b) => {
        let x = 0;
        if (a.name > b.name) x = 1;
        else if (a.name < b.name) x = -1;
        if (newSortColumn.order === "desc") x = x * -1;
        return x;
      });
    else if (newSortColumn.path === "_id")
      players = players.sort((a, b) => {
        let x = 0;
        if (a._id > b._id) x = 1;
        else if (a._id < b._id) x = -1;
        if (newSortColumn.order === "desc") x = x * -1;
        return x;
      });
    setScore(players);
  };

  return (
    <Screen
      scroll={true}
      header={
        <>
          <Header>Scorecard</Header>
          <HorizontalTabs
            tabs={tabs}
            selected={tab}
            onSelect={handleSelectTab}
            hideTitles={true}
          />
        </>
      }
      footer={
        tab === "home" &&
        score.length > 0 && (
          <BlockButton
            title="Add Player"
            size="small"
            color="btnInfo"
            onPress={handleAddPlayer}
          />
        )
      }
    >
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
          {tab === "home" && (
            <>
              <Names
                score={score}
                setScore={handleSetScore}
                selectedPlayer={selectedPlayer}
                setSelectedPlayer={setSelectedPlayer}
                nameEdit={nameEdit}
                onNameEdit={handleNameEdit}
                setNameEdit={setNameEdit}
                type={type}
                sortColumn={sortColumn}
                onSort={handleSort}
                onRemovePlayer={handleRemovePlayer}
              />
            </>
          )}
          {tab === "history" && (
            <History
              score={score}
              onCompleteEdit={setScoreFromHistory}
              type={type}
              initialValue={initialValue}
            />
          )}
          {tab === "help" && (
            <>
              <ScorecardSettings onResetScore={alertResetScores} />
            </>
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Scorecard;
