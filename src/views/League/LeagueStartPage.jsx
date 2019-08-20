import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

// Actions
import { getLeague } from "../../actions/leagues";

const DrawerContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 200px;
`;

const InputWrapper = styled.div`
  display: flex;
  height: 5rem;
  width: 50%;
  margin: auto;
`;

const Title = styled.div`
  font-size: 1.3rem;
  padding: 2rem;
`;

const Input = styled.input`
  background: rgb(237, 237, 237);
  color: black;
  border: none;
  display: block;
  margin: auto;
  height: 100%;
  flex: 3;
  padding: 0 2rem;
  font-size: 1rem;
  outline: none;
`;

const Button = styled.button`
  height: 100%;
  transition: 0.2s ease,
  border: 0;
  outline: none;
  background: ${({ disabled }) => (disabled ? "lightgray" : "lightgreen")};
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  flex: 1;
  cursor: pointer;
`;
const LeagueStartPage = ({ games, getLeague, history }) => {
  const [leagueReference, setLeagueReference] = useState("");
  const indexOfPreviousEvent = _.findIndex(
    _.get(games, "staticData.data.events", []),
    ["is_current", true]
  );

  return (
    <>
      <Title>Insert your leagues code or url to get started</Title>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Ex. https://fantasy.premierleague.com/leagues/85198/standings/c"
          onChange={e => setLeagueReference(e.target.value)}
          onKeyDown={e => {
            console.log(e.keyCode);
            e.keyCode === 13 &&
              getLeague(leagueReference, history, indexOfPreviousEvent);
          }}
        />
        <Button
          disabled={leagueReference === ""}
          onClick={() => {
            console.log(leagueReference, "=leagueReference");

            getLeague(leagueReference, history, indexOfPreviousEvent);
          }}
        >
          >
        </Button>
      </InputWrapper>
    </>
  );
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  getLeague: (leagueReference, history, indexOfPreviousEvent) =>
    dispatch(getLeague(leagueReference, history, indexOfPreviousEvent))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LeagueStartPage)
);
