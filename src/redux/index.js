import initRedux from "./plumbing";
import reducer, { initialState } from "./reducer";

const { DataProvider, useRedux } = initRedux(reducer, initialState);

export { DataProvider, useRedux };
