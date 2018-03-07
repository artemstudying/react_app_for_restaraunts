import React , { Component } from 'react';
import Style from './Report.css';
import Title from '../Elements/Title/Title.jsx';
import BT from '../Elements/Button/BT.js';



const dataForReport = [
  {
    date: '2018-03-06',
    pay_type: 'Наличные',
    summ: 580
  }, {
    date: '2018-03-06',
    pay_type: 'Наличные',
    summ: 1200
  }, {
    date: '2018-03-06',
    pay_type: 'Наличные',
    summ: 300
  }, {
    date: '2018-03-05',
    pay_type: 'Наличные',
    summ: 1500
  }, {
    date: '2018-03-05',
    pay_type: 'Безналичные',
    summ: 3000
  }
]
const billInfo = {
  maxbill: 1200,
  minbill: 300,
  middlebill: 693,
  payType: 'Наличные',
  tables: 3,
  guests: 14
}

class Report extends Component {
  constructor(props) {
    super(props);
    this.state={
      fromDate:"2018-03-06",
      toDate:"2018-01-01",
      pay_type:props.pay_type,
      bt_pay_type :'',
      numberOfTables:false,
      numberOfVisitors:false,
      summaryNumberOfTables:'',
      summaryNumberOfVisitors:'',
      averageAmount:'',
      maxBill:'',
      minBill:'',
      data:[],
      billInfoData:{}
    }
    this.getFromDate = this.getFromDate.bind(this);
    this.getToDate = this.getToDate.bind(this); 
    this.setCurrentDateForm = this.setCurrentDateForm.bind(this);
    this.setCurrentDateTo = this.setCurrentDateTo.bind(this);
    this.numberOfVisitors = this.numberOfVisitors.bind(this);
    this.numberOfTables = this.numberOfTables.bind(this);
    this.setCash = this.setCash.bind(this);
    this.setCashless = this.setCashless.bind(this);
    this.setCombine = this.setCombine.bind(this);
    this.getReport = this.getReport.bind(this);

  }
  setCombine(e){
    this.setState({pay_type:"COMBINE"});
    this.setState({bt_pay_type: "Любой"});
  }
  setCash(e){
    this.setState({pay_type:'CASH'});
    this.setState({bt_pay_type: "Наличный"});
  }
  setCashless(e){
    this.setState({pay_type:'CASHLESS'});
    this.setState({bt_pay_type: "Безналичный"});
  }
  numberOfTables(e){
    if(this.state.numberOfTables == true){
      this.setState({numberOfTables:false});
    }else if(this.state.numberOfTables == false){
      this.setState({numberOfTables:true});
    }
    console.log(this.state.numberOfTables);
  }
  numberOfVisitors(e){
    if(this.state.numberOfVisitors == true){
      this.setState({numberOfVisitors:false});
    }else if(this.state.numberOfVisitors == false){
      this.setState({numberOfVisitors:true});
    }
    console.log(this.state.numberOfVisitors);
  }
  getFromDate(e){
    this.setState({fromDate:e.target.value});
    console.log(this.state.fromDate);
  }
  getToDate(e){
    this.setState({toDate:e.target.value});
    console.log(e.target.value);
  }
  setCurrentDateForm(e){
    let d = new Date();
    let curr_date = (d.getDate())<10?"0"+(d.getDate()):(d.getDate());
    let curr_month = (d.getMonth() + 1) < 10?"0"+(d.getMonth() + 1):(d.getMonth() + 1);
    let curr_year = d.getFullYear();
    console.log(d);
    console.log(curr_date + "." + curr_month + "." + curr_year);
    this.setState({fromDate:curr_year+ "-" +  curr_month + "-" + curr_date});

  }
  setCurrentDateTo(e){
    let d = new Date();
    let curr_date = (d.getDate())<10?"0"+(d.getDate()):(d.getDate());
    let curr_month = (d.getMonth() + 1) < 10?"0"+(d.getMonth() + 1):(d.getMonth() + 1);
    let curr_year = d.getFullYear();
    this.setState({toDate:curr_year+ "-" + curr_month + "-" + curr_date});

  }
  getReport(e){
    let infoForReport = [];
    dataForReport.map((item, i)=>{
      if(item.date === this.state.fromDate){
        infoForReport.push(item)
      }
    })
    this.setState({data: infoForReport})
    this.setState({billInfoData: billInfo})
    console.log(this.state.billInfoData);
  }
  render(){
    
    
    let reportTableInfo = this.state.data? this.state.data.map((item, i)=>{
                                        return(
                                            <tr key={i}>
                                                <td>{item.date}</td>
                                                <td>{item.pay_type} </td>
                                                <td>{item.summ}</td>
                                            </tr>
                                        )
                                      }):'';
    return(
      <div>
        <div className="menu_navbar-Report">
          <div className='nav-bar_menu'>
            <BT BTname='Вернуться' myStyle='bt_back-nav-bar_menu' press={()=>{this.props.history.push('/start')}}/>
            <Title cssClass="dishlist__title" text="Отчет"/>
            <BT BTname='Выйти' myStyle='bt_bill-nav-bar_menu' press={()=>{this.props.history.push('/')}}/>
          </div>
        </div>
        <div className="container-Report">
          <div className="date_Report">
                <div className="h4_data_pay_Report">ДАТА</div>
                <div className="checkbox_data_Report">
                    <div className="h5_data_Report">с</div>
                    <div className="date_from-Report">
                      <input type="date" name="calendar"  max="2090/01/01" min="1900/01/01" onChange={this.getFromDate} value={this.state.fromDate}/>
                      <div className="datetime_Report">
                        <input type="checkbox" id="checkbox_Report_date1"/>
                        <label for="checkbox_Report_date1" onClick={this.setCurrentDateForm}>Текущая дата</label>
                      </div>	            	
                    </div>
                </div>
                <div className="checkbox_data_Report">
                    <h5 className="h5_data_Report">по</h5>
                    <div className="date_from-Report">
                      <input type="date" name="calendar"  max="2090/01/01" min="1900/01/01" onChange={this.getToDate} value={this.state.toDate}/>
                      <div className="datetime_Report">
                        <input type="checkbox" id="checkbox_Report_date2" />
                        <label for="checkbox_Report_date2" onClick={this.setCurrentDateTo}>Текущая дата</label>	
                      </div> 	            	
                    </div>
                </div>
                <div className="input-group-guest-Report"> 
                    <input type="checkbox" id="label_Report1" className="native_lable-Report" onChange={this.numberOfVisitors}/>
                    <label for="label_Report1">Гостей</label>
                    <input type="checkbox" id="label_Report2" className="native_lable-Report" onChange={this.numberOfTables}/>
                    <label for="label_Report2">Столов</label>
                </div>	
          </div>
          <div className="pay-type-Report">
            <h4 className="h4_data_pay_Report">СПОСОБ ОПЛАТЫ</h4>
            <div className="checkbox__main_pay_Report">
                  <input type="radio" id="checkbox_Report_pay1" name="payType" className="checkbox_Report_pay"onChange={this.setCash}/>
                  <label for="checkbox_Report_pay1">Наличный</label>
                  <input type="radio" id="checkbox_Report_pay2" name="payType" className="checkbox_Report_pay"onChange={this.setCashless}/>
                  <label for="checkbox_Report_pay2">Безналичный</label>
                  <input type="radio" id="checkbox_Report_pay3" name="payType" className="checkbox_Report_pay"onChange={this.setCombine}/>
                  <label for="checkbox_Report_pay3">Любой</label>	
                </div>
          </div>
          <div onClick={this.getReport} className="bt_Report-Report">Сформировать отчет</div>
          <div className="period_Report">
            <h5 className="h5_pay_period_Report">ПЕРИОД:</h5>
            <div className="period_datetime_Report">
            <div>{this.state.fromDate == this.state.toDate ? this.state.fromDate:this.state.fromDate+" - " + this.state.toDate }</div>
            </div>
          </div>

          <div className="middle_block_Report">
            <table>
              <tbody>
                <tr>
                  <td className="td_table_Report">Способ оплаты:</td>
                  <td>{this.state.billInfoData.payType}</td>
                </tr>
                <tr>
                  <td className="td_table_Report">Столов:</td>
                  <td>{this.state.billInfoData.tables}</td>
                </tr>
                <tr>
                  <td className="td_table_Report">Гостей:</td>
                  <td>{this.state.billInfoData.guests}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td className="td_table_Report">Максимальный чек:</td>
                  <td>{this.state.billInfoData.maxbill}</td>
                </tr>
                <tr>
                  <td className="td_table_Report">Минимальный чек:</td>
                  <td>{this.state.billInfoData.minbill}</td>
                </tr>
                <tr>
                  <td className="td_table_Report">Средний чек:</td>
                  <td>{this.state.billInfoData.middlebill}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="result-table-Report">
            <table className="result-table-main-Report">
              <thead>
                <tr className="border_Report">
                  <td className="td_Report">Дата</td>
                  <td className="td_Report">Тип оплаты</td>
                  <td className="td_Report">Сумма</td>
                </tr>
              </thead>
              <tbody className='report-unic-table-Report'>
                {reportTableInfo}
              </tbody>
            </table>
          </div>	
        </div>
      </div>
    )
  }
}


export default Report;
// made by OlegSokur