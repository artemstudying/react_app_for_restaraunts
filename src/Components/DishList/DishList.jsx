import React , { Component} from 'react';
import BT from '../Elements/Button/BT.js';
// import TextField from '../Elements/TextField/TextField.js';
import Input from '../Elements/Input/Input.jsx';
import Title from '../Elements/Title/Title.jsx';

import DishListStyle from './DishList.css';

function BackToFuture(){
	alert('Полетели назад в будущее');
}
console.log('kek');

let order = {
    order_items:[]
}
class BarMenu extends Component{
	constructor(props){
		super(props);
        this.state = {
            data : [],
            list : [],
        };
        this.getDATA = this.getDATA.bind(this);
        this.addToBill = this.addToBill.bind(this);
        this.dishCountValue =this.dishCountValue.bind(this);
        // this.block = this.block.bind(this);
    }
    addToBill(name,s){
        this.state.data.forEach((item,i)=>{
            if(item.name === name){
                item.quantity != null ? item.quantity : item.quantity = 0;
                let a = JSON.parse(localStorage.Bill);
                a.order_items.forEach((dish,b)=>{
                    if(item.id == dish.id){
                        a.order_items.splice(b,1);
                        item.quantity += dish.quantity;
                    }else{

                    }
                })    
                a.order_items.push({
                    dish_id : item.id,
                    quantity:item.quantity
                });
                order.order_items.push({
                    id :item.id,
                    dish_name:item.name,
                    quantity:item.quantity,
                    price:item.price,
                });
                
                console.log(a.order_items);
                localStorage.setItem("Bill",JSON.stringify(a));
                localStorage.setItem("Order",JSON.stringify(order));
            }
        })

        console.log(s);
        return s = 'tr_c-DishList';
    }

    getDATA(){
            
    this.setState({data:JSON.parse(localStorage.Dish_List)});
        

    }
    componentWillMount(){
        this.getDATA();
    }
    dishCountValue(value,name){
        this.state.data.forEach((item,i)=>{
            if(item.name === name){
                console.log(item.quantity = parseInt(value));
            }
        })
    }
    changeColor(name) {
        this.state.data.forEach((item,i)=>{
            if(item.name === name) {
                
                // item.color = !item.color // toggle

                item.color = "rgba(87, 99, 154, 0.5)" // permament
            }
            this.setState({[item.color]: !item.color});
        })
    }
	render(){
        let info = this.state.data ? this.state.data.map((item,i)=>{
            let value;
            let s = 'tr_m-DishList';
            let bgColor = item.color ? "rgba(87, 99, 154, 0.5)" : "white"
            return(
            <tr key={i} className={s} style={{backgroundColor: bgColor}} onClick={() => this.changeColor(item.name)}>
                <td>{i+1}</td>
                <td onClick={(s) => this.addToBill(item.name,s)}>{item.name} </td>
                <td>{item.dish_out}</td>
                <td><input type="number" onChange={(e)=>this.dishCountValue(e.target.value,item.name)} className="inner_lable-DishList"/></td>
                <td>{item.price}</td>
            </tr>
            )  
        }) : '';

		return(
			<div className='container-bar_menu'>
				<div className='nav-bar_menu'>
					<BT BTname='Вернуться' myStyle='bt_back-nav-bar_menu' press={()=>{this.props.history.push('/category_list')}}/>
                    
                    <Title cssClass="dishlist__title" text="Список Блюд"/>
                    <BT BTname='В счёт' myStyle='bt_bill-nav-bar_menu' press={()=>{this.props.history.push('/bill')}}/>
				</div>
				<table>
					<thead>
						<tr >
							<td >№</td>
							<td>Наименование</td>
							<td>Остатки на складе</td>
							<td>Количество</td>
							<td>Цена</td>
						</tr>
					</thead>
					<tbody>
					{info}
					</tbody>
				</table>
			</div>
			)
	}
}
// made by Oleg Sokur(SoGo)
export default BarMenu;