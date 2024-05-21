export const setFilter = (payload) => {
  return {
    type: "setFilter",
    payload,
  };
};
const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "setFilter":
      console.log("filter is", action.payload);
      return action.payload;

    default:
      return state;
  }
};

export default filterReducer;
