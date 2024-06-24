import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchBar from '../components/searchBar/search'
import BlogItem from '../components/listItem/bloglistItem';

function BlogSearchResultScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const searchTerm = location.search ? location.search.split('=')[1] : '';

    useEffect(() => {
        fetch("http://localhost:3010/blog/")
          .then((response) => response.json())
          .then((data) => {
            setBlogs(data); 
          })
          .catch((error) => console.error("Error fetching places:", error));
      }, []);
    
      useEffect(() => {
        const results = blogs.filter((blog) =>
          (blog.title && blog.title.toLowerCase().includes(searchTerm.toLowerCase())) || (blog.username && blog.username.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setSearchResults(results);
      }, [blogs, searchTerm]);

      const handleClick = (blog) => {
        navigate('/blogs/delete', { state: { blog } });
      };

  return (
    <div>
      <SearchBar type={'blog'}/>
      {searchResults.length > 0 ? (
        <div className='blog-list'>
        {searchResults.map((blog) => {
                    return (
                        <BlogItem 
                            blog={blog}
                            id={blog._id}
                            title={blog.title}
                            author={blog.username} 
                            onClick={handleClick}
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

export default BlogSearchResultScreen
