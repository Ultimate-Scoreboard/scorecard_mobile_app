import React, { useState } from "react";
import { StyleSheet } from "react-native";

import {
  Screen,
  Header,
  CreationForm,
  EnterPlayers,
  Error,
  BlockButton,
} from "../components";
import routes from "../navigation/routes";
import { allowables } from "../functions";

function Home({ navigation }) {
  const [page, setPage] = useState("form");
  const [type, setType] = useState("tally");
  const [initialValue, setInitialValue] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [players, setPlayers] = useState([]);
  const [playersVisible, setPlayersVisible] = useState(false);
  const [error, setError] = useState(null);

  const addPlayers = (returnArray) => {
    let currentPlayers = [];
    if (players.length === 0) {
      currentPlayers = Array.from({ length: numberOfPlayers }, () => {
        return { ...allowables.blankPlayer };
      });
    } else {
      const playersToAdd = numberOfPlayers - players.length;
      currentPlayers = [...players];
      if (playersToAdd > 0) {
        const add = Array.from({ length: playersToAdd }, () => {
          return { ...allowables.blankPlayer };
        });
        currentPlayers.push(...add);
      } else if (playersToAdd < 0) {
        currentPlayers.splice(numberOfPlayers);
      }
    }
    setPlayers(currentPlayers);
    if (returnArray) return currentPlayers;
  };

  const handleSelectPage = () => {
    if (page === "form") {
      addPlayers();
      setPlayersVisible(true);
    } else if (page === "players") setPage("form");
  };

  const handleEditPlayer = (value, index) => {
    let currentPlayers = [...players];
    let currentPlayer = { ...players[index] };
    currentPlayer.name = value;
    currentPlayers.splice(index, 1, currentPlayer);
    setPlayers(currentPlayers);
  };

  const handleResetNames = () => {
    const blankPlayers = Array.from({ length: numberOfPlayers }, () => {
      return { ...allowables.blankPlayer };
    });
    setPlayers(blankPlayers);
  };

  const handleConfirm = (source) => {
    setError(null);
    let currentPlayers = [...players];
    if (source === "form") currentPlayers = addPlayers(true);
    let finalPlayers = [];
    const startingValue = Number(initialValue) || 0;
    currentPlayers.forEach((p, i) => {
      let player = { ...p };
      if (player.name === "") player.name = `Player ${String(i + 1)}`;
      player._id = i;
      if (type === "countdown")
        player.points = [{ points: startingValue, set: 1 }];
      finalPlayers.push(player);
    });
    setPlayersVisible(false);
    navigation.navigate(routes.SCORECARD, {
      type,
      players: finalPlayers,
      initialValue: startingValue,
      date: new Date().getTime(),
      saved: false,
    });
  };

  return (
    <Screen
      scroll={true}
      header={
        <>
          <Header>New Scorecard</Header>
          {error && <Error>{error}</Error>}
        </>
      }
      footer={
        <BlockButton
          title="Start"
          color="btnInfo"
          onPress={() => handleConfirm("form")}
        />
      }
    >
      <CreationForm
        type={type}
        setType={setType}
        initialValue={initialValue}
        setInitialValue={setInitialValue}
        numberOfPlayers={numberOfPlayers}
        setNumberOfPlayers={setNumberOfPlayers}
        onNext={handleSelectPage}
      />
      <EnterPlayers
        onConfirm={handleConfirm}
        players={players}
        onEditPlayer={handleEditPlayer}
        onResetNames={handleResetNames}
        visible={playersVisible}
        setVisible={setPlayersVisible}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Home;
