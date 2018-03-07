import React , {Component } from 'react';
import BT from '../Elements/Button/BT';
import StartStyle from './StartStyle.css';


class Start extends Component{
    constructor(props){
        super(props);
        this.initBill=this.initBill.bind(this);
        this.exit=this.exit.bind(this);
    }
    initBill(){
        localStorage.setItem("Bill",JSON.stringify({
        table_number:'',
        number_of_persons:'',
        sale_type:'',
        pay_type:'',
        order_items:[]
        })); 
        localStorage.setItem("Order",JSON.stringify({order_items:[]}));
        this.props.history.push('/bill');
    }
    exit() {
        this.props.history.push('/');
        // this.props.history.length = 0;
        // console.log(this.props.history.length);
    }

    render(){
        return( 
            <div className="container-StartPage">
                <button className="bt-sp-exit" onClick={ ()=> this.exit() } >Выход</button>
                <div className="navigator_bt-StartPage">
                    <div className="navigator_bt-row">
                        <BT myStyle="bt-StartPage bt-sp-new-bill" BTname="создать счет" press={this.initBill}/>
                        <BT myStyle="bt-StartPage bt-sp-cashbox" BTname="отчёт" press={()=>this.props.history.push('./report')}/>
                    </div> 
                    <div className="navigator_bt-row">
                        <BT myStyle="bt-StartPage bt-sp-opened-bills" BTname="открытые счета" press={()=>this.props.history.push('./opened_bills')}/>
                        <BT myStyle="bt-StartPage bt-sp-shift" BTname="смены" press={()=>this.props.history.push('./shift')}/>
                    </div>
               </div>
            </div>
        )
    }
} 

// press={()=>this.props.history.push('./opened_bills')}
export default Start;