import React, {Component} from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';

import AuthStyle from './Authorization.css';
import Input from '../Elements/Input/Input.jsx';
import BT from '../Elements/Button/BT';
import logo from './logo.png'
let login = "admin";
let password = "admin20";
class Authorization extends Component{
	constructor(props){
		super(props);
		this.state={
			login: props.login,
			pass : props.pass
		}
		this.passOnChange = this.passOnChange.bind(this);
		this.loginOnChange= this.loginOnChange.bind(this);
		this.sendData = this.sendData.bind(this);
	}

	loginOnChange(e){
		this.setState({login: e.target.value});
		// console.log(this.state.login);
	}

	passOnChange(e){
		this.setState({pass: e.target.value});
		// console.log(this.state.pass);
	}

	sendData(e){

		if(login == this.state.login & password == this.state.pass){
			this.props.history.push('./start');
		}
	}
	render(){
		return (
			<div>
				<div className='container-AUTH'>
					<img src={logo} alt="logo" className="logo"/>
					<form className="form_data-AUTH">
						<Input 
							type="text" 
							name="Имя пользователя"
							myStyleI="form_input-AUTH"
							nameL="Имя пользователя"
							myStyleL="form_label-AUTH" 
							updateValue={this.loginOnChange} 
							value={this.state.login}
						/>
						<Input 
							type="password" 
							name="Пароль"
							myStyleI="form_input-AUTH"
							nameL="Пароль"
							myStyleL="form_label-AUTH" 
							updateValue={this.passOnChange} 
							value={this.state.pass}
						/>
						<div className="bt__wrap">
							<BT BTname="авторизация" myStyle="bt_send" press={this.sendData}/>
							<BT BTname="отмена" myStyle="bt_cancel" press={this.sendData}/>
						</div>
					</form>
				</div>
			</div>
		)
	}
	
}

export default Authorization;