import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const Navbar = () => {
    const user = useSelector((state) => state.user)

    return (
        <div className="text-black px-6 w-full border-2 h-20  flex items-center justify-between">

            <Link to='/'>
            
            <h1 className="text-5xl font-bold text-[#6941C6]">PEOPLE.CO</h1>
            </Link>


            <div className="flex gap-5 text-[3.7vh] items-center">
            
                <i className="ri-notification-line"></i>
            


            
                <img className="w-16 h-16 rounded-full object-cover object-top" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            

                <p className="">{user?.user?.user?.name}</p>

            </div>

            


        </div>
    )
}

export default Navbar