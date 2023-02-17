import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteComment(props) {
    const [comment, setComment] = useState({});

    useEffect(() => {
        axios.get(`/api/comments/${props.match.params.id}`)
            .then(res => {
                setComment(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [props.match.params.id]);

    const handleDelete = () => {
        axios.delete(`/api/comments/${props.match.params.id}`)
            .then(res => {
                console.log(res.data);
                props.history.push(`/posts/${comment.post}`);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return ("")
}

export default DeleteComment
