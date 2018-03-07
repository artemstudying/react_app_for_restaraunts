import React , {Component} from 'react';
import BTstyle from './BT.css'

class BT extends Component {
		constructor(props){
			super(props);
		this.press = this.press.bind(this);
		}
		press(e){
			this.props.press(e);
		}
		render(){
			return <div className={(this.props.myStyle)} onClick={this.press}>{this.props.BTname}</div>
		}
		
}

export default BT;