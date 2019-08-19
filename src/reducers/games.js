const initialGames = { games: [], activeTeams: [], staticData: {} };

const gamesReducer = (state = initialGames, action) => {
  switch (action.type) {
    case "GET_GAMES_SUCCESS":
      return action.payload;
    default:
      return state;
  }
};

export default gamesReducer;
