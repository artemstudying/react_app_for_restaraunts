import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import BT from '../Elements/Button/BT.js';
import Title from '../Elements/Title/Title.jsx';
import OpenedBillsStyle from './OpenedBills.css';

class OpenedBills extends Component {
	constructor(props) {
		super(props);
        this.state = {
			data: [],
			dataBill: [],
			number: null,
			// local: false,
			showModal: false,
			showModalBill: false,
		};
		
		this.getDATA = this.getDATA.bind(this);
		this.sendDATA = this.sendDATA.bind(this);
		this.getDataLook = this.getDataLook.bind(this);

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openModalBill = this.openModalBill.bind(this);
		this.closeModalBill = this.closeModalBill.bind(this);

		this.printBill = this.printBill.bind(this);
	}

	getDATA() {
        let _this = this;
        let request =
            fetch('http://54.37.125.180:8080/bill/all/opened', {
				mode:'cors',
				method: 'POST',
			})
            .then(function(res){
                res.json().then(function(data){
					// console.log(data);
					_this.setState({data:data})
            	})
			})
			.catch(function(res){ console.log(res) })
	}

	sendDATA(bill_number) {
		this.state.data.forEach((item,i) => {
			if(item.bill_number === bill_number) {

				let arr = this.state.data;
				let index = arr.indexOf(item);
				arr.splice(index, 1);
				this.setState({data: arr});

				let sendData = {
					bill_id: bill_number
				};

				let data = JSON.stringify(sendData)
				fetch("http://54.37.125.180:8080/bill/close?bill_id=" + sendData.bill_id, {
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					method: "POST",
					body: data
				})
				.then(function(res){ console.log(res) })
				.catch(function(res){ console.log(res) })
			}
		})
	}

	getDataLook(bill_number) {
		let _this = this;

		this.state.data.forEach((item,i) => {
			
			if(item.bill_number === bill_number) {
				let sendData = {
					bill_id: bill_number
				};
					
				fetch("http://54.37.125.180:8080/bill/preclose", {
					mode:'cors',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					method: "POST",
					body: "bill_id=" + sendData.bill_id + "&discount_id="
				})
				.then(res => {
					res.json().then(res => {
						// console.log(res);
						localStorage.setItem("Print_Bill", JSON.stringify(res));
						_this.setState({dataBill:res})
					})
				})
				.catch(function(res){ console.log(res) })
			}
		})
	}

    componentWillMount(){
		this.getDATA();
		this.getDataLook();
	}

	goBack() {
		console.log("go back");
	}

	goExit() {
		console.log("go exit");
	}

	openModal(bill_number) {
		this.setState({ showModal: true });
		this.setState({ number: bill_number });
	}

	closeModal(bill_number) {
		this.setState({ showModal: false });
	}

	openModalBill(bill_number) {
		// this.setState({ local: true });
		// console.log(bill_number + ' from openModalBill '+ this.state.local);
		this.setState({ showModalBill: true });
		this.getDataLook(bill_number);
	}

	closeModalBill() {
		this.setState({ showModalBill: false });
	}

	deleteBill(bill_number) {
		// console.log(bill_number + ' from deleteBill');
		this.sendDATA(bill_number);
		this.setState({ showModal: false });
	}
	
	printBill() {
		// this.setState({ local: false });
		localStorage.removeItem("Print_Bill");
		this.closeModalBill();
	}

	renderModal() {
		return(
			<div className="modal">
				<h3 className="modal__title">Закрыть счёт № {this.state.number} ?</h3>
				<div className="modal__bt-wrap">
					<button className="modal__bt" onClick={()=>{ this.closeModal() }}>Нет</button>	
					<button className="modal__bt" onClick={()=>{ this.deleteBill(this.state.number) }}>Да</button>
				</div>
			</div>
		)
	}

	renderModalBill() {
		// let local = this.state.local;
		let localBill = JSON.parse(localStorage.getItem("Print_Bill"));
		
		if(localBill) {

			// let localBill = JSON.parse(localStorage.getItem("Print_Bill"));
			// console.log(localBill);
	
			let orders = localBill.orders ? localBill.orders.map(function(item, i) {
				return(
					<tr key={i} className="print__tr">
						<td className="print__td">{i + 1}</td>
						<td className="print__td">
							{item.dish_name} - {item.quantity} шт. - {item.total_price} грн.
							<span>Примечание - {item.comments}</span>
						</td>
					</tr>
				)
			}) : '';
	
			return(
				<div className="modal">
					<div className="modal__bill-wrap">
						<h3 className="modal__title"> Счёт № {localBill.bill_number}</h3>
						<table className="print__table">
							<thead>
								<tr className="print__tr">
									<th className="print__th">№</th>
									<th className="print__th">Выбранные блюда кухни (бара)</th>
								</tr>
							</thead>
							<tbody>
								{orders}
							</tbody>
						</table>
					</div>
					<div className="modal__bt-wrap">
						<button className="modal__bt" onClick={()=>{ this.printBill() }}>Распечатать</button>	
						<button className="modal__bt" onClick={()=>{ this.closeModalBill() }}>Назад</button>
					</div>
				</div>
			)
		}
	}
	
	render() {
        let info = this.state.data ? this.state.data.map((item, i) => {
			return(
				<div key={i} className="col">
					<div className="bill__item">
						<ul className="bill__list">
							<li className="bill__li bill__li--number">Счет № <span>{item.bill_number}</span></li>
							<li className="bill__li">Время: <span>{item.open_bill_date.split(' ')[1]}</span></li>
							<li className="bill__li">Сумма: <span>{item.total_sum}</span></li>
						</ul>
						<div className="bill__buttons">
							<button className="bt__bill" onClick={()=>{ this.openModal(item.bill_number) }}>Закрыть</button>
							<button className="bt__close" onClick={()=>{ this.openModalBill(item.bill_number) }}>Просмотр</button>
						</div>
					</div>
				</div>
			)  
		}) : '';

		return(
			<div class="container-openedBills">
				<div className="openedBills__header">
					<BT BTname='Вернуться' myStyle="openedBills__bt" press={()=>{ this.props.history.push('/start')}}/>
					<Title cssClass="openedBills__title" text="Открытые счета"/>
					<BT BTname='Выход' myStyle="openedBills__bt" press={()=>{ this.props.history.push('/')}}/>
				</div>
				<div className='bills'>
					{info}
				</div>
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
					isOpen={this.state.showModalBill}
					onRequestClose={this.closeModalBill}
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
						  top: '20%',
						  left: '20%',
						  right: '20%',
						  bottom: '20%',
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

export default OpenedBills;

// made by Andrey Alekhin
// with helped by Oleg Sokur
// thank you, Oleg