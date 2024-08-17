import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const { profileId } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://backendassign-wcqv.onrender.com/api/member/get-member/${profileId}`);
                console.log("response", response.data.getSingleMember);
                setUserData(response?.data?.getSingleMember);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [profileId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const moveToTable = () => {
        navigate('/table')
    }

    const formatDateOfBirth = (dobString) => {
        const date = new Date(dobString);
        const day = date.getDate().toString().padStart(2, '0'); // Ensures two digits
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    return (
        <div >
            <div className="absolute top-24 border-2 right-14 overflow-hidden w-[48vw] rounded-md h-[84vh] ">
                <i onClick={moveToTable} className="ri-close-line absolute right-6 cursor-pointer text-4xl top-4 text-white" />

                <div className="w-full h-[17vh] flex gap-5 items-center p-2 bg-[#2A5B7E]">

                    <img className="w-24 h-24 object-cover object-top rounded-full" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fG1vZGVsJTIwbWVuJ3xlbnwwfHwwfHx8MA%3D%3D" alt="" />

                    <div className="text-white">
                        <h1 className="text-2xl font-bold text-white">{userData.membername}</h1>
                        <div className="flex mt-2 items-center gap-3">
                            <div>
                                <p>@{userData.membername.toLowerCase().split(" ")}</p>
                                <p>User ID</p>
                            </div>
                            <div className="w-[1px] h-12 bg-slate-100"></div>

                            <div>
                                <p>{userData.role}</p>
                                <p>Role</p>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="w-[96%] h-11 ml-4 text-[#334155] mt-3 rounded-md p-1 bg-slate-200">
                    <p className="font-bold text-xl">Personal Information</p>

                </div>
                {userData ? (
                    <div>
                        <div className="flex p-2 gap-28 border-b-2 py-3">

                            <p className="text-black font-semibold">Data of Birth</p>
                            <p className="text-[#6E7C92]">

                                {formatDateOfBirth(userData.dateofbirth)}
                            </p>
                        </div>
                        <div className="flex p-2 gap-40 border-b-2 py-3">

                            <p className="text-black font-semibold">Gender</p>
                            <p className="text-[#6E7C92]">

                                {userData.gender.toUpperCase()}
                            </p>
                        </div>
                        <div className="flex p-2 gap-32 border-b-2 py-3">

                            <p className="text-black font-semibold">Nationality</p>
                            <p className="text-[#6E7C92]">

                                {userData.nationality}
                            </p>
                        </div>
                        <div className="flex p-2 gap-32 border-b-2 py-3">

                            <p className="text-black font-semibold">Contact No.</p>
                            <p className="text-[#6E7C92]">

                                {userData.contact}
                            </p>
                        </div>
                        <div className="flex p-2 gap-28 border-b-2 py-3">

                            <p className="text-black font-semibold">Email Address</p>
                            <p className="text-[#6E7C92]">

                                {userData.email}
                            </p>
                        </div>
                        <div className="flex p-2 gap-20 border-b-2 py-3">

                            <p className="text-black font-semibold">Work email Address</p>
                            <p className="text-[#6E7C92]">

                                {userData.email}
                            </p>
                        </div>

                    </div>
                ) : (
                    <div>User not found.</div>
                )}

                <div className="w-[96%] h-11 ml-4 text-[#334155] mt-3 rounded-md p-1 bg-slate-200">
                    <p className="font-bold text-xl">Research & Publication</p>

                </div>

                <div>
                    <h3 className="text-black font-semibold ml-5 mt-1">AI and User Experience: The Future of Design</h3>

                    <p className="text-[#6E7C92] ml-5">Published in the Journal of Modern Design 2022</p>
                </div>
            </div>


        </div>
    );
};

export default Profile;
