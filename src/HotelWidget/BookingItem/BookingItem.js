import React from 'react'
import './BookingItem.scss'

function BookingItem(props) {
    const item = props.item
    return (
        <div className="item">
            <div className="img"><img src={item.image} alt="item" /></div>
            <div className="item__descr">
                <div className="item__title">{item.name}</div>
                <div>Typ pokoju: {item.roomType}</div>
                <div>Liczbę sypialni: {item.bedroomsCount}</div>
                <div>Liczbę łóżek pojedynczych: {item.singleBedsCount}</div>
                <div>Liczbę łóżek podwójnych: {item.doubleBedsCount}</div>
                <div className="item__price">{item.totalPrice} zł</div>
            </div>
            
        </div>
    )
}

export default BookingItem