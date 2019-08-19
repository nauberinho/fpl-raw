import axios from "axios";

export const getGames = () => {
  return dispatch => {
    // GET request for remote image
    axios({
      method: "get",
      url: "https://fantasy.premierleague.com/api/bootstrap-static/"
    }).then(staticData => {
      const eventNumber = staticData.data.events.filter(e => e.is_current)[0]
        .id;
      console.log(staticData.data);
      axios({
        method: "get",
        url: `https://fantasy.premierleague.com/api/fixtures/?event=${eventNumber}`
      }).then(({ data }) => {
        const activeTeams = [];
        console.log(data, "=games");
        const games = data.map(game => {
          if (game.finished === false && game.started === true) {
            console.log(
              staticData.data.teams[game.team_h - 1].name,
              staticData.data.teams[game.team_a - 1].name
            );
            activeTeams.push(game.team_h);
            activeTeams.push(game.team_a);
            console.log(game, "=game");
          }
          return {
            code: game.code,
            homeTeam: {
              name: staticData.data.teams[Number(game.team_h) - 1].name,
              score: game.team_h_score
            },
            awayTeam: {
              name: staticData.data.teams[Number(game.team_a) - 1].name,
              score: game.team_a_score
            },
            time: {
              finished: game.finished,
              minutes: game.minutes
            }
          };
        });
        dispatch({
          type: "GET_GAMES_SUCCESS",
          payload: { games, activeTeams, staticData }
        });
      });
    });
  };
};
