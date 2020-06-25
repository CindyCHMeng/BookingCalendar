import React from "react";
import { Pagination } from 'react-bootstrap';
import moment from 'moment';

export default class Calendar extends React.Component {
	constructor(props) {
		super(props);

		this.weekdayTitle = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

		this.state = {
			curDate: moment(),
			fWeekDate: moment(moment().format('YYYY-MM-DD')).weekday(0),
			lWeekDate: moment(moment().format('YYYY-MM-DD')).weekday(6)
		}

		this.formatTimeBlock = this.formatTimeBlock.bind(this);
		this.formatTimeRangeBlock = this.formatTimeRangeBlock.bind(this);
		this.formatWeekBlock = this.formatWeekBlock.bind(this);
		this.getSchedule = this.getSchedule.bind(this);
	}

	formatTimeBlock(tStart, tEnd, isBooked) {
		let start = moment(tStart);
		let end = moment(tEnd);
		let style = "timeItem" + ((isBooked)? " __disabled" : "");

		let timeBlock = [];

		if (start.isValid() && end.isValid()) {
			let keyStemp = tStart.format("HH_")

			for (let i = start; i.isBefore(end, 'hour'); i.add(30, 'm')) {
				timeBlock.push(
					<div key={keyStemp + i} className={ style }>{ i.format('HH:mm') }</div>
				);
			}
		}

		return timeBlock;
	}

	formatTimeRangeBlock(timeRange) {
		let tRange = (timeRange) ? timeRange : [];		
		let tRangeBlock = [];

		for (let i = 0; i < tRange.length; ++i) {
			tRangeBlock.push(this.formatTimeBlock(tRange[i].start, tRange[i].end, tRange[i].isBooked));
		}

		return tRangeBlock;
	}

	formatWeekBlock() {
		const { t } = this.props;

		let list = (this.props.list) ? this.props.list : {};
		
		let weekBlock = [];

		for (let i = 0, tempDate = moment(this.state.fWeekDate); i < this.weekdayTitle.length; ++i, tempDate.add(1, 'd')) {
			let style = "dayTitle";
			let timeRangeBlock = [];

			if (tempDate.isBefore(this.state.curDate, 'd')) {
				style += " __disabled";
			} else {
				let dateTag = tempDate.format('YYYYMMDD');
				if (list.hasOwnProperty(dateTag)) {
					timeRangeBlock = this.formatTimeRangeBlock(list[dateTag]);
				}
			}

			weekBlock.push(
				<div key={'dayItem_' + i}  className='dayItem'>
					<div className={ style }>
						<div className='titleItem'> { t("Week." + this.weekdayTitle[i]) } </div>
						<div className='titleItem'> { tempDate.format('DD') } </div>
					</div>
					<div className="timeRange">
						{ timeRangeBlock }
					</div>
				</div>
			);
		}

		return weekBlock;
	}
	
	getSchedule(offset) {
		if (offset != 0) {
			this.setState({
				curDate: moment(),
				fWeekDate: this.state.fWeekDate.add(offset, 'days'),
				lWeekDate: this.state.lWeekDate.add(offset, 'days')	
			});
		}

		this.props.getSchedule(this.state.fWeekDate, this.state.lWeekDate);
	}

	componentDidMount() {
		this.getSchedule(0);
	}

	componentWillUnmount() {
		
	}

	render() {
		const { t } = this.props;

		const dateRange = this.state.fWeekDate.format('YYYY/MM/DD') + " - " + this.state.lWeekDate.format('DD');
		const timeZone = t('TZ_Msg').replace("{timeZone}", this.state.curDate.format('Z'));
		const weekBlock = this.formatWeekBlock();

		return (
			<div className="calendarBlock">
				<div className="infoBlock">
					<div className="pickBlock">
						<Pagination className="pagBlock">
							<Pagination.Prev disabled={ !((this.state.fWeekDate).isAfter(this.state.curDate, 'day')) } onClick={ () => this.getSchedule(-7) } />
							<Pagination.Next onClick={ () => this.getSchedule(7) } />
						</Pagination>
						<div className="dateBlock">
							{ dateRange }
						</div>
					</div>
					<div className="tzBlock">
						{ timeZone }
					</div>
				</div>
				<div className="weekdayBlock">
					{ weekBlock }
				</div>
			</div>
		)
	}
}