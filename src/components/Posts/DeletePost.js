import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeletePost(props) {
    const [post, setPost] = useState({});

    useEffect(() => {
        axios.get(`/api/posts / ${props.match.params.id}`)
            .then(res => {
                setPost(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [props.match.params.id]);

    const handleDelete = () => {
        axios.delete(`/api/posts / ${props.match.params.id}`)
            .then(res => {
                console.log(res.data);
                props.history.push('/');
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export default DeletePost;