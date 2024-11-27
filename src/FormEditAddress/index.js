import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useState, useEffect } from 'react';
import api from '../service/api';

const FormEditAddress = ({ handleEditAddresses, closeModal, showModalUf, showModalMunicipio, showModalBairro, enderecoEdit, codigoPessoa}) => {

    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [neighborhood, setNeighborhood] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const [endereco, setEndereco] = useState(()=>{
        if(enderecoEdit && enderecoEdit.codigoEndereco){
            return{
                codigoEndereco: Number(enderecoEdit.codigoEndereco),
                codigoBairro: Number(enderecoEdit.codigoBairro.codigoBairro),
                nomeBairro: enderecoEdit.codigoBairro.nome,
                codigoMunicipio: Number(enderecoEdit.codigoBairro.codigoMunicipio.codigoMunicipio),
                nomeMunicipio: enderecoEdit.codigoBairro.codigoMunicipio.nome,
                codigoUf: Number(enderecoEdit.codigoBairro.codigoMunicipio.codigoUf.codigoUF),
                nomeUf: enderecoEdit.codigoBairro.codigoMunicipio.codigoUf.nome,
                nomeRua: enderecoEdit.nomeRua,
                numero: enderecoEdit.numero,
                complemento: enderecoEdit.complemento,
                cep: enderecoEdit.cep,
                codigoPessoa: Number(codigoPessoa)
            }
        }

        return {   
            id: enderecoEdit.id,
            codigoBairro: Number(enderecoEdit.codigoBairro),
            nomeBairro: enderecoEdit.nomeBairro,
            codigoMunicipio: Number(enderecoEdit.codigoMunicipio),
            nomeMunicipio: enderecoEdit.nomeMunicipio,
            nomeUf: enderecoEdit.nomeUf,
            codigoUf: Number(enderecoEdit.codigoUf),
            nomeRua: enderecoEdit.nomeRua,
            numero: enderecoEdit.numero,
            complemento: enderecoEdit.complemento,
            cep: enderecoEdit.cep,
            codigoPessoa: Number(codigoPessoa)
        }
    });

    const snackbar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
        })
    }
    const buscarMunicipio = (codigoEstado) => {
        fetchCity(codigoEstado);
    }
    const buscarBairro = (codigoMunicipio) => {
        fetchNeighborhood(codigoMunicipio);
    }

    const enderecoInput = e => setEndereco({ ...endereco, [e.target.name]: e.target.value })

    const handleSaveAddresses = (e) => {
        e.preventDefault();
        if (validaForm()) {
            setEndereco(prevEndereco => ({ ...prevEndereco, codigoEndereco: crypto.randomUUID().toString() }));
            handleEditAddresses(endereco);
            snackbar("Endereço adicionado com sucesso.", "success");
            clearForm(e);
            localStorage.removeItem('endereco');
            closeModal();
        }
    }

    const openModalUF =(e)=>{
        e.preventDefault();
        showModalUf();
    }

    const openModalMunicipio=(e)=>{
        e.preventDefault();
        showModalMunicipio();
    }

    const openModalBairro=(e)=>{
        e.preventDefault();
        showModalBairro();
    }

    const clearForm = (e) => {
        setEndereco({
            codigoEndereco: 0,
            codigoBairro: 0,
            nomeRua: '',
            numero: '',
            complemento: '',
            cep: '',
            nomeBairro: '',
            nomeMunicipio: '',
            nomeUf: '',
        });
        setState([]);
        setCity([]);
        setNeighborhood([]);
    }

    const validaForm = () => {
        console.log(endereco);

        if(!endereco.nomeRua) return snackbar('Por favor preencha o logradouro', "warning")
        if(!endereco.numero) return snackbar('Por favor preencha o número', "warning")
        if(!endereco.complemento) return snackbar('Por favor preencha o complemento', "warning")
        if(!endereco.cep) return snackbar('Por favor preencha o CEP', "warning")
        if(!endereco.nomeUf || endereco.nomeUf.includes('UF')) return snackbar('Por favor preencha a UF', "warning")
        if(!endereco.nomeMunicipio || endereco.nomeMunicipio.includes('munic')) return snackbar('Por favor preencha o município', "warning")
        if(!endereco.nomeBairro || endereco.nomeUf.includes('bairro')) return snackbar('Por favor preencha o bairro', "warning")

        return true;
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

    const fetchNeighborhood = (codigoMunicipio) => {

        api.get("bairro", { params: { codigoMunicipio: codigoMunicipio } })
            .then((response) => {
                if (response === "") {
                    response = null;
                } else {
                    setNeighborhood(response.data)
                }
            })
            .catch(function (error) {

                snackbar("Não foi possível conectar ao servidor, contate o suporte.", "error");
            })
            .finally(() => { });
    }

    return (
        <div>
            <div className='col-lg-12 m-3 p-3 card card-body'>
                <div className='row'>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="inputLogin" className="form-label">Logradouro</label>
                        <input
                            type="text"
                            id="inputLogradouro"
                            name='nomeRua'
                            className="form-control"
                            placeholder="Digite o logradouro"
                            onChange={enderecoInput}
                            value={endereco.nomeRua}
                        />
                    </div>
                    <div className="form-group col-md-2 mb-3">
                        <label htmlFor="inputLogin" className="form-label">Número</label>
                        <input
                            type="text"
                            id="inputNumero"
                            name='numero'
                            className="form-control"
                            placeholder="Digite o número"
                            onChange={enderecoInput}
                            value={endereco.numero} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label htmlFor="inputLogin" className="form-label">Complemento</label>
                        <input
                            type="text"
                            id="inputComplemento"
                            name='complemento'
                            className="form-control"
                            placeholder="Digite o complemento"
                            onChange={enderecoInput}
                            value={endereco.complemento} />
                    </div>
                    <div className="form-group col-md-3 mb-3">
                        <label htmlFor="inputLogin" className="form-label">CEP</label>
                        <input
                            type="text"
                            id="inputCEP"
                            name='cep'
                            className="form-control"
                            placeholder="Digite o CEP"
                            onChange={enderecoInput}
                            value={endereco.cep} />
                    </div>
                </div>
                <div className='row'>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="inputStatus" className="form-label">UF</label>
                        <div className='d-flex'>
                            <select id="inputUf" className="form-select" name='codigoUf'
                                onClick={() => { 
                                    fetchState(); 
                                    endereco.codigoMunicipio = 0;
                                    endereco.nomeMunicipio='Selecione um município'
                                    endereco.codigoBairro = 0;
                                    endereco.nomeBairro='Selecione um bairro'
                                }}
                                onChange={(e) => {
                                    let nomeUf = e.target.options[e.target.selectedIndex].text;
                                    setNeighborhood([]);
                                    buscarMunicipio(e.target.value);

                                    enderecoInput(e);
                                    setEndereco(prevEndereco => ({ ...prevEndereco, nomeUf: nomeUf }));
                                }}
                            >
                                <option defaultValue value={endereco.codigoUf}>{endereco.nomeUf}</option>
                                {state.map((uf) => {
                                    return <option value={uf.codigoUF} key={uf.codigoUF}>
                                        {uf.nome}
                                    </option>
                                })}
                            </select>
                            <button type="button" className='btn btn-outline-success border-0'
                            onClick={(e) => {
                                localStorage.setItem('endereco', JSON.stringify(endereco));
                                closeModal();
                                openModalUF(e);
                            }}><AddCircleOutlineIcon /></button>
                        </div>

                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="inputMunicipio" className="form-label">Município</label>
                        <div className='d-flex'>
                            <select id="inputMunicipio" className="form-select" name='codigoMunicipio' onChange={(e) => {
                                let nomeMunicipio = e.target.options[e.target.selectedIndex].text;

                                buscarBairro(e.target.value);

                                enderecoInput(e);
                                setEndereco(prevEndereco => ({ ...prevEndereco, nomeMunicipio: nomeMunicipio }));
                            }} >
                                <option defaultValue value={endereco.codigoMunicipio}>{endereco.nomeMunicipio}</option>
                                {city.map((municipio, index) => {
                                    return <option value={municipio.codigoMunicipio} key={index} >{municipio.nome}</option>
                                })}
                            </select>

                            <button className='btn btn-outline-success border-0'
                            onClick={(e)=>{
                                localStorage.setItem('endereco', JSON.stringify(endereco));
                                closeModal();
                                openModalMunicipio(e);
                            }}
                            ><AddCircleOutlineIcon /></button>
                        </div>

                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="inputBairro" className="form-label">Bairro</label>
                        <div className='d-flex'>
                            <select id="inputBairro" className="form-select" name='codigoBairro'  onChange={(e) => {
                                let nomeBairro = e.target.options[e.target.selectedIndex].text;

                                enderecoInput(e);
                                setEndereco(prevEndereco => ({ ...prevEndereco, nomeBairro: nomeBairro }));
                            }}>
                                <option defaultValue value={endereco.codigoBairro}>{endereco.nomeBairro}</option>
                                {neighborhood.map((bairro) => {
                                    return <option value={bairro.codigoBairro} key={bairro.cosigoBairro} >{bairro.nome}</option>
                                })}
                            </select>
                            <button type="button" className='btn btn-outline-success border-0' data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"
                            onClick={(e)=>{
                                localStorage.setItem('endereco', JSON.stringify(endereco));
                                closeModal();
                                openModalBairro(e);
                            }}
                            ><AddCircleOutlineIcon /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                <button className='btn btn-success border-0 p-2 mx-3 mt-2 mb-2 flex-row'
                    onClick={(e) => {
                        handleSaveAddresses(e);
                    }}><AddCircleOutlineIcon /> EDITAR</button>
            </div>
        </div>

        
    );
}
export default FormEditAddress;