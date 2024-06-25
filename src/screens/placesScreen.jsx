import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import SearchBar from '../components/searchBar/search'
import axios from 'axios';
import PlaceItem from '../components/listItem/listItem'

function PlacesScreen() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [category, setCategory] = useState('historical');

  useEffect(() => {
    handleClick('historical');
  }, []);

  const handleClick = async (category) => {
    try {
      const response = await axios.get(`https://fortroam-server.onrender.com/place/types/${category}`);
      setPlaces(response.data);
      setCategory(category);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (place) => {
    navigate('/places/edit', { state: { place } });
  };

  return (
    <div>
      <div className='add-search-section'>
        <SearchBar type={'place'}/>
        <button onClick={() => navigate('/places/add')} className='add-button'>Add Place</button>
      </div>
      <div className='places'>
            <div class="subheadings-buttons">
              <button onClick={() => handleClick('historical')}  class="category-btn">Historical</button>
              <button onClick={() => handleClick('commercial')}  class="category-btn">Commercial</button>
              <button onClick={() => handleClick('activities')}  class="category-btn">Activities</button>
              <button onClick={() => handleClick('services')}  class="category-btn">Services</button>
            </div>
            <div className='list'>
            {places.map((place) => {
                    return (
                        <PlaceItem 
                            place={place}
                            id={place._id}
                            title={place.title} 
                            onEdit={handleEdit}
                        />
                    );
                  })}
        </div>
      </div>
    </div>
  )
}

export default PlacesScreen
