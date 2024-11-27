
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import CardAddress from '../components/CardAddress';
import { useState } from 'react';
import FormAddress from '../components/FormAddress';
import { useNavigate } from "react-router-dom";
import FormUF from '../components/FormUF';
import { Modal } from 'react-bootstrap';
import FormMunicipio from '../components/FormMunicipio';
import FormBairro from '../components/FormBairro';
import api from '../service/api';

const Cadastro = () => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [addresses, setAddresses] = useState([]);

    const [pessoa, setPessoa] = useState(() => {
        return {
            nome: '',
            sobrenome: '',
            idade: 0,
            login: '',
            senha: '',
            status: 1,
            enderecos: []
        }
    });

    const pessoaInput = e =>
        setPessoa({ ...pessoa, [e.target.name]: e.target.value }
        )

    const [isModalUFOpen, setModalUfOpen] = useState(false);
    const [isModalAddressOpen, setModalAddressOpen] = useState(false);
    const [isModalMunicipioOpen, setModalMunicipioOpen] = useState(false);
    const [isModalBairroOpen, setModalBairroOpen] = useState(false);

    const snackbar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
        });
    };

    const showModalUf = () => {
        setModalUfOpen(true);
    };
    const hideModalUf = () => {
        setModalUfOpen(false);
    };
    const showModalAddress = () => {
        setModalAddressOpen(true);
    };
    const hideModalAddress = () => {
        setModalAddressOpen(false);
    };
    const showModalMunicipio = () => {
        setModalMunicipioOpen(true);
    };
    const hideModalMunicipio = () => {
        setModalMunicipioOpen(false);
    };
    const showModalBairro = () => {
        setModalBairroOpen(true);
    };
    const hideModalBairro = () => {
        setModalBairroOpen(false);
    };

    const handleCadastrar = () => {
        if (validaForm) {
            addAddressPerson();
            addPerson();
        }

    }

    const addPerson = () => {
        api.post("pessoa", pessoa)
            .then((response) => {
                snackbar("Pessoa cadastrada com sucesso", "success");
                navigate('/')
            })
            .catch(function (error) {
                snackbar("Não foi possível conectar ao servidor, contate o suporte.", "error");
            }).finally(() => { });
    }

    const handleAddresses = (address) => {
        setAddresses(addresses => [...addresses, address])

    }
    const addAddressPerson = () => {
        pessoa.enderecos = addresses;
    }
    const removeEndereco = (codigoEndereco) => {
        setAddresses(addresses.filter((addresses) => addresses.codigoEndereco !== codigoEndereco));
        snackbar("Endereço deletado com sucesso.", "success");
    }
    const validaForm = () => {
        if (!pessoa) return snackbar('Por favor preencha as informações da pessoa', "warning")
        if (addresses.length === 0) return snackbar('Por favor adicione ao menos um endereço para pessoa', "warning")
        return true;
    }

    return (
        <div id='contact' className="container">
            <div className="row m-0">
                <div className="col-md-12">
                    <h4 className="my-3 mx-3">:: Cadastro</h4>
                </div>
                <form className="my-3" onSubmit={(e) => { }}>
                    <div className='col-lg-12 m-3 p-3 card card-body'>
                        <div className="row">
                            <div className="form-group col-md-6 mb-3">
                                <label htmlFor="inputName" className="form-label">Nome</label>
                                <input
                                    type="text"
                                    id="inputName"
                                    value={pessoa.nome || ''}
                                    name='nome'
                                    className="form-control"
                                    placeholder="Digite o nome"
                                    onChange={pessoaInput} />
                            </div>
                            <div className="form-group col-md-6 mb-3">
                                <label htmlFor="inputLastName" className="form-label">Sobrenome</label>
                                <input
                                    type="text"
                                    id="inputLastName"
                                    value={pessoa.sobrenome || ''}
                                    name='sobrenome'
                                    className="form-control"
                                    placeholder="Digite o sobrenome"
                                    onChange={pessoaInput} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-md-6 mb-3">
                                <label htmlFor="inputAge" className="form-label">Idade</label>
                                <input
                                    type="number"
                                    min = '1'
                                    id="inputAge"
                                    value={pessoa.idade || ''}
                                    className="form-control"
                                    name='idade'
                                    placeholder="Digite a idade"
                                    onChange={pessoaInput} />
                            </div>
                            <div className="form-group col-md-6 mb-3">
                                <label htmlFor="inputStatus" className="form-label">Status</label>
                                <select
                                    value={pessoa.status || 0}
                                    id="inputStatus"
                                    className="form-select"
                                    onChange={pessoaInput}
                                    name='status'
                                >
                                    <option value={1}>Ativo</option>
                                    <option value={2}>Inativo</option>
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-md-6 mb-3">
                                <label htmlFor="inputLogin" className="form-label">Login</label>
                                <input
                                    value={pessoa.login || ''}
                                    type="text"
                                    id="inputLogin"
                                    className="form-control"
                                    name='login'
                                    placeholder="Digite o login"
                                    onChange={pessoaInput} />
                            </div>
                            <div className="form-group col-md-6 mb-3">
                                <label htmlFor="inputPassword" className="form-label">Senha</label>
                                <input
                                    value={pessoa.senha || ''}
                                    type="password"
                                    id="inputPassword"
                                    name='senha'
                                    className="form-control"
                                    placeholder="Digite o Senha"
                                    onChange={pessoaInput} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            id="novoEndereco"
                            className="btn btn-light border-0 p-2 mx-3 mb-2"
                            onClick={(e) => {
                                e.preventDefault();
                                showModalAddress();
                                if (localStorage.getItem('endereco')) localStorage.removeItem('endereco');
                            }}>
                            <AddCircleOutlineIcon /> NOVO ENDEREÇO
                        </button>
                    </div>
                    <Modal className="modal-xl" show={isModalAddressOpen} onHide={hideModalAddress}>
                        <Modal.Header closeButton>CADASTRAR ENDEREÇO</Modal.Header>
                        <Modal.Body>
                            <FormAddress
                                handleAddresses={handleAddresses}
                                closeModal={hideModalAddress}
                                showModalUf={showModalUf}
                                showModalMunicipio={showModalMunicipio}
                                showModalBairro={showModalBairro}
                            />
                        </Modal.Body>
                    </Modal>

                    <Modal className="modal-lg" show={isModalUFOpen} onHide={() => { hideModalUf(); showModalAddress(); }}>
                        <Modal.Header closeButton>
                            CADASTRAR UF
                        </Modal.Header>
                        <Modal.Body>
                            <FormUF hideModal={hideModalUf} backModalAddress={showModalAddress} />
                        </Modal.Body>
                    </Modal>

                    <Modal className="modal-lg" show={isModalMunicipioOpen} onHide={() => { hideModalMunicipio(); showModalAddress(); }}>
                        <Modal.Header closeButton>
                            CADASTRAR MUNICÍPIO
                        </Modal.Header>
                        <Modal.Body>
                            <FormMunicipio hideModal={hideModalMunicipio} backModalAddress={showModalAddress} />
                        </Modal.Body>
                    </Modal>

                    <Modal className="modal-lg" show={isModalBairroOpen} onHide={() => { hideModalBairro(); showModalAddress(); }}>
                        <Modal.Header closeButton>
                            CADASTRAR BAIRRO
                        </Modal.Header>
                        <Modal.Body>
                            <FormBairro hideModal={hideModalBairro} backModalAddress={showModalAddress} />
                        </Modal.Body>
                    </Modal>
                    
                    <div className="form-group col-md-4 ml-3 mx-4">
                        <label htmlFor="inputLogin" className="form-label">Endereços:</label>
                    </div>
                    <div className='row mt-2'>
                        {addresses !== ''
                            ? addresses.map((address) => {
                                return <CardAddress endereco={address} removeEndereco={removeEndereco} isDeleteable={true} />
                            })
                            : <div />
                        }
                    </div>

                    <div className='px-3 my-3'>
                        <button type="button" className="btn btn-dark mx-1" onClick={handleCadastrar}> <AddCircleOutlineIcon /> CADASTRAR</button>
                        <button className="btn btn-outline-dark mx-1"> <ClearSharpIcon /> LIMPAR</button>
                    </div>
                </form>
            </div>
        </div>

    );
}
export default Cadastro;