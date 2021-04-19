import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";

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
import { storageFunctions } from "../functions";
import routes from "../navigation/routes";

function Scorecard({ navigation, route }) {
  const [tab, setTab] = useState("home");
  const [score, setScore] = useState([]);
  const [type, setType] = useState("incrementer");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [nameEdit, setNameEdit] = useState(false);
  const [sortColumn, setSortColumn] = useState({
    path: "",
    order: "",
  });
  const [error, setError] = useState(null);

  const tabs = [
    { name: "home", icon: "clipboard-text", iconType: "material" },
    { name: "help", icon: "help-circle", iconType: "material" },
  ];
  if (type === "tally")
    tabs.splice(1, 0, { name: "history", icon: "history", iconType: "font" });

  const checkForParams = () => {
    return route.params && route.params.type && route.params.players;
  };

  const checkForExistingCard = async () => {
    setError(null);
    // storageFunctions.clearAsyncStorage();
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
    setSortColumn({ path: "", order: "" });
    if (!checkForParams()) return setError("No scorecard in progress");
    let newScore = [...route.params.players];
    setScore(newScore);
    setType(route.params.type);
    newScore = newScore.map((p) => JSON.stringify(p));
    await storageFunctions.saveAsyncStorage("score", JSON.stringify(newScore));
    await storageFunctions.saveAsyncStorage("type", route.params.type);
    setTab("home");
  };

  const retrieveScore = async (currentScore, currentType) => {
    currentScore = JSON.parse(currentScore);
    setScore(currentScore.map((p) => JSON.parse(p)));
    setType(currentType);
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
    if (type === "tally") {
      currentPlayer.points = [
        {
          set: 1,
          points: Number(currentPlayer.points[0].points) + Number(value),
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
      player.points = [{ points: 0, set: 1 }];
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
      newTotal = currentPlayer.points[0].points + Number(value);
      history.push({ round: historyIndex, points: Number(value) });
    } else {
      newTotal =
        currentPlayer.points[0].points -
        history[historyIndex].points +
        Number(value);
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
              />
            </>
          )}
          {tab === "history" && (
            <History
              score={score}
              onCompleteEdit={setScoreFromHistory}
              onUndoRound={alertUndo}
            />
          )}
          {tab === "help" && (
            <ScorecardSettings onResetScore={alertResetScores} />
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
