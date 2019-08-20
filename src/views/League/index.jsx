import React from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

// Local components
import LeagueStartPage from "./LeagueStartPage";
import LeagueOverview from "./LeagueOverview";

const Container = styled.div`
  display: flex;
`;

const MenuBar = styled.div`
  display: flex;
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

const League = ({ leagues }) => {
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
