import React from "react";
import './styles.css'
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

export default function Header(){

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
    }

    return(
        <header>
            <div className="container_header">
                <div className="title">
                    <h1>Header</h1>    
                </div>

                <div className="nav_area">
                    <Link to={'/subjects/'}><p id="disciplina">Disciplinas</p></Link>
                    <Link to={'/teachers/'}><p id="disciplina3">Professores</p></Link>
                    <Link to={'/home/'}><p id="disciplina2">Home</p></Link>
                    <Link to={'/classes'}><p id="disciplina2">Turmas</p></Link>
                    <Link to={'/courses'}><p id="disciplina2">Cursos</p></Link>
                    <Link to={'/ambients'}><p id="disciplina2">Ambientes</p></Link>
                    <IoIosLogOut onClick={logout} id="exit"></IoIosLogOut>
                </div>
            </div>
        </header>
        
    )
}