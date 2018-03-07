import React , { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect
  } from 'react-router-dom';
import Start from './Components/PageStart/Start.jsx';
import Authorization from './Components/Authorization/Authorization';
import Bill from './Components/Bill/Bill';
import DishList from './Components/DishList/DishList';
import CategoryList from './Components/CategoryList/CategoryList';
import OpenedBills from './Components/OpenedBills/OpenedBills';
import Header from './Components/Header/Header.jsx';
import Report from './Components/Report/Report';
import Shift from './Components/Shifts/Shifts';

function App (props){
	return (
		<Router>
			<div>
				<Header/>
				<Route exact path="/" component={Authorization}/>
				<Route  path="/start" component={Start}/>
				<Route path="/bill" component={Bill}/>
				<Route path="/category_list" component={CategoryList}/>
				<Route path="/dish_list" component={DishList}/>
				<Route path="/opened_bills" component={OpenedBills}/>
				<Route path="/report" component={Report}/>
				<Route path="/shift" component={Shift}/>
			</div>
		</Router>
		)
}
// made by Oleg Sokur(SoGo)
export default App;