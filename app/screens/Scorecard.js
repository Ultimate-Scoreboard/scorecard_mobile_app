import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import {
  Screen,
  Header,
  Incrementer,
  BlockButton,
  Error,
} from "./../components";
import { storageFunctions } from "../functions";
import routes from "../navigation/routes";

function Scorecard({ navigation, route }) {
  const [score, setScore] = useState([]);

  const checkForParams = () => {
    return route.params && route.params.type && route.params.players;
  };

  const retrieveScore = async () => {
    if (!checkForParams()) return;
    let currentScore = await storageFunctions.getAsyncStorage("score");
    if (!currentScore) setScore(route.params.players);
    else {
      currentScore = JSON.parse(currentScore.map((p) => JSON.parse(p)));
      setScore(currentScore);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) retrieveScore();

    return function cleanup() {
      mounted = false;
    };
  });

  return (
    <Screen>
      <Header>Scorecard</Header>
      {!checkForParams() ? (
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
          {route.params.type === "incrementer" && (
            <Incrementer score={score} setScore={setScore} />
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
