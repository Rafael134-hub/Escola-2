import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './styles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import ModalDisciplinas from "../../components/modal_disciplinas"

export default function Disciplinas() {
    const [dados, setDados] = useState([])
    const token = localStorage.getItem('token')
    const [seta, setSeta] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null)

    useEffect(() => {
        if (!token) return;
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/disciplinas',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(response.data)
            } catch (error) {
                console.log(error)
            } 
        }

        fetchData()
    }, [seta])

    const apagar = async (id) => {
        if (window.confirm("Tem certeza? ")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/disciplina/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(dados.filter((disciplina) => { disciplina.id !== id }))
                setSeta(!seta)
            } catch (error) {
                console.error(error)
            }
        }
    }
    const criar = async(novaDisciplina)=>{
        console.log("Nova Disciplina: ", novaDisciplina)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/disciplinas',
                
                {
                    nome_disciplina: novaDisciplina.disciplina,
                    codigo: novaDisciplina.codigo,
                    carga_horaria: novaDisciplina.carga_horaria
                   
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados([...dados, novaDisciplina])
            setModalOpen(false)
            setSeta(!seta)
        } catch (error) {
            console.error(error)
        }

    }

    const atualizar = (disciplina)=>{
        setDisciplinaSelecionado(disciplina)
        setModalOpen(true)
    }


    return (
        <div >
            <Header />
            <div className="container_home">
                <div className="lista">
                    <table>
                        <thead>
                            <tr className="icons">
                                <div className="col_1"></div>
                                <div className="col_2"></div>
                                <div className="col_3"><th>DISCIPLINA</th></div>
                                <div className="col_4"><th>CODIGO</th></div>
                                <div className="col_5"><th>CARGA HORARIA</th></div>
                            </tr>
                        </thead>
                        <tbody> 
                            {dados.map((disciplina) => (
                                <tr key={disciplina.id} className="campos">
                                    <td className="icons">
                                        <div className="col_1">
                                            <FaEdit className="edit" onClick={()=> atualizar(disciplina)} />
                                        </div>
                                        <div className="col_2">
                                            <FaTrash className="delete" onClick={() => apagar(disciplina.id)} />
                                        </div>

                                    </td>
                                    <div className="col_3"><td>{disciplina.nome_disciplina}</td></div>
                                    <div className="col_4"><td>{disciplina.codigo}</td></div>
                                    <div className="col_5"><td>{disciplina.carga_horaria}</td></div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus className="adicionar" onClick={()=>{setModalOpen(true), setDisciplinaSelecionada(null)}}/>
                    </div>
                    <div className="id">
                        <input placeholder="id" />
                    </div>
                    <div className="nome">
                        <input placeholder="nome da disciplina" />
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                    </div>
                </div>
                <ModalDisciplinas
                    isOpen={modalOpen}
                    onClose={()=>setModalOpen(false)}
                    disciplinaSelecionada={disciplinaSelecionada}
                    seta = {seta}
                    setSeta = {setSeta}
                />
            </div>
            <Footer />
        </div>
    )
}
