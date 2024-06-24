import React from 'react';
import './listItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const PlaceItem = (props) => {
    
    function handleEdit(){
        props.onEdit(props.place);
    }

    return (
        <div className='listItem'>
            <h1>{props.title}</h1>
            <button onClick={handleEdit}>
                <FontAwesomeIcon icon={faPen} />
            </button>       
       </div>
    )
}

export default PlaceItem