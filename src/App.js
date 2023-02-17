import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/Navbar/Navbar'
import AddPost from "./components/Posts/AddPost";
import Home from "./components/Home/Home";
import CurrentPost from "./components/Posts/CurrentPost";
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/add-post" exact element={<AddPost />} />
        <Route path="/get-sigle-post/:id" exact element={<CurrentPost />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;