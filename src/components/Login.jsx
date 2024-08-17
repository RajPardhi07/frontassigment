import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/user/userSlice";


const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(false)
        dispatch(loginUser(formData))
        setLoading(false)
        navigate('/')

    };


    return (
        <div className='w-full h-screen bg-black flex items-center justify-center' >


            <form onSubmit={handleSubmit} className='formregister w-[29vw] bg-white rounded-lg py-2 flex flex-col items-center justify-around h-[73vh]'>
                <h3 className='text-2xl'>Login</h3>


                <input className='w-[25vw] h-[7vh] pl-3 rounded-full border'

                    onChange={handleChange}
                    type="text" id='email' name="email" placeholder="Email Id" />
                <input className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                    onChange={handleChange}
                    type="password" id='password' name="password" placeholder="Password" />

                <input className='w-[25vw] h-[7vh] text-white font-semibold bg-black rounded-full border' type="submit" id="submit" />

                <Link to={'/register'}>
                    <button className='w-[22vw] h-[7vh] pl-3 rounded-full border text-white font-semibold bg-black'>Register</button>
                </Link>


            </form>

        </div>
    )
}

export default Login