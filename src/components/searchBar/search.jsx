import React, { useState} from "react";
import "./search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  
  const [searchTerm, setSearchTerm] = useState("");
  
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      return;
    }
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    if(props.type === 'place'){
      navigate(`/placesearch?query=${encodedSearchTerm}`);
    }
    else{
      navigate(`/blogsearch?query=${encodedSearchTerm}`);
    }
  }

  return (
    <div className="search-container">
      <div className="input-group">
        <input
          className="search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="search-btn" type="button" onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      
    </div>
  );
};

export default SearchBar;