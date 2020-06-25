import {
  GET_SCHEDULELIST
} from '../actions';

export function requestScheduleList(data) {
  return {
    type: GET_SCHEDULELIST,
    data
  }
}