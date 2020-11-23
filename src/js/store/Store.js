import React, { createContext, useReducer } from "react";
import { STORE_DEFAULTS } from "../model/StoreDefaults";
import { reducer } from "../reducer/AppLevelReducer";

export const Store = createContext(STORE_DEFAULTS);

export const PCProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, STORE_DEFAULTS);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
