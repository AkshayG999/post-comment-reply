import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditPost(props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        axios.get(`/api/posts / ${ props.match.params.id }`)
            .then(res => {
                setTitle(res.data.title);
                setContent(res.data.content);
            })
            .catch(err => {
                console.log(err);
            });
    }, [props.match.params.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { title, content };
        axios.patch(`/api/posts / ${ props.match.params.id }`, data)
            .then(res => {
                console.log(res.data);
                props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <h2>Edit post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditPost;