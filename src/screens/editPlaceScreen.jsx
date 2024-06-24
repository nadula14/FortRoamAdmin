import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import EditPlace from '../components/editPlace/editPlace';

function EditPlaceScreen() {

  return (
    <div>
    <div >
        <div className="subheadings">
          <p>Edit Place</p>
        </div>
        <EditPlace />
    </div>
    </div>
  )
}

export default EditPlaceScreen
