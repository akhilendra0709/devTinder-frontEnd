import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./common/components/Body";
import Login from "./common/components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Feed from "./common/components/Feed.jsx";
import Profile from "./common/components/Profile.jsx";
import Connections from "./common/components/Connections.jsx";
import Requests from "./common/components/Requests.jsx";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/connections" element={<Connections />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
