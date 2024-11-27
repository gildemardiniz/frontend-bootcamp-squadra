import { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from "../../service/api";
import { useSnackbar } from 'notistack';


const FormBairro = ({ hideModal, backModalAddress }) => {

    const { enqueueSnackbar } = useSnackbar();
    const snackbar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
        })
    }

    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);


    const [bairro, setBairro] = useState({
        codigoMunicipio: 0,
        codigoUf: 0,
        nome: '',
    })
    const bairroInput = e => setBairro({ ...bairro, [e.target.name]: e.target.value })


    const clearForm = () => {
        setBairro({
            codigoMunicipio: 0,
            nome: '',
        });
        setState([]);
    }
    const validaForm = () => {
        if (!bairro.nome) return snackbar('Por favor preencha o nome', "warning");
        if (bairro.codigoUf === '0' || bairro.codigoUf === 0) return snackbar('Por favor selecione uma UF', "warning");
        if (bairro.codigoMunicipio === '0' || bairro.codigoMunicipio === 0) return snackbar('Por favor selecione um municipio', "warning");
        return true;
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
    const fetchCity = (codigoUf) => {

        api.get("municipio", { params: { codigoUf: codigoUf } })
            .then((response) => {
                if (response === "") {
                    response = null;
                } else {
                    setCity(response.data)
                }
            })
            .catch(function (error) {

                snackbar("Não foi possível conectar ao servidor, contate o suporte.", "error");
            })
            .finally(() => { });
    }
    const postNeighborhood = (m) => {
        api.post("bairro", {
            "codigoMunicipio": m.codigoMunicipio,
            "nome": m.nome,
            "status": 1
        }).then((response)=>{
            clearForm();
            cancel();
            snackbar("Bairro cadastrado com sucesso","success")
        }).catch((error)=>{
            snackbar(error.response.data.status+" Error: "  + " " + error.response.data.mensagem,"error");
        })
    }

    return (
        <div className="">
            <div className='row m-0 col-lg-12  card card-body'>
                <div className='row'>
                    <div className="form-group col mb-3">
                        <label htmlFor="inputNome" className="form-label">Nome</label>
                        <input
                            type="text"
                            id="inputNome"
                            name='nome'
                            className="form-control"
                            placeholder="Digite o nome"
                            onChange={bairroInput}
                            value={bairro.nome} />
                    </div>
                </div>
                <div className="form-group col-md-12 mb-3">
                    <label htmlFor="inputUf" className="form-label">UF</label>
                    <div className='d-flex'>
                        <select
                            id="inputUf"
                            className="form-select"
                            name="codigoUf"
                            onChange={(e) => {
                                bairroInput(e);
                                fetchCity(e.target.value);
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
                <div className="form-group col-md-12 mb-3">
                    <label htmlFor="inputMunicipio" className="form-label">Município</label>
                    <div className='d-flex'>
                        <select
                            id="inputMunicipio"
                            className="form-select"
                            name="codigoMunicipio"
                            onChange={(e) => {
                                e.preventDefault();
                                bairroInput(e);
                            }} >
                            <option defaultValue value={0}>Selecione um município</option>
                            {city.map((municipio) => {
                                return <option value={municipio.codigoMunicipio} key={municipio.codigoMunicipio} >{municipio.nome}</option>
                            })}
                        </select>
                    </div>

                </div>
            </div>
            <div className="my-3">
                <button type='button' className='btn btn-success mx-0'
                    onClick={(e) => {
                        e.preventDefault();
                        if (validaForm()) {
                            postNeighborhood(bairro);
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
export default FormBairro;