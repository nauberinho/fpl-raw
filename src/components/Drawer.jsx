import React from "react";

import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

import { mediaQueries, theme } from "../shared/theme";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { connect } from "react-redux";

import _ from "lodash";

const SmallScreens = styled.div`
    display: flex;
    width: 100vw;
    @media ${mediaQueries.tablet("min")} {
        display: none;
        width: 0vw;
    }
    sans-serif;  
`;

const LargeScreens = styled.div`
position: fixed;
left: 0;
    @media ${mediaQueries.tablet("min")} {
        display: block;
    }
    @media ${mediaQueries.tablet("max")} {
        display: none;
    }
    sans-serif;
    display: flex;
    border-right: 2px solid lightgray;
    min-height: 100vh;
`;

// League

const League = styled(Link)`
  color: blue;
  padding: 2rem;
  border: 2px solid orange;
`;

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

const GameScore = styled.div`
  color: gray;
`;
const GameTime = styled.div`
  color: gray;
`;

// League Links

// Tabs
const LeagueLinks = styled.div``;

const LeagueLink = styled(Link)`
  text-align: center;
  color: black;
  display: block;
  cursor: pointer;
  font-weight: 700;
  padding: 1rem 2rem 1rem 0;
  transition: 0.2s ease;
  &:hover {
    color: lightgreen;
  }
`;
const DrawerComponent = ({ games, leagues, onClose, isOpen, location }) => {
  console.log("location: ", location);
  const { pathname } = location;
  return (
    <>
      <SmallScreens>
        <SwipeableDrawer open={isOpen} onClose={onClose}>
          Hej
        </SwipeableDrawer>
      </SmallScreens>
      <LargeScreens>
        {pathname.includes("game") && (
          <>
            {games.map((g, key) => (
              <Game to="some-link">
                <GameTitle>{`${g.homeTeam.name} ${g.homeTeam.score}`}</GameTitle>
                <GameTitle>{`${g.awayTeam.name} ${g.awayTeam.score}`}</GameTitle>
                <GameTime>
                  {g.time.finished ? "FT" : <div>{`${g.time.minutes}'`}</div>}
                </GameTime>
              </Game>
            ))}
          </>
        )}
        {pathname.includes("league") && (
          <>
            <LeagueLinks>
              <LeagueLink to="/league/results">Results</LeagueLink>
              <LeagueLink to="/league/charts">Charts</LeagueLink>
              <LeagueLink to="/league/predictions">Predictions</LeagueLink>
              <LeagueLink to="/league/side-bets">Side Bets</LeagueLink>
            </LeagueLinks>
          </>
        )}
      </LargeScreens>
    </>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return { ...state };
};

export default withRouter(connect(mapStateToProps)(DrawerComponent));
