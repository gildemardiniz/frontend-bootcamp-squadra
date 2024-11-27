import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const CardAddress = ({ endereco, removeEndereco, isEditable, isDeleteable, editEndereco }) => {

    const handleDelete = (e) => {
        e.preventDefault();
        removeEndereco(endereco.codigoEndereco);
    }

    const handleEdit = (e)=>{
        e.preventDefault();
        editEndereco(endereco);
    }

    return (
        <div className='col-md-4'>
            <div className='mx-3 mb-2'>
                <div className='card card-body flex-row justify-content-between'>
                    <div className='align-items-center p-1'>
                        <h6>{endereco.nomeRua.toUpperCase()},
                            {endereco.numero.toUpperCase()},
                            {endereco.complemento.toUpperCase()}
                        </h6>
                        <h6>{endereco.nomeBairro  ? endereco.nomeBairro.toUpperCase() : endereco.codigoBairro.nome.toUpperCase()},
                            {endereco.nomeMunicipio ? endereco.nomeMunicipio.toUpperCase() : endereco.codigoBairro.codigoMunicipio.nome.toUpperCase()},
                            {endereco.nomeUf ? endereco.nomeUf.toUpperCase() : endereco.codigoBairro.codigoMunicipio.codigoUf.nome.toUpperCase()},
                            {endereco.cep}</h6>
                    </div>
                    <div className='row m-1 d-flex'>
                        {isEditable ? <button className='btn btn-outline-primary p-0 mt-1 border-0' onClick={(e)=>{handleEdit(e)}}><EditIcon className='m-1' /></button> : null}
                        {isDeleteable ? <button className='btn btn-outline-danger p-0 mt-1 border-0' onClick={(e) => { handleDelete(e) }}><DeleteIcon className='m-1' /></button> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardAddress;