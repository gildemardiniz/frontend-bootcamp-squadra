import { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from "../../service/api";
import { useSnackbar } from 'notistack';

const FormMunicipio = ({ hideModal, backModalAddress }) => {

    const { enqueueSnackbar } = useSnackbar();

    const [state, setState] = useState([]);

    const [municipio, setMunicipio] = useState({
        codigoUf: 0,
        nome: '',
    })

    const snackbar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
        })
    }

    const validaForm = () => {
        if (!municipio.nome) return snackbar('Por favor preencha o nome', "warning")
        if (municipio.codigoUf === 0 || municipio.codigoUf === '0') return snackbar('Por favor selecione uma UF', "warning")
        return true;
    }

    const clearForm = () => {
        setMunicipio({
            codigoUf: 0,
            nome:'',
        });
        setState([]);
    }

    const cancel = () => {
        hideModal();
        backModalAddress();
    }

    const fetchState = () => {
        api.get("uf")
            .then((response) => {
                setState(response.data)
            })
            .catch(function (error) {
                snackbar("Não foi possível conectar ao servidor, contate o suporte.", "error");
            })
            .finally(() => { });
    }

    const postCity = (m) => {
        api.post("municipio", {
            "codigoUf": m.codigoUf,
            "nome": m.nome,
            "status": 1
        }).then((response)=>{
            clearForm();
            cancel();
            snackbar("Município cadastrado com sucesso","success")
        }).catch((error)=>{
            snackbar(error.response.data.status+" Error: "  + " " + error.response.data.mensagem,"error");
        })

    }

    const municipioInput = e => setMunicipio({ ...municipio, [e.target.name]: e.target.value })

    return (
        <div className="">
            <div className='row m-0 col-lg-12 card card-body'>
                <div className='row'>
                    <div className="form-group col-md-12 mb-3">
                        <label htmlFor="inputNome" className="form-label">Nome</label>
                        <input
                            type="text"
                            id="inputSigla"
                            name='nome'
                            className="form-control"
                            placeholder="Digite o nome"
                            onChange={municipioInput}
                            value={municipio.nome}
                        />
                    </div>
                    <div className="form-group col-md-12 mb-3">
                        <label htmlFor="inputMunicipio" className="form-label">UF</label>
                        <div className='d-flex'>
                            <select
                                id="inputMunicipio"
                                className="form-select"
                                name="codigoUf"
                                onChange={(e) => {
                                    municipioInput(e);
                                }}
                                onClick={() => {
                                    fetchState();
                                }}
                            >
                                <option defaultValue value={0}>Selecione uma UF</option>
                                {state.map((uf) => {
                                    return <option value={uf.codigoUF} key={uf.codigoUF}>
                                        {uf.nome}
                                    </option>
                                })}
                            </select>
                        </div>

                    </div>
                </div>

            </div>
            <div className="my-3">
                <button type='button' className='btn btn-success mx-0'
                    onClick={(e) => {
                        if (validaForm()) {
                            postCity(municipio)
                        }
                    }}>
                    <AddCircleOutlineIcon /> SALVAR
                </button>

                <button type='button' className="btn btn-primary mx-2 " onClick={(e) => {
                    clearForm();
                    cancel();
                }}><ArrowBackIcon /> CANCELAR
                </button>
            </div>
        </div>
    )
}
export default FormMunicipio;