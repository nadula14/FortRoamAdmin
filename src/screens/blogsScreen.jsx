import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/searchBar/search'
import BlogItem from '../components/listItem/bloglistItem';

function BlogsScreen() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      fetch("http://localhost:3010/blog/")
        .then((response) => response.json())
        .then((data) => {
          setBlogs(data); 
        })
        .catch((error) => console.error("Error fetching places:", error));
    }, []);

    const handleClick = (blog) => {
      navigate('/blogs/delete', { state: { blog } });
    };

  return (
    <div>
      <SearchBar type={'blog'} />
      {
          <div className='blog-list'>
          {blogs.map((blog) => {
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
      }
    </div>
  )
}

export default BlogsScreen
