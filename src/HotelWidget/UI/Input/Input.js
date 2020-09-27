import React from 'react'
import './Input.scss'

function Input(props) {
   const onKeyPress = event => {
        if (event.charCode===45 | event.charCode===101 | event.charCode===43 | event.charCode===46 | event.charCode===44) {
          event.preventDefault()
        }
    }

    const onChange = event => {
        let str = event.target.value.toString()
        if (str.length === 0 || (str[0]==='0' && str.length === 1)) {
            str = props.zeroPrevent ? '' : 0
        } else {
            if (str[0]==='0') {
                str = str.substring(1)
            }
        }
        event.target.value = str
        props.onChangeHandler(str, props.name)
    }

    const onBlur = event => {
        if (event.target.value === '') {
            event.target.value = 1
            onChange(event)
        }
    }
        
    return (
        <div className='wrapper'>
             <div className="input">
                <input type={props.type} min={props.min} name={props.name}  value={props.value} onKeyPress={onKeyPress} onBlur={onBlur} onChange={onChange}></input>
            </div>
            <div className="text">
                {props.title}
            </div>
        </div>
    )
}

export default Input