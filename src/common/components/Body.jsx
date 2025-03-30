import {Outlet, useNavigate} from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import {BASE_URL} from "../../utils/constants.js";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../../utils/userSlice.js";
import {useEffect} from "react";

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(state => state.user)
    const fetchUser = async () => {
        if (userData) return
        try {
            const user = await axios.get(BASE_URL + `/profile/view`, {
                withCredentials: true
            })
            dispatch(addUser(user?.data?.data))
        } catch (error) {
            if (error?.status === 401) {
                navigate("/login")
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
            <Footer/>
        </>
    );
};

export default Body;
