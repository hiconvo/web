import initRedux from "./plumbing";
import reducer, { initialState } from "./reducer";

const { DataProvider, useSelectors, useActions } = initRedux(
  reducer,
  initialState
);

export { DataProvider, useSelectors, useActions };
