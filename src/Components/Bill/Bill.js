import React , { Component } from 'react';
import Title from '../Elements/Title/Title.jsx';
import Input from '../Elements/Input/Input.jsx';
import BT from '../Elements/Button/BT';
import BillStyle from './BillStyle.css';
import ReactModal from 'react-modal';

import img1 from './icon_stock/1.png';
import img2 from './icon_stock/2.png';
import img3 from './icon_stock/3.png';


class Bill extends Component {
  constructor(props){
		super(props);
        this.state = {
            table_number:props.table_number,
            number_of_persons:props.number_of_persons,
            sale_type:props.sale_type,
            pay_type:'CASH',
            data: [],
            orders: [],
            showModal: false,
            showModalBillSend:false
        }
        this.getDishCategories = this.getDishCategories.bind(this);
        this.tableNumber = this.tableNumber.bind(this);
        this.numberOfPerson = this.numberOfPerson.bind(this);
        this.getTakeOut = this.getTakeOut.bind(this);
        this.getDelivery = this.getDelivery.bind(this);
        this.getThere = this.getThere.bind(this);
        this.getPayType = this.getPayType.bind(this);
        this.sendBill = this.sendBill.bind(this);
        this.goBack = this.goBack.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.openModalBill = this.openModalBill.bind(this);
        this.closeModalBill = this.closeModalBill.bind(this);
        this.toStart = this.toStart.bind(this);
	}
  openModalBill(){
    this.setState({ showModal: true });
  }
  closeModalBill(){
    this.setState({ showModal: false });
  }
  componentWillMount(){
    this.getDishCategories();
    this.setDeleteOrders();
  }

  getDishCategories(){
    fetch('http://54.37.125.180:8080/stock/get_all.',
    {   mode:'cors',
        method: 'GET',
    })
    .then(res=>{
      res.json().then(res=>{
        this.setState({data:res})
        console.log(res);
      })
    })

  }

  getDishByCategories(id){
    // console.log(id);
    fetch('http://54.37.125.180:8080/dish_category/get_dish_categories?stock_id='+id,
    {   mode:'cors',
        method: 'GET',
    })
    .then(res=>{
      res.json().then(res=>{
        localStorage.setItem("Dish_Categoty",JSON.stringify(res));
        this.props.history.push("/category_list");
      })
    })
  }

  tableNumber(e){
      this.setState({table_number: e.target.value})
      console.log(this.state);
      let bill =
      JSON.parse(localStorage.getItem("Bill"));
      bill.table_number = e.target.value;
      localStorage.setItem("Bill",JSON.stringify(bill));
  }
  numberOfPerson(e){
      this.setState({number_of_person: e.target.value})
      console.log(this.state);
      let bill =
      JSON.parse(localStorage.getItem("Bill"));
      bill.number_of_persons = e.target.value;
      localStorage.setItem("Bill",JSON.stringify(bill));
  }
  getThere(e){
      this.setState({sale_type : "TABLE"})
      console.log(this.state.sale_type);
      let bill =
      JSON.parse(localStorage.getItem("Bill"));
      bill.sale_type = "TABLE";
      localStorage.setItem("Bill",JSON.stringify(bill));
  }
  getTakeOut(e){
      this.setState({sale_type : "TAKE_OUT"})
      console.log(this.state.sale_type);
      let bill =
      JSON.parse(localStorage.getItem("Bill"));
      bill.sale_type = "TAKE_OUT";
      localStorage.setItem("Bill",JSON.stringify(bill));
  }
  getDelivery(e){
      this.setState({sale_type: "DELIVERY"})
      let bill =
      JSON.parse(localStorage.getItem("Bill"));
      bill.sale_type = "DELIVERY";
      localStorage.setItem("Bill",JSON.stringify(bill));
  }
  getPayType(e){
    this.setState({pay_type:e.target.value});
    let bill =
      JSON.parse(localStorage.getItem("Bill"));
      bill.pay_type = e.target.value;
      localStorage.setItem("Bill",JSON.stringify(bill));
  }
  goBack(){
    this.setState({showModal:true});
  }
  toStart(){
    localStorage.clear();
    this.setState({showModal:false});
    this.props.history.push('./start')
  }
  sendBill(){
    let bill = JSON.parse(localStorage.Bill);
    console.log(bill);
    fetch('http://54.37.125.180:8080/bill/open?employeeId=1',
    {   
      mode:'cors',
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':true
        },
        method: 'PUT',
        body:localStorage.Bill
    })
    .then(res=>{
      res.json().then(res=>{
        localStorage.setItem("Dish_Categoty",JSON.stringify(res));
        this.setState({showModalBillSend:true});
      })
    })
  }
  setDeleteOrders() {
    let order = JSON.parse(localStorage.getItem("Order"));
    this.setState({orders: order});
    
  }
  deleteItem(id){
    this.setDeleteOrders();
    
    this.state.orders.order_items.forEach((item,i)=>{
      if(item.id === id) {
        let arr = this.state.orders.order_items;
        let index = arr.indexOf(item);
        arr.splice(index, 1);
        this.setState({orders: arr});

        // console.log(this.state.orders.order_items)
        localStorage.setItem("Order",JSON.stringify(this.state.orders));

        let order = JSON.parse(localStorage.getItem("Bill"));
        console.log(order.order_items)
        if(this.state.orders.order_items.dish_id === order.order_items.dish_id) {
          // console.log(order.order_items);
          let arr = order.order_items;
          let index = arr.indexOf(order.order_items);
          arr.splice(index, 1);
          // console.log(order.order_items);
          localStorage.setItem("Bill",JSON.stringify(order));
        }
      }
    })

    this.setDeleteOrders();
  }

  renderModal() {
		return(
			<div className="modal">
				<h2 className="modal__title">Вы уверенны что хотите вернуться?</h2>
        <h4 className="modal__title">Данные этого счета будут утеряны</h4>
				<div className="modal__bt-wrap">
					<button className="modal__bt" onClick={()=>{this.setState({showModal:false})}}>Нет</button>	
					<button className="modal__bt" onClick={this.toStart}>Да</button>
				</div>
			</div>
		)
  }
  renderModalBill() {
		return(
			<div className="modal">
        <h4 className="modal__title">Отправлено</h4>
        <div className="modal__bt-wrap">
					<button className="modal__bt" onClick={this.toStart}>Подтвердить</button>	
				</div>
			</div>
		)
  }
  render(){
    // let bill = JSON.parse(localStorage.getItem("Order"))

    let info = this.state.orders.order_items ? this.state.orders.order_items.map((item,i) => {
                    return(
                    <tr key={i} className="tr-Bill">
                      <td>{i+1}</td>
                      <td>{item.dish_name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.description}</td>
                      <td onClick = {()=>{this.deleteItem(item.id) }} className="delete-Bill"id = {i}>Убрать </td>
                    </tr>
                    )
                }):'';
    let img = ['',img1,img2,'',img3];
    let categoryBt = this.state.data ? this.state.data.map((item, i)=>{
      return(
        <div className="col-Bill">
          <div className="stock_to_cat-Bill" onClick = {()=>{this.getDishByCategories(item.id) }}>
            <img src={img[item.id]}/>
            <BT BTname={item.name} id = {i} myStyle="" press = {()=>{this.getDishByCategories(item.id) }}/>
          </div>
        </div>
      )
    }):'';

    return(
      <div className="container-Bill">

          <div className="bill_create-Bill">
            <div className="navigation_bar-Bill">
              <BT myStyle="bt_back-Bill" BTname="Вернуться" press={this.goBack}/>
              <Title cssClass="Bill" text="Cчёт"/>
            </div>

            <div className="sale_type-Bill">
              
                <input type="radio" name="getType" id="TABLE" className="input-Bill" onClick={this.getThere} />
                <label for="TABLE" className="label-Bill">За стол</label>
                <input type="radio" name="getType" id="TAKE-OUT" className="input-Bill" onClick={this.getTakeOut}/>
                <label for="TAKE-OUT" className="label-Bill">На вынос</label>
                <input type="radio" name="getType" id="DELIVERY" className="input-Bill" onClick={this.getDelivery}/>
                <label for="DELIVERY" className="label-Bill">Доставка</label>
              
              <p> Форма оплаты:
                <select name="pay-type" value={this.state.pay_type} onChange={this.getPayType} className="pay_type-Bill">
                  <option value="CASH">Наличные</option>
                  <option value="CASHLESS">Безнал</option>
                </select>
              </p>
            </div>

          </div>

          <div className="order_info-Bill">
              <Input type="number" myStyleL="order_info_label-Bill"  nameL="Номер стола" updateValue={this.tableNumber}/>
              <Input type="number" myStyleL="order_info_label-Bill"  nameL="Количество гостей" updateValue={this.numberOfPerson}/>
          </div>

        <div className="category_container-Bill">
          {categoryBt}
        </div>

        <div className="bill_table-Bill">
          <table>
  					<thead>
  						<tr className="tr-Bill">
  							<td>№</td>
  							<td>Выбранные блюда</td>
  							<td>Количество</td>
  							<td>Цена</td>
  							<td>Примечание</td>
                <td>Удалить</td>
  						</tr>
  					</thead>
  					<tbody>
  					    {info}
  					</tbody>
  				</table>
        </div>
        <BT BTname="Отправить" press = {this.sendBill} myStyle="sendBT-Bill"/>
        <ReactModal
					isOpen={this.state.showModal}
					onRequestClose={this.closeModal}
					style={{
						overlay: {
						  position: 'fixed',
						  top: 0,
						  left: 0,
						  right: 0,
						  bottom: 0,
						  backgroundColor: 'rgba(255, 255, 255, 0.75)'
						},
						content: {
						  position: 'absolute',
						  top: '30%',
						  left: '30%',
						  right: '30%',
						  bottom: '30%',
						  border: '1px solid #ccc',
						  background: '#fff',
						  overflow: 'auto',
						  WebkitOverflowScrolling: 'touch',
						  borderRadius: '4px',
						  outline: 'none',
						  padding: '20px'
						}
					  }}
				>
					{this.renderModal()}
				</ReactModal>
        <ReactModal
					isOpen={this.state.showModalBillSend}
					onRequestClose={this.closeModal}
					style={{
						overlay: {
						  position: 'fixed',
						  top: 0,
						  left: 0,
						  right: 0,
						  bottom: 0,
						  backgroundColor: 'rgba(255, 255, 255, 0.75)'
						},
						content: {
						  position: 'absolute',
						  top: '30%',
						  left: '30%',
						  right: '30%',
						  bottom: '30%',
						  border: '1px solid #ccc',
						  background: '#fff',
						  overflow: 'auto',
						  WebkitOverflowScrolling: 'touch',
						  borderRadius: '4px',
						  outline: 'none',
						  padding: '20px'
						}
					  }}
				>
					{this.renderModalBill()}
				</ReactModal>
      </div>
    )
  }

}




export default Bill;

// made by ShvetsArtem
// update by Oleg Sokur
