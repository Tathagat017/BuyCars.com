import { reducer as authReducer } from "./Auth/reducer";
import { reducer as oemReducer } from "./OEM/reducer";
import { reducer as inventoryReducer } from "./Inventory/reducer";

import { applyMiddleware, Middleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers, legacy_createStore } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  oem: oemReducer,
  inventory: inventoryReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
