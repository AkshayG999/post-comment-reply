import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/posts')
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    console.log(posts)
    return (
        <div>
            <h2>Posts</h2>
            {posts.map(post => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <h4>Comments</h4>
                    {post.comments

                        .map(comment => (
                            <div key={comment._id}>
                                <p>{comment.text}</p>
                                <p>{comment.author}</p>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}

export default Posts;
