import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './styles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import ModalAmbientes from "../../components/modals/ambients/index"

export default function Ambientes() {
    const [dados, setDados] = useState([])
    const token = localStorage.getItem('token')
    const [seta, setSeta] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [ambienteSelecionado, setAmbienteSelecionado] = useState(null)

    useEffect(() => {

        if (!token) return;
        console.log("Dados", dados);
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/ambientes',
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
                await axios.delete(`http://127.0.0.1:8000/api/ambiente/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(dados.filter((ambiente) => { ambiente.id !== id }))
                setSeta(!seta)
            } catch (error) {
                console.error(error)
            }
        }
    }
    const criar = async(novoAmbiente)=>{
        console.log("Novo Ambiente: ", novoAmbiente)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/ambientes',
                
                {
                    codigo: novoAmbiente.codigo,
                    nome_sala: novoAmbiente.nome_sala,
                    capacidade: novoAmbiente.capacidade,
                    responsavel: novoAmbiente.responsavel,
                    periodo: novoAmbiente.periodo
                   
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados(...dados, novoAmbiente)
            setModalOpen(false)
            setSeta(!seta)
        } catch (error) {
            console.error(error)
        }

    }

    const atualizar = (ambiente)=>{
        setAmbienteSelecionado(ambiente)
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
                                <div className="coluna_4"><th>NOME DA SALA</th></div>
                                <div className="coluna_5"><th>CAPACIDADE</th></div>
                                <div className="coluna_6"><th>RESPONSÁVEL</th></div>
                                <div className="coluna_7"><th>PERIODO</th></div>
                            </tr>
                        </thead>
                        <tbody> 
                            {dados.map((ambiente) => (
                                <tr key={ambiente.id} className="campos">
                                    <td className="icons">
                                        <div className="coluna_1">
                                            <FaEdit className="edit" onClick={()=> atualizar(ambiente)} />
                                        </div>
                                        <div className="coluna_2">
                                            <FaTrash className="delete" onClick={() => apagar(ambiente.id)} />
                                        </div>

                                    </td>
                                    <div className="coluna_3"><td>{ambiente.codigo}</td></div>
                                    <div className="coluna_4"><td>{ambiente.nome_sala}</td></div>
                                    <div className="coluna_5"><td>{ambiente.capacidade}</td></div>
                                    <div className="coluna_6"><td>{ambiente.responsavel}</td></div>
                                    <div className="coluna_7"><td>{ambiente.periodo}</td></div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus className="adicionar" onClick={()=>{setModalOpen(true), setAmbienteSelecionado(null)}}/>
                    </div>
                    <div className="id">
                        <input placeholder="id" />
                    </div>
                    <div className="nome">
                        <input placeholder="nome do ambiente"/>
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                    </div>
                </div>

                <ModalAmbientes
                    isOpen={modalOpen}
                    onClose={()=>setModalOpen(false)}
                    ambienteSelecionado = {ambienteSelecionado}
                    seta = {seta}
                    setSeta = {setSeta}
                />
            </div>
            <Footer />

        </div>
    )
}
