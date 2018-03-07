import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import BT from '../Elements/Button/BT.js';
import BigCalendar from 'react-big-calendar';
import CalendarStyle from '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import Style from './Shifts.css'
import moment from 'moment';
import Title from '../Elements/Title/Title.jsx';
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class Shifts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }

        
    }
    
    print(){
        alert('Вы точно хотите распечатать эту страницу')
    }
    sendData(){

    }

    render() {
        const shifts = [
            {
                shiftNum: 1,
                startDate: '2018-03-05',
                endDate: '2018-03-05',
                title: 'Смена 1',
                employees: [
                    {
                        id: 1,
                        surname: 'Ivanov'
                    },
                    {
                        id: 2,
                        surname: 'Petrov'
                    },
                    {
                        id: 3,
                        surname: 'Sidorov'
                    },
                    {
                        id: 4,
                        surname: 'Gulyajpole'
                    }
                ]
            },
             {
                shiftNum: 2,
                startDate: '2018-03-06',
                endDate: '2018-03-06',
                title: 'Смена 2',
                employees: [
                    {
                        id: 5,
                        surname: 'Mamedov'
                    },
                    {
                        id: 6,
                        surname: 'Levochkin'
                    },
                    {
                        id: 7,
                        surname: 'DeRibas'
                    },
                    {
                        id: 8,
                        surname: 'Vovchenko'
                    }
                ]
            },
             {
                shiftNum: 3,
                startDate: '2018-03-07',
                endDate: '2018-03-07',
                title: 'Смена 3',
                employees: [
                    {
                        id: 9,
                        surname: 'Seledkin'
                    },
                    {
                        id: 10,
                        surname: 'Rediskin'
                    },
                    {
                        id: 11,
                        surname: 'Levchenko'
                    },
                    {
                        id: 12,
                        surname: 'Ilushkin'
                    }
                ]
            }
        ]

        let shiftsContainer = shifts
            ? shifts.map((item, i) => {
                return (
                    <div key={i} className='shift-Shifts'>

                        <div>Смена {item.shiftNum}</div>
                        {item.employees.map((employee, i) => {
                                return (
                                    <div className='employee-Shifts'>
                                        <span className='avatar-Shifts'></span>
                                        <span>{employee.surname}</span>
                                    </div>
                                )
                            })}
                    </div>
                )
            })
            : '';
                
        console.log(shiftsContainer);
        
        
        return (
        <div>
            <div className="nav_bar-Shift">
                <div className='nav-bar_menu'>
                    <BT BTname='Вернуться' myStyle='bt_back-nav-bar_menu' press={()=>{this.props.history.push('/start')}}/>
                    <Title cssClass="dishlist__title" text="Смены"/>
                    <BT BTname='Выйти' myStyle='bt_bill-nav-bar_menu' press={()=>{this.props.history.push('/')}}/>
                </div>
            </div>
            <div className='main-container-Shifts'>
                <BigCalendar
                events = {shifts}
                startAccessor = 'startDate'
                endAccessor = 'endDate' />
                <div className='shifts-container-Shifts'>
                    {shiftsContainer}
                </div>
                <div className='bt-container'>
                    <BT myStyle="bt-Shifts" BTname="Распечатать" press={this.print}/>
                    <BT myStyle="bt-Shifts" BTname="Отправить" press={this.sendData}/>
                </div>
            </div>
        </div>
            
        )
    }
}

export default Shifts;


//made by Artem Svets