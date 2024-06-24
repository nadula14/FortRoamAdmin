import React, {useState, useEffect} from 'react';
import './listItem.css';

const BlogItem = (props) => {

    function handleClick(){
        props.onClick(props.blog);
    }

    return (
        <button className='blog-item' onClick={handleClick}>
            <div className='blog-listItem'>
                <h1>{props.title}</h1>
                <h4>{props.author}</h4>
            </div>
        </button>   
    )
}

export default BlogItem