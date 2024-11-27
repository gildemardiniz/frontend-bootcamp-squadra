import EditSharpIcon from '@mui/icons-material/EditSharp';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import React from "react";
import { useNavigate } from "react-router-dom";

const TablePerson = ({ person, handledisable }) => {

    const navigate = useNavigate();

    const onClickDisable = (codigoPessoa) => {
        handledisable(codigoPessoa);
    }

    return (
        <div className="container">
            <div className="p-3 card card-body">
                <table className="table p-3">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Sobrenome</th>
                            <th scope="col">Status</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>

                    <tbody>{person != null
                        ? person.map((pessoa,index) =>
                            <tr key={index}>
                                <th scope="row" key={pessoa.codigoPessoa}>{pessoa.codigoPessoa}</th>
                                <td key={pessoa.nome}>{pessoa.nome}</td>
                                <td key={pessoa.sobrenome}>{pessoa.sobrenome}</td>
                                <td key={pessoa.status}>{pessoa.status === 1 ? "Ativo" : "Inativo"} </td>
                                <td>
                                    <button type='button' className="btn p-0 m-1" onClick={() => {
                                        navigate(`/${pessoa.codigoPessoa}`)

                                    }
                                    }>
                                        <VisibilitySharpIcon size={35} />
                                    </button>

                                    <button type='button' className="btn p-0 m-1" onClick={() => {
                                        navigate(`/editar/${pessoa.codigoPessoa}`);
                                    }}>
                                        <EditSharpIcon size={35} />
                                    </button>

                                    {pessoa.status === 1
                                        ? <button
                                            className="btn p-0 m-1 btn-disable"
                                            onClick={() => { onClickDisable(pessoa.codigoPessoa, pessoa.nome) }}
                                        ><HighlightOffIcon size={35} />
                                        </button>
                                        : <button
                                            disabled
                                            className="btn p-0 m-1 btn-disable border-0"
                                            onClick={() => { onClickDisable(pessoa.codigoPessoa, pessoa.nome) }}
                                        ><HighlightOffIcon size={35} />
                                        </button>}
                                </td>
                            </tr>
                        )
                        : <p>Não exitem dados para esta tabela</p>
                    }
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default TablePerson;