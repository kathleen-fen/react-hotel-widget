import React from 'react'

function Input(props) {
   const onKeyPress = event => {
        if (event.charCode===45 | event.charCode===101 | event.charCode===43 | event.charCode===46 | event.charCode===44) {
          event.preventDefault()
        }
    }

    const onChange = event => {
        let str = event.target.value.toString()
        if (str.length === 0 || (str[0]==='0' && str.length === 1)) {
            str = props.zeroPrevent ? '1' : 0
        } else {
            if (str[0]==='0') {
                str = str.substring(1)
            }
        }
        event.target.value = str
        props.onChangeHandler(str)
    }
        
    return (
        <input type={props.type} min={props.min} name={props.name}  value={props.value} onKeyPress={onKeyPress} onChange={onChange}></input>
    )
}

export default Input