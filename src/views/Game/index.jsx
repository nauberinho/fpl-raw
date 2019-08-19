import React, { useState } from "react";
import { withRouter, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import { Route } from "react-router-dom";

// Shared components
import Drawer from "../../components/Drawer";

// Local components
import GameStartPage from "./GameStartPage";
import GameOverview from "./GameOverview";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: white;
`;

const DrawerButton = styled.div`
  border: 2px solid orange;
  cursor: pointer;
`;

const DrawerContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 200px;
`;

const Content = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const Game = ({ game }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(game ? true : false);
  return (
    <Router>
      <Container>
        {isDrawerOpen && (
          <DrawerContainer>
            <Drawer />
          </DrawerContainer>
        )}

        <Content>
          <DrawerButton onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            Toggle drawer
          </DrawerButton>
          <Route exact path="/game" component={GameStartPage} />
          <Route path={`/game/:gameId`} component={GameOverview} />
        </Content>
      </Container>
    </Router>
  );
};

export default withRouter(Game);
