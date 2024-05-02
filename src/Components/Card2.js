import React from 'react'
import img1 from '../images/c1.png'


const Card2 = ({img, numb, info}) => {
  return (
    <div>
        <section className='c-prp'>
            <div className='c-prp-div'>
                <div className="img">
                    <img src={img} alt="" />
                </div>
                
                <h6>{numb}</h6>
                <p>{info}</p>
            </div>
        </section>
    </div>
  )
}

export default Card2