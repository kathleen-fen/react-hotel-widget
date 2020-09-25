import React from 'react'
import './Loader.scss'

function Loader() {
    return (
        <div className="loader">
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader