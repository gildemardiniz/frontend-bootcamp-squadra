import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import api from '../service/api';
import CardAddress from '../components/CardAddress';

const Visualizar = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const [person, setPerson] = useState([]);

    const snackbar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
        })
    }
    useEffect(() => {
        fetchById(id)
    }, [])

    const fetchById = (params) => {
        api.get("pessoa", { params: { codigoPessoa: params } })
            .then((response) => {
                if (response.data === "" || response.data === "undefined") {
                    setPerson(null);
                }
                setPerson(response.data);
            })
            .catch(function (error) {
                console.log('problema em fetchForPerson')
                snackbar("Não foi possível conectar ao servidor, contate o suporte.", "error");
            }).finally(() => { });
    }

    return (

        <div className="container">
            <div className="col-md-12">
                <h4 className="my-5">:: Visualizar</h4>
            </div>
            <div className="row justify-content-center m-0">
                <div className='card card-body'>
                    <div className="row">
                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="inputName" className="form-label">Nome</label>
                            <input
                                disabled
                                value={person.nome || ''}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-md-6 mb-3">
                            <label htmlFor="inputLastName" className="form-label">Sobrenome</label>
                            <input
                                disabled
                                value={person.sobrenome || ''}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group col-md-4 mb-3">
                            <label htmlFor="inputAge" className="form-label">Idade</label>
                            <input
                                disabled
                                value={person.idade || ''}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-md-4 mb-3">
                            <label htmlFor="inputStatus" className="form-label">Status</label>
                            <input
                                disabled
                                value={person.status === 1 ? 'ATIVO' : 'INATIVO'}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-md-4 mb-3">
                            <label htmlFor="inputLogin" className="form-label">Login</label>
                            <input
                                disabled
                                value={person.login || ''}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-group col-md-4 ml-3">
                        <label htmlFor="inputLogin" className="form-label">Endereços:</label>
                    </div>
                    <div className='row mt-2'>
                        {person.enderecos?.map((endereco, index) => {
                            return <CardAddress key={index} endereco={endereco}/>
                        })}
                    </div>
                </div>
            </div>


            <div className="my-3">
                <button type="button" className="btn btn-outline-dark mx-2 " onClick={() => {
                    navigate(`/`)
                }}><ArrowBackIcon /> VOLTAR
                </button>
                <button type="button" className='btn btn-dark mx-0'
                    onClick={() => {
                        navigate(`/editar/${person.codigoPessoa}`)
                    }}><EditIcon /> EDITAR
                </button>


            </div>
        </div>

    )

}
export default Visualizar;