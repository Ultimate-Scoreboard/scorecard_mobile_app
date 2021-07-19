import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import * as StoreReview from "expo-store-review";
import Toast from "react-native-toast-message";

import {
  Screen,
  Header,
  Names,
  BlockButton,
  Error,
  HorizontalTabs,
  History,
  ScorecardSettings,
  BannerAd,
  TimerHome,
  TimerClock,
} from "./../components";
import { storageFunctions, allowables, sounds } from "../functions";
import routes from "../navigation/routes";
import SettingsContext from "./../context/settingsContext";

function Scorecard({ navigation, route }) {
  const { hideTimer, sound } = useContext(SettingsContext);
  const [tab, setTab] = useState("main");
  const [score, setScore] = useState([]);
  const [type, setType] = useState("incrementer");
  const [initialValue, setInitialValue] = useState(0);
  const [date, setDate] = useState(null);
  const [saved, setSaved] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [nameEdit, setNameEdit] = useState(false);
  const [sortColumn, setSortColumn] = useState({
    path: "",
    order: "",
  });
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [countdownTime, setCountdownTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [dtStart, setDtStart] = useState(0);
  const [timeAtStart, setTimeAtStart] = useState(0);
  const [timesUp, setTimesUp] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (timerStarted) {
      const timeNow = new Date().getTime();
      const timeToAdd = timeNow - dtStart;
      setTimeout(() => {
        if (timerStarted) {
          if (countdownTime) {
            if (timeRemaining > 0)
              setTimeRemaining(
                timeAtStart - timeToAdd > 0 ? timeAtStart - timeToAdd : 0
              );
          } else setTimeRemaining(timeAtStart + timeToAdd);
        }
      }, allowables.timeInterval);
      if (countdownTime && timeRemaining <= 0) {
        setTimeRemaining(countdownTime);
        sounds.playSound(sound);
        setTimesUp(true);
        setTimerStarted(false);
      }
    }
  });

  const startTimer = (bool, reset) => {
    setTimesUp(false);
    setTimerStarted(bool);
    if (bool) {
      setDtStart(new Date().getTime());
      setTimeAtStart(reset ? countdownTime : timeRemaining);
    }
  };

  const resetTime = () => {
    setTimesUp(false);
    startTimer(true, true);
  };

  const multiplier = type === "countdown" ? -1 : 1;
  const tabs = [
    { name: "main", icon: "clipboard-text", iconType: "material" },
    { name: "timer", icon: "progress-clock", iconType: "material" },
    { name: "help", icon: "help-circle", iconType: "material" },
  ];
  if (type === "tally" || type === "countdown")
    tabs.splice(1, 0, { name: "history", icon: "history", iconType: "font" });

  const switchToFirstTab = () => {
    setTab("main");
  };

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
    let currentDate = await storageFunctions.getAsyncStorage("date");
    let currentSaved = await storageFunctions.getAsyncStorage("saved");
    if (currentScore && currentType) {
      if (checkForParams()) {
        Alert.alert(
          route.params.saved ? "Reload Scorecard" : "Start New Scorecard",
          `You already have a scorecard in progress. ${
            route.params.saved ? "Reloading an old" : "Starting a new"
          } scorecard will delete your current data.\n\nAre you sure?`,
          [
            {
              text: "No",
              onPress: () =>
                retrieveScore(
                  currentScore,
                  currentType,
                  currentInitialValue,
                  Number(currentDate),
                  currentSaved === "true" ? true : false
                ),
            },
            { text: "Yes", onPress: () => startNewCard() },
          ]
        );
      } else
        retrieveScore(
          currentScore,
          currentType,
          currentInitialValue,
          Number(currentDate),
          currentSaved === "true" ? true : false
        );
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
    setDate(route.params.date);
    setSaved(route.params.saved);
    newScore = newScore.map((p) => JSON.stringify(p));
    await storageFunctions.saveAsyncStorage("score", JSON.stringify(newScore));
    await storageFunctions.saveAsyncStorage("type", route.params.type);
    await storageFunctions.saveAsyncStorage("date", String(route.params.date));
    await storageFunctions.saveAsyncStorage(
      "saved",
      route.params.saved ? "true" : "false"
    );
    if (route.params.type === "countdown")
      await storageFunctions.saveAsyncStorage(
        "initialValue",
        String(route.params.initialValue)
      );
    switchToFirstTab();
  };

  const retrieveScore = async (
    currentScore,
    currentType,
    currentInitialValue,
    currentDate,
    currentSaved
  ) => {
    currentScore = JSON.parse(currentScore);
    setScore(currentScore.map((p) => JSON.parse(p)));
    setType(currentType);
    setInitialValue(Number(currentInitialValue));
    setDate(currentDate);
    setSaved(currentSaved);
    switchToFirstTab();
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
    if (!value && value !== 0) return setSelectedPlayer(null);
    if (!selectedPlayer && selectedPlayer !== 0) return;
    let { currentScore, index, currentPlayer } = spreadToEdit({
      _id: selectedPlayer,
    });
    if (type === "incrementer") {
      currentPlayer.points = [{ set: 1, points: value }];
    }
    if (type === "tally" || type === "countdown") {
      if (isNaN(value)) {
        Toast.show({
          type: "error",
          text1: "Invalid Entry",
          text2: "Score entered must be a number",
          position: "top",
          visibilityTime: 2000,
          bottomOffset: 100,
          onPress: () => Toast.hide(),
        });
        return setSelectedPlayer(null);
      }
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
      `You are about to reset all scores to ${
        type === "countdown" ? String(initialValue) : "zero"
      }.\n\nAre you sure?`,
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
    switchToFirstTab();
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
    const {
      currentScore,
      index: playerIndex,
      currentPlayer,
    } = spreadToEdit(player);
    let history = [...currentPlayer.history];
    currentPlayer.points = [
      {
        set: 1,
        points:
          currentPlayer.points[0].points - history[index].points * multiplier,
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
    if (type === "countdown")
      newPlayer.points = [{ points: initialValue, set: 1 }];
    const highIndex = score.map((p) => p._id).reduce((p, c) => (p > c ? p : c));
    if (!highIndex && highIndex !== 0) newPlayer._id = score.length;
    else newPlayer._id = highIndex + 1;
    newPlayer.name = "Player " + String(newPlayer._id + 1);
    currentScore.push(newPlayer);
    setSelectedPlayer(null);
    await saveScore(currentScore);
  };

  const alertSave = () => {
    Alert.alert(
      "Save Scorecard",
      saved
        ? "Would you like to overwrite this scorecard in your saved cards?"
        : "Would you like to save this scorecard to your saved cards?",
      [{ text: "Cancel" }, { text: "Save", onPress: () => save() }],
      { cancelable: true }
    );
  };
  const save = async () => {
    const currentScore = [...score];
    let savedCards = await storageFunctions.getAsyncStorage("savedCards");
    let index = -1;
    if (!savedCards) {
      savedCards = [];
    } else {
      savedCards = JSON.parse(savedCards).map((c) => JSON.parse(c));
      index = savedCards.findIndex((c) => c.date === date);
    }
    const thisCard = {
      type,
      numberOfPlayers: currentScore.length,
      playerNames: currentScore.map((p) => p.name),
      score: currentScore,
      initialValue,
      date: date || new Date().getTime(),
    };
    if (index >= 0) savedCards.splice(index, 1, thisCard);
    else savedCards.push(thisCard);
    savedCards = savedCards.map((c) => JSON.stringify(c));
    await storageFunctions.saveAsyncStorage(
      "savedCards",
      JSON.stringify(savedCards)
    );
    setSaved(true);
    switchToFirstTab();
    Toast.show({
      type: "success",
      text1: "Scorecard Saved",
      text2: "Refresh the Saved Cards tab to view",
      position: "bottom",
      visibilityTime: 3000,
      bottomOffset: 100,
      onPress: () => Toast.hide(),
    });
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
      header={
        <>
          <Header>Scorecard</Header>
          <HorizontalTabs
            tabs={tabs}
            selected={tab}
            onSelect={handleSelectTab}
          />
        </>
      }
      footer={
        <>
          {tab === "main" && score.length > 0 && (
            <BlockButton
              title="Add Player"
              size="small"
              color="btnInfo"
              onPress={handleAddPlayer}
            />
          )}
          <BannerAd route={route.name} />
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
          {!hideTimer && (tab === "main" || tab === "history") && (
            <TimerClock
              timeRemaining={timeRemaining}
              setTimeRemaining={setTimeRemaining}
              countdownTime={countdownTime}
              timerStarted={timerStarted}
              setTimerStarted={startTimer}
              resetTime={resetTime}
              timesUp={timesUp}
            />
          )}
          {tab === "main" && (
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
            <>
              <History
                score={score}
                onCompleteEdit={setScoreFromHistory}
                type={type}
                initialValue={initialValue}
              />
            </>
          )}
          {tab === "timer" && (
            <TimerHome
              timeRemaining={timeRemaining}
              setTimeRemaining={setTimeRemaining}
              countdownTime={countdownTime}
              setCountdownTime={setCountdownTime}
              timerStarted={timerStarted}
              setTimerStarted={startTimer}
              resetTime={resetTime}
              timesUp={timesUp}
              setTimesUp={setTimesUp}
            />
          )}
          {tab === "help" && (
            <>
              <ScorecardSettings
                onResetScore={alertResetScores}
                onSave={alertSave}
              />
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
