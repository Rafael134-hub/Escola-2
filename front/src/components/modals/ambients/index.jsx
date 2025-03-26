import React, {useEffect, useState} from "react";
import axios from "axios";
import './styles.css'

const ModalAmbientes = ({
    isOpen,
    onClose,
    ambienteSelecionado,
    seta,
    setSeta
})=>{
    if(!isOpen) return null

    const [id, setId] = useState(ambienteSelecionado?.id ?? '')
    const [codigo, setCodigo] = useState(ambienteSelecionado?.codigo ?? '')
    const [nome_sala, setNomeSala] = useState(ambienteSelecionado?.nome_sala ?? '')
    const [periodo, setPeriodo] = useState([]); // Lista com as opções vindas da API
    const [periodoSelecionado, setPeriodoSelecionado] = useState(ambienteSelecionado?.periodo ?? '');
    const [capacidade, setCapacidade] = useState(ambienteSelecionado?.capacidade ?? '')
    const [responsavel, setResponsavel] = useState(ambienteSelecionado?.responsavel ?? '')
    const token = localStorage.getItem('token')

    const handleSubmit = (e)=>{
        e.preventDefault()
  
    }


    useEffect(() => {
        async function fetchPeriodo() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/periodo_choices", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPeriodo(response.data);
            } catch (error) {
                console.error("Erro ao buscar períodos:", error);
            }
        }
        fetchPeriodo();
    }, []);


    const newAmbient = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/ambientes',
                {
                    codigo: codigo,
                    nome_sala: nome_sala,
                    capacidade: capacidade,
                    responsavel: responsavel,
                    periodo: periodoSelecionado
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            console.log("Dados inseridos com sucesso");
            setSeta(!seta);
            onClose(true);
        } catch (error) {
            console.error("Erro ao inserir ambiente:", error);
        }
    };


    const editAmbient = async () => {
        try {
            console.log("Dados enviados para atualização:", {
                codigo: codigo,
                nome_sala: nome_sala,
                capacidade: capacidade,
                responsavel: responsavel,
                periodo: periodoSelecionado
            });
    
            await axios.put(`http://127.0.0.1:8000/api/ambiente/${ambienteSelecionado.id}`,
                {
                    codigo: codigo,
                    nome_sala: nome_sala,
                    capacidade: capacidade,
                    responsavel: responsavel,
                    periodo: periodoSelecionado
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            console.log("Dados atualizados com sucesso");
            setSeta(!seta);
            onClose(true);
        } catch (error) {
            console.error("Erro ao atualizar ambiente:", error.response?.data || error.message);
        }
    };
    
    return(
        <div className="modal-modal">
            <div className="container-modal">
                <div className="head-modal">
                    <button className="close-button" onClick={onClose}>X</button>     
                </div>
                <h2>{ambienteSelecionado ? `Editar - ${ambienteSelecionado.nome_sala}` : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="test_container">
                            <div className="caixa-1">
                                <input
                                    className="ni-modal"
                                    value={nome_sala}
                                    placeholder="nome da sala"
                                    onChange={(e)=>setNomeSala(e.target.value)}
                                />
                                <input
                                    className="nome-modal"
                                    value={codigo}
                                    placeholder="codigo do ambiente"
                                    onChange={(e)=>setCodigo(e.target.value)}
                                />


                                <select
                                    className="tipo_ambiente-modal"
                                    value={periodoSelecionado}
                                    onChange={(e) => setPeriodoSelecionado(e.target.value)}
                                >
                                    <option value="">Selecione o período</option>
                                    {Array.isArray(periodo) && periodo.length > 0 ? (
                                        periodo.map((option) => (
                                            <option key={option[0]} value={option[0]}>
                                                {option[1]} 
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>Carregando...</option>
                                    )}
                                </select>

                                <input
                                    className="nome-modal"
                                    value={capacidade}
                                    placeholder="capacidade da sala"
                                    onChange={(e)=>setCapacidade(e.target.value)}
                                />

                                <input
                                    className="nome-modal"
                                    value={responsavel}
                                    placeholder="responsável da sala"
                                    onChange={(e)=>setResponsavel(e.target.value)}
                                />


                            </div>

                            <div className="caixa2">

                            </div>
                        </div>

                        <div className="footer_modal">
                            <button id="botao_envioh"
                             type="submit" 
                             onClick={ambienteSelecionado ? editAmbient : newAmbient}>Salvar
                             </button> 
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ModalAmbientes