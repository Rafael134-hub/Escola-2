import React, {useEffect, useState} from "react";
import axios from "axios";
import './styles.css'

const ModalTurmas = ({
    isOpen,
    onClose,
    turmaSelecionada,
    seta,
    setSeta
})=>{
    if(!isOpen) return null

    const [id, setId] = useState(turmaSelecionada?.id ?? '')
    const [codigo, setCodigo] = useState(turmaSelecionada?.codigo ?? '')
    const [turma, setTurma] = useState(turmaSelecionada?.turma ?? '')
    const token = localStorage.getItem('token')

    const handleSubmit = (e)=>{
        e.preventDefault()
  
    }


    const newClass = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/turmas',
                {
                    codigo: codigo,
                    turma: turma
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

    const editClass = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/turma/${turmaSelecionada.id}`,
                {
                    codigo: codigo,
                    turma: turma
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
                <h2>{turmaSelecionada ? `Editar - ${turmaSelecionada.turma}` : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="test_container">
                            <div className="caixa-1">
                                <input
                                    className="ni-modal"
                                    value={turma}
                                    placeholder="nome da turma"
                                    onChange={(e)=>setTurma(e.target.value)}
                                />
                                <input
                                    className="nome-modal"
                                    value={codigo}
                                    placeholder="codigo da turma"
                                    onChange={(e)=>setCodigo(e.target.value)}
                                />

                            </div>

                            <div className="caixa2">

                            </div>
                        </div>

                        <div className="footer_modal">
                            <button id="botao_envio"
                             type="submit" 
                             onClick={turmaSelecionada ? editClass : newClass}>Salvar
                             </button> 
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ModalTurmas