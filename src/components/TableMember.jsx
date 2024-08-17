import axios from "axios";
import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Addmember from "./Addmember";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMember } from "../redux/user/userSlice";


const TableMember = () => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [addmember, setAddmember] = useState(false);
  const [filterBox, setFilterBox] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");
  const [selectedRoles, setSelectedRole] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [deleteBoxVisible, setDeleteBoxVisible] = useState(false);
  const [deleteMemberId, setDeleteMemberId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/profile/${id}`);
  };

  const toggleAddMember = () => {
    setAddmember(!addmember);
  };
  const FilterBox = () => {
    setFilterBox(!filterBox);
  };
  const toggleDeleteBox = (memberId) => {
    setDeleteBoxVisible(!deleteBoxVisible);
    setDeleteMemberId(memberId); // Set the member ID to delete
  };


  const handleFilterClick = (filterType) => {
    if (activeFilter === filterType) {
      setActiveFilter("")
    } else {
      setActiveFilter(filterType)
    }
  };

  const handleOptionClick = (type, value) => {
    if (type === "role") {
      setSelectedRole((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    } else if (type === "teams") {
      setSelectedTeams((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }
  };


  const fetchFilteredMembers = async (selectedRoles, selectedTeams) => {
    try {
      const roleParam = selectedRoles.length > 0 ? selectedRoles.join(',') : null;
      const teamsParam = selectedTeams.length > 0 ? selectedTeams.join(',') : null;

      const response = await axios.get('https://backendassign-wcqv.onrender.com/api/member/filter-member', {
        params: { role: roleParam, teams: teamsParam },
      });

      setListing(response.data.getallmember);
    } catch (error) {
      console.error("Error fetching filtered members:", error);
    }
  };

  useEffect(() => {


    const fetchMember = async () => {
      try {
        setLoading(true)

        await fetchFilteredMembers(selectedRoles, selectedTeams)

        setLoading(false)
        setError(false)
      } catch (error) {
        console.log("Error in filter", error)
        setError(true)
        setLoading(false);
      }

    }

    fetchMember();
  }, [selectedRoles, selectedTeams]);


  // fetchFilteredMembers(selectedRoles, selectedTeams);



  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://backendassign-wcqv.onrender.com/api/member/get-member');
        setListing(response.data.getallmember);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, []);


  const handleDeleteMember = (deleteMemberId) => {
    dispatch(deleteMember(deleteMemberId))
  };


  const columns = [
    {
      id: 'name',
      header: "Name",
      accessorKey: "membername",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User"
            className="rounded-full object-cover object-top ml-2 w-10 h-10"
          />
          <span>{row.original.membername}</span>
        </div>
      ),
    },
    {
      id: 'status', // Add an ID for each column
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span>{row.original.status}</span>
      )
    },
    {
      id: 'role', // Add an ID for each column
      header: "Role",
      accessorKey: "role",
    },
    {
      id: 'email', // Add an ID for each column
      header: "Email Address",
      accessorKey: "email",
    },
    {
      id: 'teams',
      header: "Teams",
      accessorKey: "teams",
      cell: ({ row }) => (
        <span>{row.original.teams}</span>

      )
    },
    {
      id: 'actions',
      header: "",
      cell: ({ row }) => (
        <div>
          <i onClick={() => toggleDeleteBox(row.original._id)} className="ri-delete-bin-6-line" />
          <i className="ri-pencil-line" />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: listing,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full mt-10 flex text-black ">
      <div className="w-[25%] h-full"></div>
      <div className="w-[75%] h-full flex items-center justify-center">
        <div className="w-[96%] border-2 rounded-lg overflow-hidden h-[94%]">
          <div className="w-full px-7 items-center justify-between flex h-16 ">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-semibold">Team Members</h3>

              <p className="border px-3 text-[#6941C6] font-semibold bg-gray-100 border-[#6941C6] rounded-full">{listing.length} Users</p>

            </div>

            <div className="flex gap-7">
              <input className="w-[20vw] pl-3 border-2 rounded-md outline-none" type="text" placeholder="Search.." />

              <i onClick={FilterBox} className="ri-filter-line text-3xl cursor-pointer font-thin" />

              <button onClick={toggleAddMember} className="px-5 py-2 flex rounded-md gap-2 text-white font-semibold bg-[#6941C6]">
                <i className="ri-add-line" />
                ADD MEMBER
              </button>
            </div>

          </div>

          {loading ? "Loading..." :
            <table className="w-full h-full text-black">
              <thead className="border-t h-12">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody >
                {table.getRowModel().rows.map((row, index) => (
                  <tr onClick={() => handleRowClick(row.original._id)}
                    className={`border h-20 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`} key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td className="cursor-pointer " key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

          }

        </div>
      </div>




      {addmember && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="w-[60vw] h-[90vh] rounded-md overflow-hidden bg-white">

            <Addmember />
          </div>
        </div>
      )}

      {filterBox && (
        <div className="absolute top-[24%] left-[70%] border w-[15vw] p-3 h-[40vh] shadow-lg bg-white">
          <div className="flex border-b  items-center justify-between px-3">
            <p className="font-semibold">Filters</p>
            <i className="ri-arrow-up-s-line" />
          </div>

          <div onClick={() => handleFilterClick("role")} className="flex cursor-pointer items-center px-3 p-1 justify-between">
            <div id="role" className="flex items-center gap-2">
              <i className="ri-checkbox-blank-line" />
              <p>Role</p>

            </div>

            <i className="ri-arrow-down-s-line" />

          </div>


          {activeFilter === "role" && (
            <div className="px-3 mt-2 ml-4">
              {["Product Manager", "Product Developer", "Frontend Developer", "Backend Developer"].map((role) => (
                <div key={role}
                  onClick={() => handleOptionClick("role", role)}
                  className={`flex items-center mt-2 gap-2 cursor-pointer ${selectedRoles.includes(role) ? "text-blue-500" : ""}`}>
                  <i className={`ri-checkbox-${selectedRoles.includes(role) ? "fill" : "blank"}-line`} />
                  <p>{role}</p>

                </div>
              ))}
            </div>
          )}



          <div onClick={() => handleFilterClick("teams")} className="flex cursor-pointer items-center px-3 p-1 justify-between">
            <div id="teams" className="flex items-center gap-2">
              <i className="ri-checkbox-blank-line" />
              <p>Teams</p>

            </div>

            <i className="ri-arrow-down-s-line" />

          </div>

          {activeFilter === "teams" && (
            <div className="px-3 mt-2 ml-5">
              {["Design", "Marketing", "Sale", "Technology"].map((teams) => (
                <div key={teams}
                  onClick={() => handleOptionClick("teams", teams)}
                  className={`flex items-center mt-2 gap-2 cursor-pointer ${selectedTeams.includes(teams) ? "text-blue-500" : ""}`}>
                  <i className={`ri-checkbox-${selectedTeams.includes(teams) ? "fill" : "blank"}-line`} />
                  <p>{teams}</p>

                </div>
              ))}
            </div>
          )}



          <button className="bg-purple-600 w-full rounded-md mt-5 text-white font-semibold py-2">Select</button>
        </div>



      )}


      {deleteBoxVisible && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this member?
            </h2>
            <button
              onClick={handleDeleteMember}

              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => toggleDeleteBox(null)}
              className="ml-4 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>




  );
};

export default TableMember;
