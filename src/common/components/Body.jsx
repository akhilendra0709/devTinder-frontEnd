import {Outlet, useLocation, useNavigate} from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import {BASE_URL} from "../../utils/constants.js";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../../utils/userSlice.js";
import {useEffect} from "react";
import { ToastContainer } from "react-toastify";

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location=useLocation()
    const userData = useSelector(state => state.user)
    const fetchUser = async () => {
        if (userData) return
        try {
            const user = await axios.get(BASE_URL + `/profile/view`, {
                withCredentials: true
            })
            dispatch(addUser(user?.data?.data))
        } catch (error) {
            if (error?.response?.status === 401 && location.pathname !== "/signup") {
                navigate("/");
            }
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <>
            <Navbar/>
            <Outlet/>
            <ToastContainer />
            <Footer/>
        </>
    );
};

export default Body;
