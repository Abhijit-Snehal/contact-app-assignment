import Contact from './Contact';
import "../index.css"

const Contacts = ({ contacts, onDelete, onEdit }) => {
    return (
        <>
            {contacts.map((contact) => (<Contact key={contact.id} contact={contact} onDelete={onDelete} onEdit={onEdit} />))}
        </>
    )
}

export default Contacts;
