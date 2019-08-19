import { combineReducers } from "redux";
import games from "./games";
import leagues from "./leagues";

export default combineReducers({
  games,
  leagues
});
