import React, { useState } from 'react';
import './DateRange.scss';
import { DatePicker, Space } from 'antd';
import moment from 'moment'

const { RangePicker } = DatePicker;

function DateRange() {

    const [fromDate, setFromDate] = useState(moment())
    const [toDate, setToDate] = useState(moment().add(1, 'days'))
    const disabledDate = current => {
        if(current<moment()) {
            return true
        }
        return false;
    };
    return (
        <div>
            <Space direction="vertical" size={12}>
                <RangePicker 
                    size="large"
                    allowEmpty={[true,true]}
                    defaultValue={[fromDate, toDate]}
                    disabledDate={disabledDate}
                    format="ll"
                    separator="&#8212;"
                    onChange={(start, end) => {
                        setFromDate(start)
                        setToDate(end)
                    }}
                 />
            </Space>
        </div>
    )

}

export default DateRange
