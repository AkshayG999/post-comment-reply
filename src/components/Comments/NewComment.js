import React, { useState } from 'react';
import axios from 'axios';

function NewComment(props) {
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { text, author };
        axios.post(`/api/posts/${props.postId}/comments`, data)
            .then(res => {
                console.log(res.data);
                setText('');
                setAuthor('');
                props.onCommentAdded(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <h3>Add a comment</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Text</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div>
                    <label>Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default NewComment;
