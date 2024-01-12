import { BrowserRouter , Routes , Route } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Dish from "./pages/Dish"
import { useEffect } from "react"
import Aos from "aos"
import Plate from "./pages/Plates"
import NavBar from "./components/Navbar"
import GetPlates from "./pages/Getplates"
import Edit from "./pages/Edit"

export default function App() {
  useEffect(() => {
    Aos.init({
        // offset: 200,
        duration: 600,
        // easing: 'ease-in-sine',
        // delay: 100,
    });
}, [])
  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/all-plates" exact element={<GetPlates />}/>
          <Route path="/dishType/:type" element={<Dish/>}/>
          <Route path="/:id" element={<Plate/>}/>
          <Route path="/edit/:id" element={<Edit />}/>
          <Route path="*" element={<h1>check the route</h1>}/>
        </Routes>
    </BrowserRouter>
  )
}