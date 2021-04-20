import React from "react";

import HorizontalIncrementer from "./../form/HorizontalIncrementer";

function PlayerSelect({ numberOfPlayers, setNumberOfPlayers }) {
  return (
    <HorizontalIncrementer
      value={numberOfPlayers}
      setValue={setNumberOfPlayers}
      increment={1}
      min={1}
      max={99}
      header="Number of players/teams"
    />
  );
}

export default PlayerSelect;
