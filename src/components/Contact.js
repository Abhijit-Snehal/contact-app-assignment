import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import "../index.css"

const Contact = ({ contact, onDelete, onEdit }) => {
    return (
        <div className='contact-list'>
            <div className='row'>
                <div className='col-lg-8'>
                    <p className="contactName">
                        <span className="textBold">Contact Name:</span> {contact.name}
                    </p>
                </div>
                <div className='col-lg-4'>
                    <div className='row'>
                    <p onClick={() => onEdit(contact.id)} className='col-lg-6 editIcon'><FaPencilAlt  />&nbsp; Edit</p>
                    <p onClick={() => onDelete(contact.id)} className='col-lg-6 delIcon'><FaTimes   />&nbsp; Delete</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
