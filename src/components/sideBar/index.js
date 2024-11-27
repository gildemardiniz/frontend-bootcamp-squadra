
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from "react-router-dom";



const Sidebar = () => {

  return (

    <div className="container-fluid col-2">
      <div className="row flex-nowrap">
        <div className="bg-light min-vh-100 d-flex flex-column">
          <div className="p-2 ">
            <ul className="nav nav-pills flex-column mt-4">
              <li className="nav-item">
                <Link className=" d-flex text-dark text-decoration-none align-items-center fs-6" aria-current="page" to="/">
                  <PeopleAltIcon className="m-1" /><span className=" d-none d-sm-inline ">Pessoas</span>
                </Link>
              </li>
              <li>
                <Link className=" d-flex text-dark text-decoration-none align-items-center fs-6" to="cadastro">
                  <PersonAddIcon className="m-1" />
                  <span className=" d-none d-sm-inline">Cadastro</span>
                </Link>
              </li>
            </ul>
            
          </div>
        </div>
      </div>
    </div>

  );
}
export default Sidebar;