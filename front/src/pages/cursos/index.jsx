import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './styles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import ModalCursos from "../../components/modals/courses/index"

export default function Cursos() {
    const [dados, setDados] = useState([])
    const token = localStorage.getItem('token')
    const [seta, setSeta] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [cursoSelecionado, setCursoSelecionado] = useState(null)

    useEffect(() => {
        console.log("Token Rafa:", token);
        
        if (!token) return;
        console.log("Dados", dados);
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cursos',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(response.data)
                console.log("Dados Rafa:", dados);
                
            } catch (error) {
                console.log(error)
            } 
        }

        fetchData()
    }, [seta])

    const apagar = async (id) => {
        if (window.confirm("Tem certeza? ")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/curso/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(dados.filter((curso) => { curso.id !== id }))
                setSeta(!seta)
            } catch (error) {
                console.error(error)
            }
        }
    }
    const criar = async(novoCurso)=>{
        console.log("Novo Curso: ", novoCurso)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cursos',
                
                {
                    codigo: novoCurso.codigo,
                    nome_curso: novoCurso.nome_curso,
                    tipo: novoCurso.tipo,
                    hora_aula: novoCurso.hora_aula,
                    sigla: novoCurso.sigla
                   
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados(...dados, novoCurso)
            setModalOpen(false)
            setSeta(!seta)
        } catch (error) {
            console.error(error)
        }

    }

    const atualizar = (curso)=>{
        setCursoSelecionado(curso)
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
                                <div className="coluna_1"></div>
                                <div className="coluna_2"></div>
                                <div className="coluna_3"><th>CODIGO</th></div>
                                <div className="coluna_4"><th>NOME DO CURSO</th></div>
                                <div className="coluna_5"><th>TIPO</th></div>
                                <div className="coluna_6"><th>CARGA HORÁIA</th></div>
                                <div className="coluna_7"><th>SIGLA</th></div>
                            </tr>
                        </thead>
                        <tbody> 
                            {dados.map((curso) => (
                                <tr key={curso.id} className="campos">
                                    <td className="icons">
                                        <div className="coluna_1">
                                            <FaEdit className="edit" onClick={()=> atualizar(curso)} />
                                        </div>
                                        <div className="coluna_2">
                                            <FaTrash className="delete" onClick={() => apagar(curso.id)} />
                                        </div>

                                    </td>
                                    <div className="coluna_3"><td>{curso.codigo}</td></div>
                                    <div className="coluna_4"><td>{curso.nome_curso}</td></div>
                                    <div className="coluna_5"><td>{curso.tipo}</td></div>
                                    <div className="coluna_6"><td>{curso.hora_aula}</td></div>
                                    <div className="coluna_7"><td>{curso.sigla}</td></div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus className="adicionar" onClick={()=>{setModalOpen(true), setCursoSelecionado(null)}}/>
                    </div>
                    <div className="id">
                        <input placeholder="id" />
                    </div>
                    <div className="nome">
                        <input placeholder="nome do curso"/>
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                    </div>
                </div>
                <ModalCursos
                    isOpen={modalOpen}
                    onClose={()=>setModalOpen(false)}
                    cursoSelecionado = {cursoSelecionado}
                    seta = {seta}
                    setSeta = {setSeta}
                />
            </div>
            <Footer />
        </div>
    )
}
