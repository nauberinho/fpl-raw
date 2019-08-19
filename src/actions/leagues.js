import axios from "axios";
import _ from "lodash";

export const getLeague = (leagueReference, history, indexOfPreviousEvent) => {
  const popped = leagueReference.split(".com/leagues/").pop();
  const code = popped.split("/")[0];
  return dispatch => {
    axios({
      method: "get",
      url: `https://fantasy.premierleague.com/api/leagues-classic/${code}/standings/?page_new_entries=${indexOfPreviousEvent}&page_standings=1&phase=1`
    }).then(({ data }) => {
      console.log(data, "data");
      loopThrough(data).then(({ members, leagueData }) => {
        dispatch({
          type: "GET_LEAGUE_SUCCESS",
          payload: {
            league: leagueData,
            members: members
          }
        });
      });

      history.push(`/league/${code}/results`);
    });
  };
};

export const updateLeague = (
  leagueReference,
  history,
  indexOfPreviousEvent
) => {
  const popped = leagueReference.split(".com/leagues/").pop();
  const code = popped.split("/")[0];
  return dispatch => {
    axios({
      method: "get",
      url: `https://fantasy.premierleague.com/api/leagues-classic/${code}/standings/?page_new_entries=${indexOfPreviousEvent}&page_standings=1&phase=1`
    })
      .then(({ data }) => {
        // for (var team in _.get(data, "standings.results", [])) {
        //   if (team % 2 === 0) {
        //     _.get(data, "standings.results", [])[team].total += Math.floor(
        //       Math.random() * 20
        //     );
        //   }
        // }

        loopThroughAndSimulate(_.get(data, "standings.results", [])).then(
          members => {
            dispatch({
              type: "UPDATE_LEAGUE_SUCCESS",
              payload: {
                league: data,
                members: members
              }
            });
          }
        );
      })
      .catch(e => console.log(e));
  };
};

async function loopThrough(leagueData) {
  const listOfMembers = [];
  const members = _.get(leagueData, "standings.results", []);
  for (var member in members) {
    const memberEntry = members[member].entry;
    try {
      const req = await axios({
        method: "get",
        url: `https://fantasy.premierleague.com/api/entry/${memberEntry}/event/1/picks/`
      });
      const pointsReq = await axios({
        method: "get",
        url: `https://fantasy.premierleague.com/api/entry/${memberEntry}/`
      });
      console.log(req.data, "pointsReq");
      // const member = leagues.members.filter(
      //   p => p.overall.id === player.entry
      // )[0];
      const memberObject = {
        ...req.data,
        entry: memberEntry,
        overall: pointsReq.data
      };
      listOfMembers.push(memberObject);
    } catch {
      console.log("Could not fetch all members.");
    }
  }
  return {
    leagueData,
    members: _.sortBy([...listOfMembers], m => m.summary_overall_points)
  };
}

async function loopThroughAndSimulate(members) {
  const listOfMembers = [];
  for (var member in members) {
    const memberEntry = members[member].entry;
    try {
      const req = await axios({
        method: "get",
        url: `https://fantasy.premierleague.com/api/entry/${memberEntry}/event/1/picks/`
      });
      const memberObject = { ...req.data, entry: memberEntry };
      listOfMembers.push(memberObject);
    } catch {
      console.log("Could not fetch all members.");
    }
  }
  return listOfMembers;
}
