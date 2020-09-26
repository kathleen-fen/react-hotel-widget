import React from 'react'
import JSONP from 'jsonp'
import moment from 'moment'

import BookingItem from './BookingItem/BookingItem'
import Loader from './UI/Loader/Loader'
import DateRange from './UI/DateRange/DateRange'

import './HotelWidget.scss'


class HotelWidget extends React.Component {
      state = {
          fromDate: moment(),
          toDate: moment(),
          adultsCount: 1,
          childrenCount: 0,
          bookingList: [],
          loading: false
      }

  listItems = this.state.loading ? (<Loader />) : this.state.bookingList.map((el, index) => (<BookingItem item={el} key={index}/>))

  adultsChangeHandler(target){
    let adultsCount = target.value
    this.setState({ 
      ...this.state,
      adultsCount
     })
    }
    
  childrenChangeHandler(target) {
    let childrenCount = target.value
    this.setState({ 
      ...this.state,
      childrenCount
    })   
  }  

  submitHandler(event){
    event.preventDefault()
  }

  getHotelInfo() {
    this.setState({
      ...this.state, loading: true
    })
    
    
    JSONP(`http://testapi.itur.pl/api.php?date_from=${this.state.fromDate}&date_to=${this.state.toDate}&nb_adults=${this.state.adultsCount}&nb_children=&${this.state.childrenCount}?callback`,function(err,res){
      this.setState({
        ...this.state,
        loading: false,
        bookingList: [...res]
      })  
    }.bind(this))
    
    
}

  render() {
    return(
      <div className="h-container">
      <form onSubmit={this.submitHandler}>
        <DateRange />
        
        <input type="number" name="adultsCount" value={this.state.adultsCount} onChange={event => {this.adultsChangeHandler(event.target)}}></input>
        <input type="number" name="childrenCount" value={this.state.childrenCount} onChange={event => {this.childrenChangeHandler(event.target)}}></input>

        <button onClick={() => {this.getHotelInfo()}}>Get</button>
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
