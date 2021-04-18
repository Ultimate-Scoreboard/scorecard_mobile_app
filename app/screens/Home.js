import React, { useState } from "react";
import { StyleSheet } from "react-native";

import {
  Screen,
  Header,
  TypeSelect,
  PlayerSelect,
  Divider,
} from "../components";

function Home() {
  const [type, setType] = useState("inc");
  const [players, setPlayers] = useState(2);
  return (
    <Screen scroll={true}>
      <Header>New Scorecard</Header>
      <TypeSelect selected={type} setSelected={setType} />
      <Divider />
      <PlayerSelect numberOfPlayers={players} setNumberOfPlayers={setPlayers} />
      <Divider />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Home;
