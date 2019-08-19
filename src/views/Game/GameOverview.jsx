import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";

const TeamItem = styled.div`
  display: flex;
  font-size: 1.5rem;
`;

const TeamName = styled.div`
  flex: 3;
`;

const TeamScore = styled.div``;

const BonusPoints = styled.div``;

const GameOverview = ({ games, match }) => {
  const gameToView = games.games.filter(
    g => g.code.toString() === match.params.gameId
  )[0];
  return (
    <div>
      <TeamItem>
        <TeamName>{_.get(gameToView, "homeTeam.name", "")}</TeamName>
        <TeamScore>{_.get(gameToView, "homeTeam.score", "")}</TeamScore>
      </TeamItem>
      <TeamItem>
        <TeamName>{_.get(gameToView, "awayTeam.name", "")}</TeamName>
        <TeamScore>{_.get(gameToView, "awayTeam.score", "")}</TeamScore>
      </TeamItem>
      <BonusPoints></BonusPoints>
    </div>
  );
};

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(GameOverview));
