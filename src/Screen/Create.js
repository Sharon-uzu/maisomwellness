import React from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import circle from '../images/Ellipse 240.png'

const Create = () => {
  return (
    <div className='sign-form'>

        <div className="sign">
            <div className="sign-l">
                <img src={circle} alt="" />
            </div>

            <div className="sign-r">
                <img src={circle} alt="" />
                <h2>Create an account</h2>
                <p>We are excited to have you onboard</p>

                <div>
                    <p>Full Name</p>
                    <input type="email"  placeholder='John Doe' className='inp'/>
                </div>

                <div>
                    <p>Email</p>
                    <input type="email"  placeholder='Enter your email' className='inp'/>
                </div>

                <div>
                    <p>Password</p>
                    <input type="password"  className='inp'/>
                </div>

                <div>
                    <p>Confirm Password</p>
                    <input type="password"  className='inp'/>
                    <h6 className='ins'>Must be atleast 8 characters</h6>
                </div>

                <div>
                    <button>Sign Up</button>
                </div>

                <a href="#" className='google'>
                    <FcGoogle className='sign-i'/>
                    <span>Sign in with Google</span>
                </a>

                <span className='acct'>
                Already have an account?
                <Link to='/'>Login.</Link>
                </span>
            </div>
        </div>
        
    </div>
  )
}

export default Create