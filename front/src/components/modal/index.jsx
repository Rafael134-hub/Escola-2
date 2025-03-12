import React, {useEffect, useState} from "react";
import axios from "axios";
import './styles.css'

const ModalProfessores = ({
    isOpen,
    onClose,
    professorSelecionado,
})=>{
    if(!isOpen) return null

    const [id, setId] = useState(professorSelecionado?.id ?? '')
    const [ni, setNi] = useState(professorSelecionado?.ni ?? '')
    const [nome, setNome] = useState(professorSelecionado?.nome ?? '')
    const [email, setEmail] = useState(professorSelecionado?.email ?? '')
    const [tel, setTel] = useState(professorSelecionado?.tel ?? '')
    const [ocupacao, setOcupacao] = useState(professorSelecionado?.ocupacao ?? '')
    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(professorSelecionado){
            setId(professorSelecionado.id ?? '')
            setNi(professorSelecionado.ni ?? '')
            setNome(professorSelecionado.nome ?? '')
            setEmail(professorSelecionado.email ?? '')
            setTel(professorSelecionado.tel ?? '')
            setOcupacao(professorSelecionado.ocupacao ?? '')
        }else{
            setId('')
            setNi('')
            setNome('')
            setEmail('')
            setTel('')
            setOcupacao('')
        }
    }, [])

    const handleSubmit = (e)=>{
        e.preventDefault()
        const novoProfessor = {ni, nome, email, tel, ocupacao}
        if(professorSelecionado){
            atualizar({...professorSelecionado, ...novoProfessor})
        }else{
            console.log("Teste novo professor: ", novoProfessor)
            criar(novoProfessor)
        }
    }


    const newTeacher = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/professores',
                {
                    ni: ni,
                    nome: nome,
                    email: email,
                    tel: tel,
                    ocupacao: ocupacao
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }

            )
        
        console.log("Dados inseridos com sucesso")  
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
                <h2>{professorSelecionado ? `Editar - ${professorSelecionado.nome}` : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="caixa-1">
                            <input
                                className="ni-modal"
                                value={ni}
                                placeholder="ni"
                                onChange={(e)=>setNi(e.target.value)}
                            />
                            <input
                                className="nome-modal"
                                value={nome}
                                placeholder="nome"
                                onChange={(e)=>setNome(e.target.value)}
                            />
                            <input
                                className="email-modal"
                                value={email}
                                placeholder="email"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <input
                                className="tel-modal"
                                value={tel}
                                placeholder="tel"
                                onChange={(e)=>setTel(e.target.value)}
                            />
                            <input
                                className="ocupacao-modal"
                                value={ocupacao}
                                placeholder="ocupacao"
                                onChange={(e)=>setOcupacao(e.target.value)}
                            />
                        </div>

                        <div className="caixa2">

                        </div>

                        <div className="footer_modal">
                            <button id="botao_envio" type="submit" onClick={newTeacher}>Salvar</button> 
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ModalProfessores