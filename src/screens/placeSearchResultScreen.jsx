import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchBar from '../components/searchBar/search'
import PlaceItem from '../components/listItem/listItem'

function PlaceSearchResultScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [places, setPlaces] = useState([]);
    const searchTerm = location.search ? location.search.split('=')[1] : '';

    useEffect(() => {
        fetch("http://localhost:3010/place/")
          .then((response) => response.json())
          .then((data) => {
            setPlaces(data); 
          })
          .catch((error) => console.error("Error fetching places:", error));
      }, []);
    
      useEffect(() => {
        const results = places.filter((place) =>
          (place.title && place.title.toLowerCase().includes(searchTerm.toLowerCase())) 
         || (place.subtype && place.subtype.includes(searchTerm.toLowerCase())) 
        );
        setSearchResults(results);
      }, [places, searchTerm]);

      const handleEdit = (place) => {
        navigate('/places/edit', { state: { place } });
      };

  return (
    <div>
      <SearchBar type={'place'}/>
      {searchResults.length > 0 ? (
        <div className='list'>
        {searchResults.map((place) => {
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
      ) : (
        <p className='search-p' >No results found</p>
      )}

    </div>
    )
}

export default PlaceSearchResultScreen
