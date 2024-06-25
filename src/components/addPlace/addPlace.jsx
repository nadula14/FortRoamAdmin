import React, { useState } from 'react';
import axios from 'axios';
import './addPlace.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import imageCompression from 'browser-image-compression';

function AddPlace() {
    const [file, setFile] = useState(null);
    const [place, setPlace] = useState({
        title: '',
        description: '',
        street: '',
        image: '',
        subtype: '',
        type: '',
        latitude: '',
        longitude: ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setPlace(prevPlace => {
            return { ...prevPlace, [name]: value };
        });
    }

    function submitProduct(event) {
        event.preventDefault();
    
        const { title, description, street, image, subtype, type, latitude, longitude } = place;
    
        if (!title || !street || !image || !subtype || !type || !latitude || !longitude) {
            alert("Please fill in all fields and add an image.");
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('street', street);
        formData.append('subtype', subtype);
        formData.append('type', type);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
    
        axios.post('https://fortroam-server.onrender.com/place', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((result) => {
            console.log(result);
            setPlace({
                title: '',
                description: '',
                street: '',
                image: '',
                subtype: '',
                type: '',
                latitude: '',
                longitude: ''
            });
            setFile(null);
            document.getElementById('fileInput').value = null;
            alert("Place successfully added!")
        })
        .catch((error) => {
            console.error(error);
            alert("Place adding failed!")
        });
    }
    

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPlace(prevPlace => ({ ...prevPlace, image: selectedFile.name }));
        }
    };
    

    return (
        <div className='edit-section'>
        <div className='add-place'>
            <div className='fileInputbox'>
                <div>
                    <label htmlFor='fileInput' className='addimage-text'>
                        <FontAwesomeIcon icon={faImage} className='writeIcon' />
                        <h4>Add Image*</h4>
                    </label>
                </div>

                {file && (
                    <img className='writeImg' src={URL.createObjectURL(file)} alt='' />
                )}
                <input type='file' id='fileInput' style={{ display: 'none' }} onChange={handleFileChange} />

            </div>
            <div className='form-box'>
                <form>
                <div className='form-row'>
                    <label htmlFor="title">Place Name*</label>
                    <input onChange={handleChange} name="title" value={place.title} className="box" />
                </div>

                    <div className='form-row'>
                        <label htmlFor="title">Type*</label>
                        <select onChange={handleChange} name="type" value={place.type} className='box1'>
                            <option className='dropdownOption' value=''>Select Type</option>
                            <option value="historical">Historical</option>
                            <option value="commercial">Commercial</option>
                            <option value="activities">Activity</option>
                            <option value="services">Service</option>
                        </select>
                        <label htmlFor="title">Subtype*</label>
                        <select onChange={handleChange} name="subtype" value={place.subtype} className='box1'>
                            <option className='dropdownOption' value=''>Select Subtype</option>
                            <option value="museum">Museum</option>
                            <option value="bastion">Bastion</option>
                            <option value="other">Other</option>
                            <option value="hotel">Hotel</option>
                            <option value="shop">Shop</option>
                            <option value="restaurant">Restaurant</option>
                            <option value="bank">Bank</option>
                            <option value="school">School</option>
                            <option value="taxi">Taxi</option>
                            <option value="post">Post</option>
                            <option value="parking">Parking</option>
                            <option value="activity">Activity</option>
                        </select>
                    </div>
                    <div className='form-row'> 
                        <label htmlFor="street">Street*</label>

                        <input onChange={handleChange} name="street" value={place.street}  className="box" />
                        </div>
                    <div className='form-row'>
                    <label htmlFor="title">Latitude*</label>
                        <input onChange={handleChange} name="latitude" value={place.latitude}  className="box2" />
                        <label htmlFor="title">Longitude*</label>
                        <input onChange={handleChange} name="longitude" value={place.longitude}  className="box2" />
                    </div>
                    <label htmlFor="description">Description</label>
                    <textarea onChange={handleChange} name="description" value={place.description} id="" cols="30" rows="10" className="box"
                        ></textarea>
                </form>
            </div>
        </div>
        <button onClick={submitProduct} type="submit" className="btn">
                Add Place
            </button>
        </div>

    )
}

export default AddPlace;
