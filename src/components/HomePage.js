import Header from './Header';
import Contacts from './Contacts';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const HomePage = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
   
    useEffect(() => {
        const getContacts = JSON.parse(localStorage.getItem("user_contacts"));
        if (getContacts === null) {
            setContacts([])
        } else {
            setContacts(getContacts);
        }
    }, [])


    // Delete Contact
    const deleteContact = (id) => {
        Swal.fire({
            title: "Are you sure ?",
            text: "Once deleted, you will not be able to recover !",
            icon: "warning",
            showCancelButton: true,
          })
         .then((result) => {
            if (result.isConfirmed) {
                const deleteContact = contacts.filter((Contact) => Contact.id !== id);
                setContacts(deleteContact);
                localStorage.setItem("user_contacts", JSON.stringify(deleteContact));
            } else {
                console.log("Cancelled action")
            }
       });
    }

    // Edit Contact
    const editContact = (id) => {
        navigate(`/edit-contact/${id}`)
    }
   
    return (
        <>
        <div className="container">
            <Header showForm={() => navigate("/add-contact")}  />
            {
                contacts.length > 0 ?
                (
                <>
                <h3>Contact List: {contacts.length}</h3>
                <Contacts contacts={contacts} onDelete={deleteContact} onEdit={editContact} />
                </>
                )
                :  
                ('No Contacts Found !')
            }
        </div>
        </>
    )
}

export default HomePage;