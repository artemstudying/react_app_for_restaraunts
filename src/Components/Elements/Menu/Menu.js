import React , {Component} from 'react';


const itemMenu = [["Home","KEk"],"About us","Map"];


function generateList(arr) {
	let itemList = [];	
  <ul>{
    arr.forEach(function(item,i) {
        Array.isArray(item) ?itemList.push(<li><ul>{generateList(item)}</ul></li>):itemList.push(<li>{item}</li>) })}</ul>
	return itemList;
}
console.log(generateList(itemMenu));



function MenuWrapper(props){
		return <ul>{props.tags}</ul>
	}
class Menu extends Component{
	render(){
		// console.log(menu(itemMenu));
		return <MenuWrapper  tags={generateList(itemMenu)}/> 
	}
}


export default Menu;