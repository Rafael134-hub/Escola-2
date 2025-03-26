import React, {useEffect, useState} from "react";
import axios from "axios";
import './styles.css'

const ModalDisciplinas = ({
    isOpen,
    onClose,
    disciplinaSelecionada,
    seta,
    setSeta
})=>{
    if(!isOpen) return null

    const [id, setId] = useState(disciplinaSelecionada?.id ?? '')
    const [nome_disciplina, setNomeDisciplina] = useState(disciplinaSelecionada?.nome_disciplina ?? '')
    const [codigo, setCodigo] = useState(disciplinaSelecionada?.codigo ?? '')
    const [carga_horaria, setCarga_horaria] = useState(disciplinaSelecionada?.carga_horaria ?? '')
    const token = localStorage.getItem('token')

    const handleSubmit = (e)=>{
        e.preventDefault()
  
    }


    const newSubject = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/disciplinas',
                {
                    nome_disciplina: nome_disciplina,
                    codigo: codigo,
                    carga_horaria: carga_horaria
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }

            )
        
        console.log("Dados inseridos com sucesso")  
        setSeta(!seta)
        onClose(true)  
            
        } catch (error) {
            
        }
    }

    const editSubject = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/disciplina/${disciplinaSelecionada.id}`,
                {
                    nome_disciplina: nome_disciplina,
                    codigo: codigo,
                    carga_horaria: carga_horaria
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }

            )
        
        console.log("Dados atualizados com sucesso")  
        setSeta(!seta)
        onClose(true)  
            
        } catch (error) {
            
        }
    }

    return(
        <div className="modal-modal">
            <div className="container-modal">
                <div className="head-modal">
                    <button className="close-button" onClick={onClose}>X</button>     
                </div>
                <h2>{disciplinaSelecionada ? `Editar - ${disciplinaSelecionada.nome_disciplina}` : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="test_container">
                            <div className="caixa-1">
                                <input
                                    className="ni-modal"
                                    value={nome_disciplina}
                                    placeholder="nome da disciplina"
                                    onChange={(e)=>setNomeDisciplina(e.target.value)}
                                />
                                <input
                                    className="nome-modal"
                                    value={codigo}
                                    placeholder="codigo da disciplina"
                                    onChange={(e)=>setCodigo(e.target.value)}
                                />
                                <input
                                    className="email-modal"
                                    value={carga_horaria}
                                    placeholder="carga horária da disciplina"
                                    onChange={(e)=>setCarga_horaria(e.target.value)}
                                />
                            </div>

                            <div className="caixa2">

                            </div>
                        </div>

                        <div className="footer_modal">
                            <button id="botao_envio"
                             type="submit" 
                             onClick={disciplinaSelecionada ? editSubject : newSubject}>Salvar
                             </button> 
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ModalDisciplinas