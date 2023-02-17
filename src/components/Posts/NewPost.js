import React, { useState } from 'react';
import axios from 'axios';

function NewPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { title, content };
        console.log(data)
        axios.post(`http://localhost:4000/posts`, data)
            .then(res => {
                console.log(res.data);
                setTitle('');
                setContent('');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <h2>Create a new post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default NewPost;
