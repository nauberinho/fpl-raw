import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import _ from "lodash";

// Actions
import { getLeague } from "../../actions/leagues";
import { getGames } from "../../actions/games";

//Icons
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

// Material UI Components
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Tabs
const LeagueLinks = styled.div`
  display: flex;
`;

const LeagueLink = styled(Link)`
  text-align: left;
  color: ${({ active }) => (active ? "lightgreen" : "black")};
  display: block;
  cursor: pointer;
  font-weight: 700;
  padding: 2rem 0;
  margin-right: 2rem;
  transition: 0.2s ease;
  &:hover {
    color: lightgreen;
  }
  cursor; pointer;
`;

// Animations
const animationIncreased = keyframes`
  from {
    background: red;
  }

  to {
    background: white;
  }
`;

const animationDecreased = keyframes`
  from {
    background: lightgreen;
  }

  to {
    background: white;
  }
`;

const Player = styled.div`
  padding: 1rem 1rem 1rem 0;
  color: gray;
  font-weight: 500;
  display: flex;
  animation: ${({ hasDecreased, hasIncreased }) => {
      if (hasDecreased) {
        return animationDecreased;
      } else if (hasIncreased) {
        return animationIncreased;
      }
    }}
    2s linear;
`;

const PlayerTrend = styled.div`
  flex: 1:
  padding: 0.9rem 1 0 0;
`;

const PlayerInfo = styled.div`
  flex: 2;
  text-align: left;
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
  text-align: left;
`;

const PlayerLiveInfo = styled.div`
  flex: 1;
  border; 1px solid lightred;
`;

const PlayerLiveInfoItem = styled.div`
  border: 1pxx solid lightgreen;
  text-align: left;
`;

const ArrowUp = styled(MdArrowDropUp)`
  color: lightgreen;
`;

const ArrowDown = styled(MdArrowDropDown)`
  color: red;
`;

const LeagueOverview = ({
  location,
  match,
  games,
  leagues,
  history,
  getLeague
}) => {
  const pathname = location.pathname;
  const leagueId = match.params.id;

  useEffect(() => {
    if (games.staticData.data) {
      clearInterval(getLeagueInterval);

      const indexOfPreviousEvent = _.findIndex(
        _.get(games, "staticData.data.events", []),
        ["is_current", true]
      );

      leagueId && getLeague(leagueId, history, indexOfPreviousEvent);
      var getLeagueInterval = setInterval(function() {
        leagueId && getGames();
      }, 30000); // Set to poll league every 30 second
    }
  }, [games.staticData]);

  const { staticData } = games;
  const previousLeagueResults = _.sortBy(
    _.get(leagues, "previousLeague.standings.results", []),
    [m => m.total]
  ).reverse();

  return (
    <>
      <LeagueLinks>
        <LeagueLink
          active={pathname.includes("results")}
          to={`/league/${leagueId}/results`}
        >
          Results
        </LeagueLink>
        <LeagueLink
          active={pathname.includes("charts")}
          to={`/league/${leagueId}/charts`}
        >
          Charts
        </LeagueLink>
        <LeagueLink
          active={pathname.includes("predictions")}
          to={`/league/${leagueId}/predictions`}
        >
          Predictions
        </LeagueLink>
      </LeagueLinks>

      {pathname.includes("results") && (
        <>
          {_.sortBy(leagues.members, m => m.summary_overall_points).map(
            (player, key) => {
              let numberOfActivePlayers = 0;
              const member = leagues.members.filter(
                p => p.overall.id === player.entry
              )[0];
              const { picks, overall } = member;
              for (var pick in picks) {
                if (
                  games.activeTeams.includes(
                    staticData.data.elements[picks[pick].element].team
                  )
                ) {
                  numberOfActivePlayers++;
                }
              }

              const captain = staticData.data.elements.filter(
                pl => pl.id === picks.filter(p => p.is_captain)[0].element
              )[0];

              const hasDecreased =
                key <
                _.findIndex(previousLeagueResults, ["entry", player.entry]);
              const hasIncreased =
                key >
                _.findIndex(previousLeagueResults, ["entry", player.entry]);

              // In progress
              // let totalEventPoints = 0;
              // for (var i in picks) {
              //   totalEventPoints += staticData.data.elements.filter(
              //     pl => pl.id === picks[i].element
              //   )[0].event_points;
              // }

              return (
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Player
                      hasDecreased={hasDecreased}
                      hasIncreased={hasIncreased}
                    >
                      <PlayerTrend>
                        {key % 2 === 0 ? <ArrowUp /> : <ArrowDown />}
                      </PlayerTrend>
                      <PlayerInfo>
                        <PlayerName>{`${key + 1}. ${
                          overall.player_first_name
                        } ${overall.player_last_name}`}</PlayerName>
                        <PlayerTeamName>{overall.name}</PlayerTeamName>
                      </PlayerInfo>
                      <PlayerScore>
                        {overall.summary_overall_points}
                      </PlayerScore>
                      <PlayerLiveInfo>
                        <PlayerLiveInfoItem>
                          • {numberOfActivePlayers} players are playing atm.
                        </PlayerLiveInfoItem>
                        {key % 2 === 0 && (
                          <PlayerLiveInfoItem>
                            • Wildcard played
                          </PlayerLiveInfoItem>
                        )}
                        {key % 2 === 1 && (
                          <PlayerLiveInfoItem>
                            • Captain:{" "}
                            {`${captain.first_name} ${captain.second_name}`}
                          </PlayerLiveInfoItem>
                        )}
                      </PlayerLiveInfo>
                    </Player>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>Hej</ExpansionPanelDetails>
                </ExpansionPanel>
              );
            }
          )}
        </>
      )}

      {/* TO DO: Make below paths parts of react router */}
      {pathname.includes("charts") && <>Charts</>}
      {pathname.includes("predictions") && (
        <>Available further into the season</>
      )}
    </>
  );
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    getLeague: (leagueReference, history, indexOfPreviousEvent) =>
      dispatch(getLeague(leagueReference, history, indexOfPreviousEvent)),
    getGames: () => dispatch(getGames())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LeagueOverview)
);
