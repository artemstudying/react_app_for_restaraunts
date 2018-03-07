import React, { Component } from 'react';

class DateInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: null
		}
	}

	componentDidMount(){
		setInterval(()=>{
			this.updateTime();
		}, 1000);

	}

	updateTime() {
		this.setState({
			time: new Date().toLocaleTimeString(),
			date: new Date().toLocaleDateString(),
			weekday: new Date().toLocaleString('ru', {weekday: 'short'})
		})
	}

	render() {
		return (
			<div className={this.props.className}>
				<div>{this.state.time}</div>
				<div>{this.state.weekday}</div>
				<div>{this.state.date}</div>
			</div>
		)		
	};
};


// {made by Oleg Sokur(SoGo)}

export default DateInfo;
