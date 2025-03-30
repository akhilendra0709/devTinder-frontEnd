import {BrowserRouter, Routes, Route} from "react-router";
import Body from "./common/components/Body";
import Login from "./common/components/Login";
import {Provider} from "react-redux";
import appStore from "./utils/appStore.js";
import Feed from "./common/components/Feed.jsx";
import Profile from "./common/components/Profile.jsx";

const App = () => {
    return (
        <>
            <Provider store={appStore}>
                <BrowserRouter basename="/">
                    <Routes>
                        <Route path="/" element={<Body/>}>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/feed" element={<Feed/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/profile2" element={<>Profile2</>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    );
};

export default App;
