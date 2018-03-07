import React, { Component } from 'react';
import './Numpad.css';

class Numpad extends Component {
	constructor(props){
		super(props);
		this.state = {
			number: ''
		};
		this.clickNumber = this.clickNumber.bind(this);
	}
	clickNumber(event){
		this.setState({
			number: this.state.number += event.currentTarget.dataset.value
		});
	}
	render() {
		return (
			<div className="numpad">
			<h1>{this.state.number}</h1>
				<div className="numpad-line">
					<div onClick={this.clickNumber} className="numpad-number" data-value="1">1</div>
					<div onClick={this.clickNumber} className="numpad-number" data-value="2">2</div>
					<div onClick={this.clickNumber} className="numpad-number" data-value="3">3</div>
				</div>
				<div className="numpad-line">
					<div onClick={this.clickNumber} className="numpad-number" data-value="4">4</div>
					<div onClick={this.clickNumber} className="numpad-number" data-value="5">5</div>
					<div onClick={this.clickNumber} className="numpad-number" data-value="6">6</div>
				</div>
				<div className="numpad-line">
					<div onClick={this.clickNumber} className="numpad-number" data-value="7">7</div>
					<div onClick={this.clickNumber} className="numpad-number" data-value="8">8</div>
					<div onClick={this.clickNumber} className="numpad-number" data-value="9">9</div>
				</div>
				<div className="numpad-line">
					<div onClick={this.clickNumber} className="numpad-number" data-value="0">0</div>
					<div className="numpad-number">x</div>
					<div className="numpad-number">ok</div>
				</div>
			</div>
		);
	}
}

export default Numpad;
