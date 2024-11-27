import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from "react";
import api from '../service/api';
import CardAddress from '../components/CardAddress';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import FormAddress from '../components/FormAddress';
import FormMunicipio from '../components/FormMunicipio';
import FormBairro from '../components/FormBairro';
import FormUF from '../components/FormUF';
import FormEditAddress from '../FormEditAddress';

const Editar = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const [pessoa, setPessoa] = useState(() => {
        return {
            codigoPessoa: 0,
            nome: '',
            sobrenome: '',
            idade: 0,
            login: '',
            senha: '',
            status: 1,
            enderecos: []
        }
    });

    const [enderecoEdit, setEnderecoEdit] = useState();

    const pessoaInput = e =>
        setPessoa({ ...pessoa, [e.target.name]: e.target.value }
        )

    const [isModalUFOpen, setModalUfOpen] = useState(false);
    const [isModalAddressOpen, setModalAddressOpen] = useState(false);
    const [isModalEditAddressOpen, setModalEditAddressOpen] = useState(false);
    const [isModalMunicipioOpen, setModalMunicipioOpen] = useState(false);
    const [isModalBairroOpen, setModalBairroOpen] = useState(false);

    const showModalUf = () => {
        setModalUfOpen(true);
    };
    const hideModalUf = () => {
        setModalUfOpen(false);
    };
    const showModalAddress = () => {
        setModalAddressOpen(true);
    };
    const showModalEditAddress = () => {
        setModalEditAddressOpen(true);
    };
    const hideModalAddress = () => {
        setModalAddressOpen(false);
    };
    const hideModalEditAddress = () => {
        setModalEditAddressOpen(false);
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

    const handleAddresses = (address) => {
        console.log('pessoa.enderecos', pessoa.enderecos)
        pessoa.enderecos.push(address)
        console.log('adicionando endereco: ', address)
    }


    const handleEditAddresses = (addressEdit)=>{
        let addresses = (pessoa.enderecos.filter((endereco) => addressEdit.id ? endereco.id !== addressEdit.id : endereco.codigoEndereco !== addressEdit.codigoEndereco));
        addresses.push(addressEdit)
        pessoa.enderecos = addresses;
    }

    const editAddress=(endereco)=>{
        setEnderecoEdit(endereco)
        showModalEditAddress();
    }

    const snackbar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
        })
    }
    useEffect(() => {
        fetchDetailsPeople(id)
    }, [])
    
    const fetchDetailsPeople = (params) => {
        api.get("pessoa", { params: { codigoPessoa: params } })
            .then((response) => {
                if (response?.data) {
                    setPessoa(null);
                }
                setPessoa(response.data);
            })
            .catch(function (error) {

                snackbar("Não foi possível conectar ao servidor, contate o suporte.", "error");
            }).finally(() => { });
    }

    const modifyAddress = () => {
        let pessoaId = pessoa.codigoPessoa;
        let enderecos = pessoa.enderecos.map((endereco)=>{
            if(endereco.codigoEndereco){
                return{
                    codigoEndereco: endereco.codigoEndereco,
                    codigoBairro: endereco.codigoBairro.codigoBairro,
                    nomeRua: endereco.nomeRua,
                    numero: endereco.numero,
                    complemento: endereco.complemento,
                    cep: endereco.cep,
                    codigoPessoa: pessoaId
                }
            }

            return{
                codigoBairro: Number(endereco.codigoBairro),
                nomeRua: endereco.nomeRua,
                numero: endereco.numero,
                complemento: endereco.complemento,
                cep: endereco.cep,
                codigoPessoa: pessoaId
            }
            
        })
        pessoa.enderecos = enderecos;
    }

    const handleSave = () => {
        modifyAddress();
        updatePerson(); 
    }

    const updatePerson = () => {
        api.put("pessoa", pessoa)
            .then((response) => {
                snackbar("Pessoa atualizada com sucesso", "success");
                navigate('/')
            })
            .catch(function (error) {
                snackbar("Não foi possível conectar ao servidor, contate o suporte.", "error");
            }).finally(() => { });
    }


    const handleDeleteAddresses = (codigoEndereco) => {
        let enderecos = pessoa.enderecos.filter((endereco) => endereco.codigoEndereco !== codigoEndereco)
        setPessoa(prevPessoa => ({ ...prevPessoa, enderecos: enderecos }));
        snackbar("Endereço deletado com sucesso.", "success");
    }

    return (
        <div className="container">
            <div className="col-md-12">
                <h4 className="mx-3 my-5">:: Editar</h4>
            </div>
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

                            type="text"
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

            <Modal className="modal-xl" show={isModalEditAddressOpen} onHide={hideModalEditAddress}>
                <Modal.Header closeButton>EDITAR ENDEREÇO</Modal.Header>
                <Modal.Body>
                    <FormEditAddress
                        handleEditAddresses={handleEditAddresses}
                        closeModal={hideModalEditAddress}
                        showModalUf={showModalUf}
                        showModalMunicipio={showModalMunicipio}
                        showModalBairro={showModalBairro}
                        enderecoEdit={enderecoEdit}
                        codigoPessoa={pessoa ? pessoa.codigoPessoa : 0}
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

            <div>
                <div className="form-group col-md-4 mx-3 mb-3">
                    <label className="form-label">Endereços:</label>
                </div>

                <div className='row mt-2'>
                    {pessoa.enderecos && pessoa.enderecos.length > 0 ? pessoa.enderecos?.map((endereco) => {
                        return <CardAddress 
                            key={endereco.codigoEndereco} 
                            endereco={endereco} 
                            isDeleteable={true} 
                            isEditable={true} 
                            removeEndereco={handleDeleteAddresses}
                            editEndereco={editAddress}
                            />
                    }) : <div className='col-lg-12 mx-3 my-3 p-3 card card-body'>Não existem endereços cadastrados</div>}
                </div>
            </div>

            <div className="mx-2">
                <button type="button" className="btn btn-outline-dark mx-2 " onClick={() => {
                    navigate(`/`)
                }}><ArrowBackIcon /> VOLTAR
                </button>

                <button type="button" className='btn btn-dark mx-0'
                    onClick={handleSave}><AddCircleOutlineIcon /> SALVAR
                </button>


            </div>
        </div>
    )

}
export default Editar;