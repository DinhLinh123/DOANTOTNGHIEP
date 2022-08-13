import { applyMiddleware, createStore } from "redux";
import mySaga from "./rootSaga"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./reducer";

const sagaMiddeware = createSagaMiddleware();
export default createStore(rootReducer, applyMiddleware(sagaMiddeware))
sagaMiddeware.run(mySaga)