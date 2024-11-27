import { useEffect, useState } from "react";
import Bar from "../components/bar";
import TablePerson from "../components/TablePerson";
import api from "../service/api";
import { useSnackbar } from 'notistack';

const Home = () => {

    const [person, setPerson] = useState([]);

    const { enqueueSnackbar } = useSnackbar();

    const snackbar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
        })
    }

    useEffect(() => {
        fetchPerson();
    }, [])

    const fetchPerson = () => {
        api.get("pessoa")
            .then((response) => {
                if(response.data === " "){
                    setPerson(null);
                }
                setPerson(response.data)
            })
            .catch(function (error) {
                snackbar("Não foi possível conectar ao servidor, contate o suporte.", "error");
            })
            .finally(() => { });
    }

    const disablePerson = (codigoPessoa) => {
        api.delete("pessoa", { params: { codigoPessoa: codigoPessoa } })
            .then((response) => {
                console.log('response', response)
                snackbar(response.data.mensagem, "success");
                fetchPerson();
            })
            .catch(function (error) {
                console.log('error', error)
                snackbar("Não foi possível conectar ao servidor, contate o suporte.", "error");
            }).finally(() => { });
    }

    const fetchForPerson = (params) => {
        api.get("pessoa", { params: { nome: params } })
            .then((response) => {
                setPerson(
                    response?.data
                        ? null : response.data
                )
            })
            .catch(function (error) {
                console.log('problema em fetchForPerson')
                snackbar("Não foi possível conectar ao servidor, contate o suporte.", "error");
            }).finally(() => { });
    }

    const search = (e) => {
        if (e === "") {
            fetchPerson();
        } else {
            fetchForPerson(e);
        }
    }

    return (
        <div>
            <Bar handleSearch={search} />
            <TablePerson person={person ? person.sort((a,b)=>(a.nome < b.nome) ? -1 : (a.nome > b.nome) ? 1 : 0) : null} handledisable={disablePerson} />
        </div>
    )

}
export default Home;