import moment from 'moment';
import {
  GET_SCHEDULELIST
} from '../actions';

const initState = {
  scheduleList: {}
};

function fakeAPI(sDate, eDate) {
  let sDateUTC = moment(sDate).utc();
  let eDateUTC = moment(eDate).utc();
  let result = {
    available: [],
    booked: []
  }

  while (sDateUTC.isSameOrBefore(eDateUTC, 'd')) {
    let temp = moment(sDateUTC).utc();

    result.available.push({
      start: temp.add(13, 'h').format(),
      end: temp.add(2, 'h').format()
    });
    result.booked.push({
      start: temp.add(3, 'h').format(),
      end: temp.add(2, 'h').format()
    });
    result.booked.push({
      start: temp.add(-10, 'h').format(),
      end: temp.add(2, 'h').format()
    });

    sDateUTC.add(1, 'd');
  }

  return result;
}

function formatScheduleList(sList, resList, isBooked) {
  for (let i = 0; i < resList.length; ++i) {
    let localSDate = moment(resList[i].start).local();
    let localEDate = moment(resList[i].end).local();

    if (localSDate.isValid() && localEDate.isValid()) {
      let dateTag = localSDate.format('YYYYMMDD');

      if (!sList.hasOwnProperty(dateTag)) {
        sList[dateTag] = [];
      }

      sList[dateTag].push({
        start: localSDate,
        end: localEDate,
        isBooked: isBooked
      });
    }
  }
}

function formatScheduleResult(available, booked) {
  let avbList = (available)? available : [];
  let bookList = (booked)? booked : [];
  let sList = {};

  formatScheduleList(sList, avbList, false);
  formatScheduleList(sList, bookList, true);

  for (let key in sList) {
    sList[key].sort( (a, b) => {
      return (moment(a.start).isBefore(moment(b.start)))? -1 : 1;
    });
  }

  return sList;
}

const infoReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_SCHEDULELIST:
      let fakeAPIResult = fakeAPI(action.data.start, action.data.end);
      let scheduleList = formatScheduleResult(fakeAPIResult.available, fakeAPIResult.booked);
      return {
        ...state,
        scheduleList: scheduleList
      }
    default:
      return state;
  }
}

export default infoReducer;