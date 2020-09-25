import React from 'react'
import './BookingItem.scss'


function BookingItem(props) {
    const item = props.item
    return (
        <div className="item">
            <img src={item.image} alt="item" />
            <div className="item__descr">
                <div className="item__title">{item.name}</div>
                <div>{item.roomType}</div>
                <div>{item.bedroomsCount}</div>
                <div>{item.singleBedsCount}</div>
                <div>{item.doubleBedsCount}</div>
                <div>{item.totalPrice}</div>
            </div>
            
        </div>
    )
}

export default BookingItem