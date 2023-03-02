import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/Navbar/Navbar'
import AddPost from "./components/Posts/AddPost";
import Home from "./components/Home/Home";
import CurrentPost from "./components/Posts/CurrentPost";
import EditPost from "./components/Posts/EditPost";


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/get-single-post/:id" exact element={<CurrentPost />} />
        <Route path="/add-post" exact element={<AddPost />} />
        <Route path="/edit-post/:id" exact element={<EditPost />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;