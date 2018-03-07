import React , {Component} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import CalStyle from './Cal.css';


class Cal extends Component{
    constructor(props){
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            selectedDay: undefined,
        };
    }
    handleDayChange(day) {
        this.setState({ selectedDay: day });
      }
      render() {
        const { selectedDay } = this.state;
        return (
          <div>
            <DayPickerInput onDayChange={this.handleDayChange} class={CalStyle} />
          </div>
        );
      }
}

export default Cal;