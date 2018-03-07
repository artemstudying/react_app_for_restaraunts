import React,{Component} from 'react';


function Title (props){
	return <div className={props.cssClass}>{props.text}</div> 
}

export default Title;