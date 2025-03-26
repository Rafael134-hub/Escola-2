import React, {useEffect, useState} from "react";
import axios from "axios";
import './styles.css'

const ModalCursos = ({
    isOpen,
    onClose,
    cursoSelecionado,
    seta,
    setSeta
})=>{
    if(!isOpen) return null

    const [id, setId] = useState(cursoSelecionado?.id ?? '')
    const [codigo, setCodigo] = useState(cursoSelecionado?.codigo ?? '')
    const [nome_curso, setNomeCurso] = useState(cursoSelecionado?.nome_curso ?? '')
    const [tipo, setTipo] = useState([]); // Lista com as opções vindas da API
    const [tipoSelecionado, setTipoSelecionado] = useState(cursoSelecionado?.tipo ?? '');
    const [hora_aula, setHoraAula] = useState(cursoSelecionado?.hora_aula ?? '')
    const [sigla, setSigla] = useState(cursoSelecionado?.sigla ?? '')
    const token = localStorage.getItem('token')

    const handleSubmit = (e)=>{
        e.preventDefault()
  
    }


    useEffect(() => {
        async function fetchTipo() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/tipo_curso_choices", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTipo(response.data);
            } catch (error) {
                console.error("Erro ao buscar tipos de curso:", error);
            }
        }
        fetchTipo();
    }, []);


    const newCourse = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/cursos',
                {
                    codigo: codigo,
                    nome_curso: nome_curso,
                    tipo: tipoSelecionado, // Agora enviamos só a string
                    hora_aula: hora_aula,
                    sigla: sigla
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
            console.error("Erro ao inserir curso:", error);
        }
    };


    const editCourse = async () => {
        try {
            console.log("Dados enviados para atualização:", {
                codigo: codigo,
                nome_curso: nome_curso,
                tipo: tipoSelecionado, // ID ou valor esperado pela API
                hora_aula: hora_aula,
                sigla: sigla
            });
    
            await axios.put(`http://127.0.0.1:8000/api/curso/${cursoSelecionado.id}`,
                {
                    codigo: codigo,
                    nome_curso: nome_curso,
                    tipo: tipoSelecionado,  // Enviar o valor correto
                    hora_aula: hora_aula,
                    sigla: sigla
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
            console.error("Erro ao atualizar curso:", error.response?.data || error.message);
        }
    };
    
    return(
        <div className="modal-modal">
            <div className="container-modal">
                <div className="head-modal">
                    <button className="close-button" onClick={onClose}>X</button>     
                </div>
                <h2>{cursoSelecionado ? `Editar - ${cursoSelecionado.nome_curso}` : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="test_container">
                            <div className="caixa-1">
                                <input
                                    className="ni-modal"
                                    value={nome_curso}
                                    placeholder="nome do curso"
                                    onChange={(e)=>setNomeCurso(e.target.value)}
                                />
                                <input
                                    className="nome-modal"
                                    value={codigo}
                                    placeholder="codigo do curso"
                                    onChange={(e)=>setCodigo(e.target.value)}
                                />


                                <select
                                    className="tipo_curso-modal"
                                    value={tipoSelecionado}
                                    onChange={(e) => setTipoSelecionado(e.target.value)}
                                >
                                    <option value="">Selecione o tipo</option>
                                    {Array.isArray(tipo) && tipo.length > 0 ? (
                                        tipo.map((option) => (
                                            <option key={option[0]} value={option[0]}>
                                                {option[1]} {/* O valor aqui é o ID, e o texto é o nome */}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>Carregando...</option>
                                    )}
                                </select>

                                <input
                                    className="nome-modal"
                                    value={hora_aula}
                                    placeholder="carga horária do curso"
                                    onChange={(e)=>setHoraAula(e.target.value)}
                                />

                                <input
                                    className="nome-modal"
                                    value={sigla}
                                    placeholder="sigla"
                                    onChange={(e)=>setSigla(e.target.value)}
                                />


                            </div>

                            <div className="caixa2">

                            </div>
                        </div>

                        <div className="footer_modal">
                            <button id="botao_envioh"
                             type="submit" 
                             onClick={cursoSelecionado ? editCourse : newCourse}>Salvar
                             </button> 
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ModalCursos