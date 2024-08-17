import { Link, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import axios from 'axios'
import { useState } from "react";



const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://backendassign-wcqv.onrender.com/api/auth/register',
                {
                    name,
                    email,
                    password,

                })
            if (res && res.data.success) {
                toast.success("Register Successfully please login")
                navigate('/login')
            } else {
                toast.error(res.data.message)

            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong");
        }
    }
    return (
        <div className='w-full h-screen bg-black flex items-center justify-center' >


            <form onSubmit={handleSubmit} className='formregister w-[29vw] bg-white rounded-lg py-2 flex flex-col items-center justify-around h-[73vh]'>
                <h3 className='text-2xl'>Register</h3>
                <input className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                    onChange={(e) => setName(e.target.value)}
                    type="text" id='name' name="name" placeholder="name" />

                <input className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                    onChange={(e) => setEmail(e.target.value)}
                    type="text" id='email' name="email" placeholder="Email Id" />
                <input className='w-[25vw] h-[7vh] pl-3 rounded-full border'
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" id='password' name="password" placeholder="Password" />

                <input className='w-[25vw] h-[7vh] text-white font-semibold bg-black rounded-full border' type="submit" id="submit" />

                <Link to={'/login'}>
                    <button className='w-[22vw] h-[7vh] pl-3 rounded-full border text-white font-semibold bg-black'>Login</button>
                </Link>


            </form>
        </div>
    )
}

export default Register