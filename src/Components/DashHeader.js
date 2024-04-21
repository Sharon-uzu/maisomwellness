import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa6";
import dp from '../images/dp.avif'


const DashHeader = ({User}) => {
  return (
    <div className='dash-h'>
      <div className='dh'>
        <div className="dh-l">
          <b>{User && User.name}</b>
          {/* <IoSearchOutline className='dh-i'/>
                  <input type="search" name="" id="" placeholder='search here'/> */}
        </div>

        <div className="dh-r">
          <div>
            <FaRegBell className='dh-r-i' />
          </div>

          <div>
            <FaRegMoon className='dh-r-i' />
          </div>

          {/* <img src={dp} alt="dp" /> */}
        </div>

      </div>

    </div>
  )
}

export default DashHeader