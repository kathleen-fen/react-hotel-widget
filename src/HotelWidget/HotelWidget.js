import React from 'react'
import JSONP from 'jsonp'
import moment from 'moment'

import BookingItem from './BookingItem/BookingItem'
import Loader from './UI/Loader/Loader'
import DateRange from './UI/DateRange/DateRange'
import Input from './UI/Input/Input'

import './HotelWidget.scss'

class HotelWidget extends React.Component {

    state = {
      fromDate: moment(),
      toDate: moment().add(1, 'days'),
      adultsCount: 1,
      childrenCount: 0,
      bookingList: [],
      loading: false,
      error: null
    }

  inputChangeHandler(val, name){
    this.setState({ 
      ...this.state,
      [name]: val
     })
    }
    
  submitHandler(event){
    event.preventDefault()
  }

  onChangeRange(start,end) {
    this.setState({
      ...this.setState,
      fromDate: start,
      toDate: end
    })
  }

  getHotelInfo() {
    this.setState({
      ...this.state, loading: true
    })
    JSONP(`http://testapi.itur.pl/api.php?date_from=${this.state.fromDate.format().substring(0,10)}&date_to=${this.state.toDate.format().substring(0,10)}&nb_adults=${this.state.adultsCount}&nb_children=&${this.state.childrenCount}?callback`,function(err,res){
      if (res) {
        this.setState({
          ...this.state,
          loading: false,
          bookingList: [...res],
          error: null
        })  
      }
      if (err) {
        this.setState({
          ...this.state,
          bookingList: [],
          loading: false,
          error: "Access Denied"
        })  
      }
    
      
    }.bind(this))
  }

  closeList() {
    this.setState({
      ...this.state,
      bookingList: []
    })
  }

  render() {
    return(
      <div className="h-container">
        <div className="title">Please choose dates and guest information to see price</div>
        <form onSubmit={this.submitHandler}>
          <DateRange 
            fromDate={this.state.fromDate}
            toDate={this.state.toDate}
            onChangeRange={this.onChangeRange.bind(this)}
          />
          <Input 
            type='number'
            name='adultsCount'
            title='Adults'
            min={1}
            value={this.state.adultsCount}
            zeroPrevent={true}
            onChangeHandler={this.inputChangeHandler.bind(this)}
          />
          <Input 
            type='number'
            name='childrenCount'
            title='Children'
            min={0}
            value={this.state.childrenCount}
            zeroPrevent={false}
            onChangeHandler={this.inputChangeHandler.bind(this)}
          />
          <button className="btn" disabled={!this.state.fromDate || !this.state.toDate || this.state.adultsCount<=0 || this.state.childrenCount<0} onClick={() => {this.getHotelInfo()}}>Search</button>
        </form>

        {(this.state.bookingList.length > 0) ? (<div className="close" onClick={this.closeList.bind(this)}>Close</div>) : null}
        {!!this.state.error ? (<div className="error">{this.state.error}</div>): null}
        
        
        {this.state.loading ? (<Loader />) : this.state.bookingList.map((el,index) => {
          return(
            <BookingItem item={el} key={index}/>
          )
        })}
    </div>
    )
  }
}

export default HotelWidget
