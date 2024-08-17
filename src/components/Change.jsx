import { Link } from "react-router-dom"

const Change = () => {


    return (
        <div className="fixed top-[13%] w-[23vw] flex flex-col justify-between text-black text-2xl p-5 h-[80vh] ">
            <div>

                <div >

                    <Link className="flex gap-3" to='/'>
                        <i className="ri-layout-grid-fill" />
                        <p className="font-semibold"> Overview</p>
                    </Link>
                </div>
                <div>

                    <Link className="flex gap-3 mt-4" to='/table'>
                        <i className="ri-layout-grid-fill" />
                        <p className="font-semibold">People Directory</p>

                    </Link>
                </div>
            </div>

            <div>


                <div>
                    <Link className="flex gap-3 mt-4" to='/login'>
                        <i className="ri-layout-grid-fill" />
                        <p className="font-semibold">Login</p>

                    </Link>
                </div>
                <div>
                    <Link className="flex gap-3 mt-4" to='/register'>
                        <i className="ri-layout-grid-fill" />
                        <p className="font-semibold">Register</p>

                    </Link>
                </div>
            </div>


        </div>
    )
}

export default Change