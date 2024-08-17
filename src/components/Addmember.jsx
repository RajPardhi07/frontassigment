import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Addmember = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        membername: '',
        role: '',
        dateofbirth: '',
        gender: '',
        nationality: '',
        contact: '',
        email: '',
        workEmail: '',
        teams: '',
        status: ''


    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });

    }


    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            setLoading(true);
            setError(false);

            const res = await fetch('https://backendassign-wcqv.onrender.com/api/member/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData

                }),
            });


            const data = await res.json();
            // console.log("data", data)
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            navigate('/');
        } catch (error) {
            setError(error.message)
            setLoading(false);
        }
    }


    return (
        <div className=" w-full h-full  z-50">

            <form onSubmit={handleSubmit}>
                <h1 className="text-3xl font-semibold ml-8 mt-2">Edit Profile</h1>

                <div className="flex mt-3 items-center flex-col">
                    <img className="w-24 h-24 object-cover rounded-full" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D" alt="" />


                    <div className="flex gap-10 mt-3">

                        <button className=" border bg-slate-100 font-semibold border-gray-300 rounded-md px-4 py-2 flex gap-2">
                            <i className="ri-restart-line"></i>
                            CHANGE PHOTO</button>

                        <button className=" border bg-slate-100 font-semibold border-gray-300 rounded-md px-4 py-2 flex gap-2">
                            <i className="ri-delete-bin-6-line"></i>

                            REMOVE PHOTO</button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-4 p-3">
                    <div className="flex flex-col">
                        <label htmlFor="">Name</label>
                        <input
                            className="border-2 outline-none h-12 rounded-md border-slate-300"
                            type="text"
                            id="membername"
                            onChange={handleChange}
                            value={formData.membername} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Email</label>
                        <input
                            className="border-2 outline-none h-12 rounded-md border-slate-300"
                            type="text"
                            id="email"
                            onChange={handleChange}
                            value={formData.email} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">ROle</label>
                        {/* <input className="border-2 h-12 rounded-md border-slate-300" type="text" /> */}
                        <select onChange={handleChange}
                            value={formData.role}
                            className="border-2 outline-none h-12 rounded-md border-slate-300"
                            name="cars" id="role">
                            <option id='Product Designer' value="Product Designer">Product Designer</option>
                            <option id='Product Manager' value="Product Manager">Product Manager</option>
                            <option id='Frontend Developer' value="Frontend Developer">Frontend Developer</option>
                            <option id='Backend Developer' value="Backend Developer">Backend Developer</option>
                        </select>

                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Status</label>
                        {/* <input
                            className="border-2 outline-none h-12 rounded-md border-slate-300"
                            type="text"
                            id="status"
                            onChange={handleChange}
                            value={formData.status} /> */}

                        <select onChange={handleChange} name="status" id="status"
                            value={formData.status}
                            className="border-2 outline-none h-12 rounded-md border-slate-300">
                            <option id='Active' value="Active">Active</option>
                            <option id='Inactive' value="Inactive">Inactive</option>
                        </select>

                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Data of Birth</label>
                        <input className="border-2 outline-none h-12 rounded-md border-slate-300"
                            type="date" id="dateofbirth" onChange={handleChange}
                            value={formData.dateofbirth} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Gender</label>
                        <input className="border-2 outline-none h-12 rounded-md border-slate-300"
                            type="text" id="gender" onChange={handleChange}
                            value={formData.gender} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Nationality</label>
                        <input className="border-2 outline-none h-12 rounded-md border-slate-300"
                            type="text" id="nationality" onChange={handleChange}
                            value={formData.nationality} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Contact</label>
                        <input className="border-2 outline-none h-12 rounded-md border-slate-300"
                            type="text" id="contact" onChange={handleChange}
                            value={formData.contact} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Work Email</label>
                        <input className="border-2 outline-none h-12 rounded-md border-slate-300"
                            type="text" id="workEmail" onChange={handleChange}
                            value={formData.workEmail} />
                    </div>
                    <div className="flex -mt-3 flex-col ">
                        <label htmlFor="">Teams</label>
                        <input id="teams" className="border-2 outline-none h-12 w-[58vw]
                     rounded-md border-slate-300" type="text"
                            onChange={handleChange}
                            value={formData.teams} />

                    </div>
                </div>

                <button type="submit" className=" text-white bg-[#6941C6] ml-3 text h-12 w-[58vw] rounded-md border-slate-300">Submit</button>

            </form>
        </div>
    )
}

export default Addmember