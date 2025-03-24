import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./common/components/Body";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<>Login</>} />
            <Route path="/test" element={<>Test</>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
