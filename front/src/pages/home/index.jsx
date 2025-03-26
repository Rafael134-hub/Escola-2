import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import Header from "../../components/header";
import Footer from "../../components/footer";
import ModalProfessores from "../../components/modals/teachers/index"
import axios from "axios";
import './styles.css'
import {useNavigate} from 'react-router-dom'
import { Edit } from "lucide-react";


export default function Home() {

    const navigate = useNavigate()

    return (
        <div >
            <Header />
            <h1>Home</h1>
            <button onClick={() => navigate('/teachers')}>Teachers</button>
            <button onClick={() => navigate('/subjects')}>Subjects</button>
            <Footer />
        </div>
    )
}

       