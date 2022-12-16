import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import storage from '../providers/firebaseConfig';
import Swal from "sweetalert2";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL 
    } from "firebase/storage";


const AddContact = ({ onSave }) => {
    let initialState = {
        name: '',
        phone:'',
        type:'Personel',
        isWhatsApp:0,
        profile:''
    };
    const navigate = useNavigate();
    const [state, setState] = useState(initialState);
    const getContacts = JSON.parse(localStorage.getItem("user_contacts"));
    let all_contacts = getContacts !=null ? getContacts : []
    const [contacts, setContacts] = useState(all_contacts);
    const [percent,setPercent]= useState(0);
    const [uploading,setUploading] =useState(false)
    const handleChange = (e)=>{
        let form = e.target;
        let value = form.type === 'checkbox' ? form.checked : form.value;
        setState({...state , [form.name]: value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(state)
        addContact(state);
    }

    const handleFileChange = async (e)=>{
        let file =e.target.files[0]
        if (!file) {
            alert("Please choose a file first!")
        }
        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
        setUploading(true);
        uploadTask.on("state_changed",(snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setPercent(percent);
        },(err) => console.log(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url);
                setState({...state , "profile": url})
                setUploading(false)
            });
            }
        );
    }

     // Add Contact
     const addContact = (Contact) => {
        const id = uuidv4();
        const newContact = { id, ...Contact }
        setContacts([...contacts, newContact]);
        localStorage.setItem("user_contacts", JSON.stringify([...contacts, newContact]));
        Swal.fire({
            icon: 'success',
            text: 'You have successfully added a new Contact!'
        })
        //setState(initialState)
        navigate("/");
    }
    

    return (
    <div className="container">
        <h3> Add New Contact </h3>
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Name</label>
                <input type="text" name="name" placeholder="Name" value={state.name} onChange={(e)=>handleChange(e)}  />
            </div>
            <div className="form-control">
                <label>Phone</label>
                <input type="string" name="phone"  placeholder="Phone" value={state.phone} onChange={(e)=>handleChange(e)} />
            </div>
            <div className="form-control">
                <label>Type</label>
                <select name="type" value={state.type} onChange={(e)=>handleChange(e)}>
                    <option defaultValue>Personel</option>
                    <option>Office</option>
                </select>
            </div>
            <div className="form-control">
                <input type="checkbox" name="isWhatsApp" value={state.isWhatsApp} onChange={(e)=>handleChange(e)}  />
                <label htmlFor="isWhatsApp"> Is this your Whats App number too</label>
            </div>
            <div className="form-control">
                <label>Profile Picture</label>
                { state.profile !=="" && <img src={state.profile} alt="profile-img" height="60" widt="60"/>  }
                <input type="file" id="profile" name="profile" onChange={(e)=>handleFileChange(e)} />
                { uploading &&  <b style={{color:"green"}}> Uploading imagw please wait ...  {  percent }% </b> }
            </div>
            <input type="submit" disabled={uploading ? true :false} className="btn btn-block" value="Create Contact" />
        </form>
    </div>
    )
}

export default AddContact
