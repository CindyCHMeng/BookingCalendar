import { all, fork } from 'redux-saga/effects';
import infoSaga from './infoSaga';

export default function* rootSaga() {
  yield all([
    fork(infoSaga),
  ]);
}