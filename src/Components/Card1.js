import React from 'react'
import img1 from '../images/c1.png'

const Card1 = ({img, price, info}) => {
  return (
    <div>
        <section className='c-prp'>
            <div className='c-prp-div'>
                <div className="img">
                    <img src={img} alt="" />
                </div>
                
                <span className='c-flex'>
                    <span>{price}</span>
                    <span>{info}</span>
                </span>
            </div>
        </section>
    </div>
  )
}

export default Card1