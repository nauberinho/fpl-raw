import React, { useEffect, useState } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

// Shared components
import Drawer from "../../components/Drawer";

// Local components
import LeagueStartPage from "./LeagueStartPage";
import LeagueOverview from "./LeagueOverview";

const Container = styled.div`
  display: flex;
`;

const DrawerContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 200px;
`;

const MenuBar = styled.div`
  display: flex;
`;

const DrawerButton = styled.div`
  flex: 1;
  text-align: right;
  cursor: pointer;
  padding: 2rem 0;
`;

const Title = styled.div`
  flec: 2;
  font-size: 2rem;
  font-weight: 700;
`;

const Content = styled.div`
  padding: 2rem;
  background: white;
  margin: auto;
  width: 100%;
  text-align: center;
`;

// Results
const Results = styled.div`
  border: 1px solid gray;
`;

const Player = styled.div`
  padding: 1rem 1rem 1rem 0;
  color: gray;
  font-weight: 500;
  display: flex;
`;

const PlayerInfo = styled.div`
  flex: 2;
`;

const PlayerName = styled.div`
  color: black;
`;
const PlayerTeamName = styled.div`
  font-size: 0.8rem;
  color: gray;
`;

const PlayerScore = styled.div`
  flex: 1;
`;

const League = ({ location, leagues }) => {
  const hasLeague = !_.isEmpty(leagues.league);
  return (
    <Router>
      <Container>
        <Content>
          <MenuBar>
            <MenuBar>
              <Title>
                {hasLeague
                  ? _.get(leagues, "league.league.name", "")
                  : "League"}
              </Title>
            </MenuBar>
          </MenuBar>

          <Switch>
            <Route exact path="/league" component={LeagueStartPage} />
            <Route path="/league/:id" component={LeagueOverview} />
          </Switch>
        </Content>
      </Container>
    </Router>
  );
};

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(League));
