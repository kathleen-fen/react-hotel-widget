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
      loading: false
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
    console.log(this.state)
  }

  getHotelInfo() {
    this.setState({
      ...this.state, loading: true
    })
    
    console.log(`http://testapi.itur.pl/api.php?date_from=${this.state.fromDate.format().substring(0,10)}&date_to=${this.state.toDate.format().substring(0,10)}&nb_adults=${this.state.adultsCount}&nb_children=&${this.state.childrenCount}?callback`)
    JSONP(`http://testapi.itur.pl/api.php?date_from=${this.state.fromDate.format().substring(0,10)}&date_to=${this.state.toDate.format().substring(0,10)}&nb_adults=${this.state.adultsCount}&nb_children=&${this.state.childrenCount}?callback`,function(err,res){
      this.setState({
        ...this.state,
        loading: false,
        bookingList: [...res]
      })  
      console.log(this.state)
    }.bind(this))
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
        
        {this.state.loading ? (<Loader />) : this.state.bookingList.map((el,index) => {
          return(
            <BookingItem item={el} key={index}/>
          )
        })}
    </div>
    )
    
  }
  
}




/* function HotelWidget() {
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [adultsCount, setAdultsCount] = useState(1)
  const [childrenCount, setChildrenCount] = useState(0)
  const [bookingList, setBookingList] = useState([])
  const [loading, setLoading] = useState(false)
  const [rangeChoose, setRangeChoose] = useState(false)

  const adultsChangeHandler = target => {
    console.log(target)
    setAdultsCount(target.value)
  }

  

  const listItems = loading ? (<Loader />) : bookingList.map((el, index) => (<BookingItem item={el} key={index}/>))

  const childrenChangeHandler = target => {
    console.log(target)
    setChildrenCount(target.value)
    
  }

  

  const submitHandler = event => {
    event.preventDefault()
  }
  const getHotelInfo = () => {
  setLoading(true)  
  JSONP(`http://testapi.itur.pl/api.php?date_from=${fromDate}&date_to=${toDate}&nb_adults=${adultsCount}&nb_children=&${childrenCount}?callback`,function(err,res){
  setBookingList(res) 
  setLoading(false)
  console.log("state", bookingList)
  console.log("res:",res)
  console.log("err:", err)
  })}

  
  
  
  return (
    <div className="h-container">
      <form onSubmit={submitHandler}>
        <DateRange />
        
        <input type="number" name="adultsCount" value={adultsCount} onChange={event => {adultsChangeHandler(event.target)}}></input>
        <input type="number" name="childrenCount" value={childrenCount} onChange={event => {childrenChangeHandler(event.target)}}></input>

        <button onClick={getHotelInfo}>Get</button>
      </form>
      
      {listItems}
    </div>
  )} */


export default HotelWidget
