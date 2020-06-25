import React from "react";
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Calendar from './components/Calendar';
import "./css/style.scss";
import {
	requestScheduleList
} from '../actions/index';

class ComponentContainer extends React.Component {
	constructor(props) {
		super(props);

		this.handleGetWeekSchedule = this.handleGetWeekSchedule.bind(this);
	}

	handleGetWeekSchedule(startDate, endDate) {
		this.props.requestScheduleList({
			start: startDate,
			end: endDate
		});
	}

	componentDidMount() {
		
	}

	componentWillUnmount() {

	}

	render() {
		const { t } = this.props;

		return (
			<div className="componentBlock">
				<div className="displayBlock">
					<h3>{ t('Available times') }</h3>
					<Calendar
						list={ this.props.scheduleList }
						getSchedule= { this.handleGetWeekSchedule }
						t = { t }
					/>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
		scheduleList: state.info.scheduleList
  }
}

function mapDispatchToProps(dispatch) {
  return {
		requestScheduleList: bindActionCreators(requestScheduleList, dispatch)
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
)(ComponentContainer);