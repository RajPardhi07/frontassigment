import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import TableMember from "./components/TableMember"
import Change from "./components/Change"
import Profile from "./components/Profile"

const App = () => {
  return (
    <div className="text-red-400">
      <Navbar />

      <Change />

      <Routes>



        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/table" element={<TableMember />} />
        <Route path='/profile/:profileId' element={<Profile />} />


      </Routes>
    </div>
  )
}

export default App