import React from 'react'

const PayCard = ({info, price, btn, color, bg}) => {
  return (
    <div>
        <div className="p-card">
            <div className="p-card-c">
                <h6>{info}</h6>
                <h4>{price}</h4>
                <button style={{color:color, backgroundColor:bg}}>{btn}</button>
            </div>
        </div>
    </div>
  )
}

export default PayCard