import React, { useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

import { mediaQueries } from "./shared/theme";

// Actions
import { getGames } from "./actions/games";

// Views
import League from "./views/League";
import Game from "./views/Game";
import Home from "./views/Home";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Open Sans Condensed", sans-serif;
  overflow-x: hidden;
  min-height: 100vh;
  background: rgba(255, 255, 255, 1);
  background: -moz-linear-gradient(
    top,
    rgba(255, 255, 255, 1) 0%,
    rgba(246, 246, 246, 1) 47%,
    rgba(237, 237, 237, 1) 72%,
    rgba(237, 237, 237, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    left bottom,
    color-stop(0%, rgba(255, 255, 255, 1)),
    color-stop(30%, rgba(255, 255, 255, 1)),
    color-stop(47%, rgba(246, 246, 246, 1)),
    color-stop(72%, rgba(237, 237, 237, 1)),
    color-stop(100%, rgba(237, 237, 237, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 30%,
    rgba(246, 246, 246, 1) 47%,
    rgba(237, 237, 237, 1) 72%,
    rgba(237, 237, 237, 1) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 30%,
    rgba(246, 246, 246, 1) 47%,
    rgba(237, 237, 237, 1) 72%,
    rgba(237, 237, 237, 1) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 30%,
    rgba(246, 246, 246, 1) 47%,
    rgba(237, 237, 237, 1) 72%,
    rgba(237, 237, 237, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 30%,
    rgba(246, 246, 246, 1) 47%,
    rgba(237, 237, 237, 1) 72%,
    rgba(237, 237, 237, 1) 100%
  );
  a {
    text-decoration: none;
  }
  @media ${mediaQueries.desktop("min")} {
    padding: 0rem 35rem;
  }
  @media ${mediaQueries.laptopL("min")} {
    padding: 0rem 30rem;
  }
  @media ${mediaQueries.laptopL("max")} {
    padding: 0rem 10rem;
  }
  @media ${mediaQueries.laptop("max")} {
    padding: 0rem 2rem;
  }
  @media ${mediaQueries.tablet("max")} {
    padding: 0rem;
  }
`;

const App = props => {
  useEffect(() => {
    props.getGames();
  }, []);

  return (
    <AppContainer>
      <Router>
        <Link to="/">FPL Raw</Link>
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Game} />
        <Route path="/league" component={League} />
      </Router>
    </AppContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  getGames: () => dispatch(getGames())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
