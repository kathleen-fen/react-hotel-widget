import React, { useState } from 'react';
import JSONP from 'jsonp';
import BookingItem from './BookingItem/BookingItem'
import Loader from './UI/Loader/Loader'

import './HotelWidget.scss';





function HotelWidget() {
  const [fromDate, setFromDate] = useState(new Date().toISOString().substring(0, 10))
  const [toDate, setToDate] = useState(new Date().toISOString().substring(0, 10))
  const [adultsCount, setAdultsCount] = useState(1)
  const [childrenCount, setChildrenCount] = useState(0)
  const [bookingList, setBookingList] = useState([])
  const [loading, setLoading] = useState(false)

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
        <input type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)}></input>
        <input type="date" value={toDate} onChange={(event) => setToDate(event.target.value)}></input>
        <input type="number" name="adultsCount" value={adultsCount} onChange={event => {adultsChangeHandler(event.target)}}></input>
        <input type="number" name="childrenCount" value={childrenCount} onChange={event => {childrenChangeHandler(event.target)}}></input>

        <button onClick={getHotelInfo}>Get</button>
      </form>
      {listItems}
    </div>
  );
}

export default HotelWidget;
