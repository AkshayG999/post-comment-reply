import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditComment(props) {
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        axios.get(`/api/comments/${props.match.params.id}`)
            .then(res => {
                setText(res.data.text);
                setAuthor(res.data.author);
            })
            .catch(err => {
                console.log(err);
            });
    }, [props.match.params.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { text, author };
        axios.patch(`/api/comments/${props.match.params.id}`, data)
            .then(res => {
                console.log(res.data);
                props.history.push(`/posts/${res.data.post}`);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <h2>Edit comment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Text</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div>
                    <label>Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditComment;
