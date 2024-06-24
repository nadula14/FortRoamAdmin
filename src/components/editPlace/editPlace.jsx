import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../addPlace/addPlace.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

function EditPlace() {
    const location = useLocation();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [place, setPlace] = useState(location.state.place);
    const [imagePreview, setImagePreview] = useState(location.state.place.imageURL);

    useEffect(() => {
        setPlace(location.state.place);
    }, [location.state.place]);

    function handleChange(event) {
        const { name, value } = event.target;
        setPlace(prevPlace => {
            return { ...prevPlace, [name]: value };
        });
    }

    function submitProduct(event) {
        event.preventDefault();

        const { title, description, street, subtype, type, latitude, longitude } = place;
        if (!title || !street || !subtype || !type || !latitude || !longitude) {
            alert("Please fill required fields and add an image.");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('street', street);
        formData.append('subtype', subtype);
        formData.append('type', type);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        if (file) {
            formData.append('file', file);
        }

        axios
            .put(`http://localhost:3010/place/${place._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((result) => {
                console.log(result);
                alert("Place successfully updated!");
                navigate('/places');
            })
            .catch((error) => {
                console.error(error);
                alert("Place update failed!");
            });
    }

    function handleDelete(event) {
        event.preventDefault();
        axios.delete(`http://localhost:3010/place/${place._id}`)
        .then((result) => {
            console.log(result);
            alert("Place successfully deleted!");
            navigate('/places');
        })
        .catch((error) => {
            console.error(error);
            alert("Place delete failed!");
        });
    }

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPlace(prevPlace => ({ ...prevPlace, image: selectedFile.name }));
            setImagePreview(URL.createObjectURL(selectedFile));
        }
    };

    return (
        <div className="edit-section">
            <div className='add-place'>
                <div className='fileInputbox'>
                    <div>
                        <label htmlFor='fileInput' className='addimage-text'>
                            <FontAwesomeIcon icon={faImage} className='writeIcon' />
                            <h4>Edit Image</h4>
                        </label>
                    </div>

                    {place.image && (
                        <img className='writeImg' src={imagePreview} alt='' />
                    )}
                    <input type='file' id='fileInput' style={{ display: 'none' }} onChange={handleFileChange} />

                </div>
                <div className='form-box'>
                    <form>
                    <label htmlFor="street">Place Name*</label>

                        <input onChange={handleChange} name="title" value={place.title} placeholder="Place Name" className="box" />
                        <div className='form-row'>
                        <label htmlFor="street">Type*</label>

                            <select onChange={handleChange} name="type" value={place.type} className='box1'>
                                <option className='dropdownOption' value=''>Select Type</option>
                                <option value="historical">Historical</option>
                                <option value="commercial">Commercial</option>
                                <option value="activities">Activity</option>
                                <option value="services">Service</option>
                            </select>
                            <label htmlFor="street">Subtype*</label>

                            <select onChange={handleChange} name="subtype" value={place.subtype} className='box1'>
                                <option className='dropdownOption' value=''>Select Subtype</option>
                                <option value="museum">Museum</option>
                                <option value="bastion">Bastion</option>
                                <option value="other">Other</option>
                                <option value="hotel">Hotel</option>
                                <option value="shop">Shop</option>
                                <option value="restuarant">Restuarant</option>
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

<input onChange={handleChange} name="street" value={place.street} placeholder="Street" className="box" />
                        </div>

                        <div className='form-row'>
                        <label htmlFor="street">Latitude*</label>

                            <input onChange={handleChange} name="latitude" value={place.latitude} placeholder="Latitude" className="box2" />
                            <label htmlFor="street">Longitude*</label>

                            <input onChange={handleChange} name="longitude" value={place.longitude} placeholder="Longitude" className="box2" />
                        </div>
                        <label htmlFor="street">Description</label>

                        <textarea onChange={handleChange} name="description" value={place.description} id="" cols="30" rows="10" className="box"></textarea>
                    </form>
                </div>
            </div>
            <button onClick={handleDelete} className="btn">
                Delete Place
            </button>
            <button onClick={submitProduct} type="submit" className="btn">
                Update Place
            </button>
        </div>
    );
}

export default EditPlace;
