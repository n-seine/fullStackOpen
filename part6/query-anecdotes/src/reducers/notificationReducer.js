import { useReducer } from "react";

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.data;
    default:
      return "";
  }
};
