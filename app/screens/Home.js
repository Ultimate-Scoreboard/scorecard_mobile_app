import React, { useState } from "react";
import { StyleSheet } from "react-native";

import {
  Screen,
  Header,
  CreationForm,
  EnterPlayers,
  Error,
} from "../components";
import routes from "../navigation/routes";

function Home({ navigation }) {
  const [page, setPage] = useState("form");
  const [type, setType] = useState("incrementer");
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const blankPlayer = {
    name: "",
  };

  const handleSelectPage = () => {
    if (page === "form") {
      let currentPlayers = [];
      if (players.length === 0) {
        currentPlayers = Array.from(
          { length: numberOfPlayers },
          () => blankPlayer
        );
      } else {
        const playersToAdd = numberOfPlayers - players.length;
        currentPlayers = [...players];
        if (playersToAdd > 0) {
          const add = Array.from({ length: playersToAdd }, () => blankPlayer);
          currentPlayers.push(...add);
        } else if (playersToAdd < 0) {
          currentPlayers.splice(numberOfPlayers);
        }
      }
      setPlayers(currentPlayers);
      setPage("players");
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
    const blankPlayers = Array.from(
      { length: numberOfPlayers },
      () => blankPlayer
    );
    setPlayers(blankPlayers);
  };

  const handleConfirm = () => {
    setError(null);
    const haveNames = players.every((p) => p.name !== "");
    if (!haveNames) return setError("All players must be given a name");
    navigation.navigate(routes.SCORECARD, { type, players });
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
    >
      {page === "form" && (
        <CreationForm
          type={type}
          setType={setType}
          numberOfPlayers={numberOfPlayers}
          setNumberOfPlayers={setNumberOfPlayers}
          onNext={handleSelectPage}
        />
      )}
      {page === "players" && (
        <EnterPlayers
          onPrevious={handleSelectPage}
          onConfirm={handleConfirm}
          players={players}
          onEditPlayer={handleEditPlayer}
          onResetNames={handleResetNames}
          type={type}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Home;
