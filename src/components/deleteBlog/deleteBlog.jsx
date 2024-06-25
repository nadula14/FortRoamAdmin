import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './deleteBlog.css';

function DeleteBlog() {
    const location = useLocation();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(location.state.blog);

    useEffect(() => {
        setBlog(location.state.blog);
    }, [location.state.blog]);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://fortroam-server.onrender.com/delete/${blog._id}`);
            alert("Blog successfully deleted!");
            navigate('/blogs', { replace: true });
            
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

  return (
    <div>
            <button onClick={handleDelete} className="delete-btn">
                Delete Blog
            </button>
            <div className="singlePost">
                <div className="singlePostWrapper">
                    {blog.image && (
                         <img className='writeImg' src={blog.image} alt='' />
                    )}
                    <h1 className="singlePostTitle">
                        {blog.title}
                    </h1>

                    <div className="singlePostInfo">
                        <span className="singlePostAuthor">
                            Author: <b>{blog.username}</b>
                        </span>
                        <span className="singlePostDate">{new Date(blog.createdAt).toDateString()}</span>

                    </div>
                    <p className="singlePostDesc">{blog.description}</p>
                </div>
            </div>
    </div>
    )
}

export default DeleteBlog
