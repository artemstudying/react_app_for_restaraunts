import React,{Component} from 'react';
import InputStyle from './Input.css';

class Input extends Component{
	constructor(props){
		super(props);
		this.state = {value: props.value}
		this.updateValue = this.updateValue.bind(this);
	}
	
	updateValue(e){
		this.props.updateValue(e);
	}
	
	render(){
		const { type, name , value , id  } = this.props;
		return(
			<div className="group">
				<input
					className={this.props.myStyleI}
					id={id}
					type={type}
					name={name}
					onChange = {this.updateValue}
					value={this.state.value}
				/>
				<span className="bar"></span>
				<label className={this.props.myStyleL}>{this.props.nameL}</label>
			</div>
		);
	}

}

export default Input;