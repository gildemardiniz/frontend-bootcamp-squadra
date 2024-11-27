import { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSnackbar } from 'notistack';
import api from "../../service/api";


const FormUF = ({ hideModal, backModalAddress }) => {

    const { enqueueSnackbar } = useSnackbar();

    const [estado, setEstado] = useState({
        sigla: '',
        nome: ''
    })

    const estadoInput = e => setEstado({ ...estado, [e.target.name]: e.target.value })

    const snackbar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
        })
    }
    const validaForm = () => {
        if (!estado.sigla) return snackbar('Por favor preencha a sigla', "warning")
        if (!estado.nome) return snackbar('Por favor preencha  o nome', "warning")
        return true;
    }
 
    const clearForm = () => {
        setEstado({
            sigla: '',
            nome:'',
        });
    }

    const cancel = () => {
        hideModal();
        backModalAddress();
    }

    const postState = (u) => {
        api.post("uf", {
            "sigla": u.sigla,
            "nome": u.nome,
            "status": 1
        }).then((response)=>{
            clearForm();
            cancel();
            snackbar("UF cadastrada com sucesso","success")
        }).catch((error)=>{
            snackbar(error.response.data.status+" Error: "  + " " + error.response.data.mensagem,"error");
        })

    }

    return (
        <div className="">
            <div className='row m-0 col-lg-12  card card-body'>
                <div className='row'>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="inputLogin" className="form-label">Sigla</label>
                        <input
                            type="text"
                            id="inputSigla"
                            name='sigla'
                            className="form-control"
                            placeholder="Digite a sigla"
                            onChange={estadoInput}
                            value={estado.sigla}
                        />
                    </div>
                    <div className="form-group col-md-8 mb-3">
                        <label htmlFor="inputLogin" className="form-label">Nome</label>
                        <input
                            type="text"
                            id="inputNome"
                            name='nome'
                            className="form-control"
                            placeholder="Digite o nome"
                            onChange={estadoInput}
                            value={estado.nome} />
                    </div>
                </div>
            </div>
            <div className="my-3">
                <button type="button" className='btn btn-success mx-0'
                    onClick={() => {
                        if(validaForm()){
                            postState(estado);
                        }
                    }}><AddCircleOutlineIcon /> SALVAR
                </button>

                <button type="button" className="btn btn-primary mx-2 " onClick={() => {
                    cancel();
                }}><ArrowBackIcon /> CANCELAR
                </button>
            </div>
        </div>
    )
}
export default FormUF;