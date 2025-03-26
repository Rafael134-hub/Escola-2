import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./pages/login";
import Home from "./pages/home";
import Teachers from "./pages/teachers";
import Disciplinas from "./pages/disciplinas";
import Turmas from "./pages/turmas";
import Cursos from "./pages/cursos";
import Ambientes from "./pages/ambientes";

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/teachers" element={<Teachers/>}/>
        <Route path="/subjects" element={<Disciplinas/>}/>
        <Route path="/classes" element={<Turmas/>}/>
        <Route path="/courses" element={<Cursos/>}/>
        <Route path="/ambients" element={<Ambientes/>}/>
      </Routes>
    </Router>
  )
}