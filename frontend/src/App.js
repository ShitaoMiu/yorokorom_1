import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./common/Board";
import { useEffect } from "react";
function App() {
  useEffect(() => console.log("app is loading!!!!!!!!!!!!!!!!!!"), []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/board/:bbsId" element={<Board />}></Route>
        <Route path="/board/:bbsId/new" element={<Board />}></Route>
        <Route path="/board/:bbsId/post/:postId" element={<Board />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
