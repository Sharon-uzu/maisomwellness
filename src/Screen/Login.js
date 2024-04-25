import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import circle from '../images/logo.jpeg'
import { LoadingButton } from '@mui/lab';
import { LoginModel } from '../service/supabase-service';
import { ToastContainer } from 'react-toastify';
import { Notify } from '../utils';
import { connect } from 'react-redux';
import { User } from '../redux/state/action';

const Login = ({
    disp_user,
    appState
}) => {
    const User = appState.User;
    const [loading, setLoading] = React.useState(false);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");



    React.useEffect(() => {

    }, []);


    const Login = () => {
        setLoading(true)
        if (email && email.length > 4 && password) {
            LoginModel({ email, password })
                .then(response => {
                    if (response.error) {
                        Notify(response.error.message, "error")
                        setLoading(false)
                    } else {
                        // if (response.data.user.user_metadata.type == "Payteller") {
                        //     setLoading(false)
                        //     return alert("You do not have access to this platform yet. Platform only open to product and service rep.")
                        // }
                        // console.log(response)

                        disp_user({
                            ...response.data.session,
                            ...response.data.user.user_metadata
                        })
                        if (response.data.user.user_metadata.type == "Admin") {
                            navigate("/admin-dashboard")
                        }else{
                            navigate("/dashboard")
                        }
                        // console.log(response.data.user.user_metadata)

                        setLoading(false)
                    }
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false)
                })
        }
    }




    const navigate = useNavigate();

    const login = () => {
        navigate('/dashboard')
    }


    return (
        <div className='sign-form'>
            <ToastContainer />
            <div className="sign">
                <div className="sign-l">
                    <img src={circle} alt="" />
                </div>

                <div className="sign-r">
                    <img src={circle} alt="" />
                    <h2>Login to your account</h2>
                    <p>Welcome back! Please enter your details.</p>

                    {/* <div>
                <p>Department</p>
                   <select name="" id="">
                    <option value="select department"></option>
                    <option value="product">Product</option>
                    <option value="service">Service</option>
                   </select>
                </div> */}


                    <div>
                        <p>Email</p>
                        <input type="email"
                            placeholder='Enter your email'
                            className='inp'
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                            style={{ paddingLeft: 10 }}
                        />
                    </div>

                    <div>
                        <p>Password</p>
                        <input
                            type="password"
                            className='inp'
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                            style={{ paddingLeft: 10 }}
                        />
                        {/* <h6>Forgot password?</h6> */}
                    </div>

                    <div>
                        <input type="checkbox" name="" id="" />
                        <span>Remember for 30 days</span>
                    </div>


                    <LoadingButton loading={loading} variant="contained"
                        loadingPosition="start"
                        load
                        size='small'
                        style={{
                            cursor: 'pointer',
                            backgroundColor: "#252C58",
                            height: 45,
                            width: "100%",
                            marginTop: 10,
                            marginBottom: 30,
                            color: "#fff",
                            fontSize: 13,
                            padding: 10,
                            borderRadius: 8,
                            border: "none",
                        }}
                        onClick={() => {
                            Login()
                        }}
                    >Login</LoadingButton>

                    {/* <a href="" className='google'>
                        <FcGoogle className='sign-i' />
                        <span>Login with Google</span>
                    </a>

                    <span className='acct'>
                        Don’t have an account?
                        <Link to='/create'>Create account.</Link>
                    </span> */}
                </div>
            </div>

        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        appState: state.user,
    };
};


const mapDispatchToProps = (dispatch, encoded) => {
    return {
        disp_user: (payload) => dispatch(User(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);

