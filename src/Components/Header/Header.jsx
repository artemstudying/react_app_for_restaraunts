import React, { Component } from 'react';
import DateInfo from '../Elements/Date/DateInfo.jsx'
import dollar from './dollar.svg'
import calendar from './calendar.svg'
import bell from './bell.svg'

import HeaderStyle from './Header.css';

class Header extends Component {
	 render(){
	 	return(
	 			<header className="header">
					<div className="header__wrap">
						<div className="header__waiter">
							<div className="header__waiter-avatar"></div>
							<div className="header__waiter-name">Иванов Иван</div>
						</div>
						<DateInfo className="header__date"/>
						<div className="header__controls">
							<img src={dollar} alt="" className="header__controls-icon"/>
							<img src={calendar} alt="" className="header__controls-icon"/>
							<img src={bell} alt="" className="header__controls-icon"/>
							<button className="header__controls-bt">СТОП-ЛИСТ</button>
						</div>
					</div>
	 			</header>
	 		)
	 }
}
// {made by Oleg Sokur(SoGo)}
export default Header;