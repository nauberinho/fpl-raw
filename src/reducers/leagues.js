const initialState = {
  league: {},
  previousLeague: {},
  members: []
};

const leaguesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LEAGUE_SUCCESS":
      return {
        ...state,
        league: action.payload.league,
        members: action.payload.members
      };
    case "UPDATE_LEAGUE_SUCCESS":
      return {
        league: action.payload.league,
        previousLeague: state.league,
        members: action.payload.members
      };
    default:
      return state;
  }
};

export default leaguesReducer;
