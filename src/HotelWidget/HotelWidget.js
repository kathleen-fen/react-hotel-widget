import React, { useState } from 'react'
import JSONP from 'jsonp'
import { DateRange } from 'react-date-range'

import BookingItem from './BookingItem/BookingItem'
import Loader from './UI/Loader/Loader'

import './HotelWidget.scss'





function HotelWidget() {
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

  const getRange = () => {
    console.log(fromDate.toUTCString().substring(0,11))
    return `${fromDate.toUTCString().substring(0,11)}  -  ${toDate.toUTCString().substring(0,11)}`
  }

  const listItems = loading ? (<Loader />) : bookingList.map((el, index) => (<BookingItem item={el} key={index}/>))

  const childrenChangeHandler = target => {
    console.log(target)
    setChildrenCount(target.value)
    
  }

  const handleSelect = (ranges) => {
    setFromDate(ranges.selection.startDate)
    setToDate(ranges.selection.endDate) 
    console.log(ranges)
    setRangeChoose(false)
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

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }
  const calendar = rangeChoose ? (<DateRange
                        className="range-wrapper"
                        months={2}
                        minDate={new Date()}
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                        showMonthAndYearPickers={false}
                      />) : null
  
  return (
    <div className="h-container">
      <form onSubmit={submitHandler}>
      
        <div onClick={() => setRangeChoose(!rangeChoose)} className="range">
          <img src="calendar-alt-regular.svg" alt="calendar" />
          <div className="range__text">{getRange()}</div>
          {calendar}
        </div>
        <input type="number" name="adultsCount" value={adultsCount} onChange={event => {adultsChangeHandler(event.target)}}></input>
        <input type="number" name="childrenCount" value={childrenCount} onChange={event => {childrenChangeHandler(event.target)}}></input>

        <button onClick={getHotelInfo}>Get</button>
      </form>
      
      {listItems}
    </div>
  )}


export default HotelWidget
