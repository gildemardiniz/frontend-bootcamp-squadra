import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Bar = ({ handleSearch }) => {

    const navigate = useNavigate();
    const [search, setSearch] = useState();

    const searchpeaple = (e) => {
        e.preventDefault();
        handleSearch(search);
    }

    function handleClick() {
        navigate("cadastro");
      }

    return (
        <div id='teste' className="container mb-4 mt-1">
            <div className="row justify-content-center m-0 card card-body">
                <div className='d-flex col-lg-12 mx-1 p-3 '>
                    <div className="container">
                        <button type="button" className="btn btn-dark " onClick={handleClick}> <AddCircleOutlineIcon size={35} /> Adicionar Pessoa</button>
                    </div>
                    <form
                        className="d-flex col-4"
                        role="search"
                        onSubmit={(e) => { searchpeaple(e) }}
                    >
                        <input
                            className="form-control me-1"
                            type="search" placeholder="Busca por nome"
                            aria-label="Search"
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <button
                            className="btn btn-dark"
                            type="submit"

                        >
                            <SearchIcon size={35} />
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}
export default Bar;