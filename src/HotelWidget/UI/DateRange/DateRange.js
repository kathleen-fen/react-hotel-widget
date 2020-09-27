import React from 'react';
import './DateRange.scss';
import { DatePicker, Space } from 'antd';
import moment from 'moment'

const { RangePicker } = DatePicker;

function DateRange(props) {

  /*   const [fromDate, setFromDate] = useState(moment())
    const [toDate, setToDate] = useState(moment().add(1, 'days')) */
    const disabledDate = current => {
        if(current<moment()) {
            return true
        }
        return false;
    };
  //  console.log(props)
    return (
        <div className="dataRange">
            <Space direction="vertical" size={12}>
                <RangePicker 
                    size="large"
                    allowEmpty={[false,false]}
                  //  defaultValue={[props.fromDate, props.toDate]}
                    value={[props.fromDate, props.toDate]}
                    disabledDate={disabledDate}
                    format="ll"
                    separator="&#8212;"
                    onChange={(start, end) => {
                        /* setFromDate(start)
                        setToDate(end) */
                        if (start) {
                            props.onChangeRange(start[0], start[1])
                        } else {
                            props.onChangeRange(null, null)
                        }
                        
                    
                        
                    }}
                 />
            </Space>
        </div>
    )

}

export default DateRange
