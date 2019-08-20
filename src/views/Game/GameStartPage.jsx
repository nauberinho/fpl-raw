import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

// Game Links

const Game = styled(Link)`
  border-bottom: 1px solid lightgreen;
  padding: 1rem 0.2rem;
  cursor: pointer;
  color: black;
  width: 200px;
  display: block;
`;

const GameTitle = styled.div`
  font-size: 1.2rem;
  font-wesight: 500;
`;

const GameTime = styled.div`
  color: gray;
`;

const GameStartPage = ({ games, match }) => {
  return (
    <>
      Start
      {games.map((g, key) => (
        <Game to={`/game/${g.code}`}>
          <GameTitle>{`${g.homeTeam.name} ${g.homeTeam.score}`}</GameTitle>
          <GameTitle>{`${g.awayTeam.name} ${g.awayTeam.score}`}</GameTitle>
          <GameTime>
            {g.time.finished ? "FT" : <div>{`${g.time.minutes}'`}</div>}
          </GameTime>
        </Game>
      ))}
    </>
  );
};

const mapStateToProps = state => {
  return { ...state };
};

export default withRouter(connect(mapStateToProps)(GameStartPage));
