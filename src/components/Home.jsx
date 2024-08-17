
import { useSelector } from "react-redux"

const Home = () => {

    const user = useSelector((state) => state?.user?.user?.user)

   



    
    return (
        <div
            className="w-full h-[89vh] flex ">
            <div className="w-[25%] h-full ">

            </div>
            <div className="w-[75%] h-full flex items-center justify-center">

                <div className="w-[96%] p-5 border-2 rounded-lg h-[94%]">

                    <h1 className="text-black text-5xl font-bold">Welcome, {user?.name}!</h1>

                </div>

            </div>

        </div>
    )
}

export default Home