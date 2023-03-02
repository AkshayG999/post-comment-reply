import * as React from 'react';
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Link, Typography, Alert, AlertTitle } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Home() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://impossible-gray-pocket.cyclic.app/posts')
            .then(res => {
                setPosts(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    // console.log(posts)


    function Copyright() {
        return (
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://www.youtube.com/@programming-geek">
                    My Youtube Channel 👻
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    let navigate = useNavigate()
    const [Success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const CurrentCard = (e, index) => {
        navigate(`/get-single-post/${e._id}`)
        localStorage.setItem('index', index)
        localStorage.setItem('id', e._id)
    }

    const handlePostEdit = (e, index) => {
        navigate(`/edit-post/${e._id}`)
        // console.log(e._id)
        localStorage.setItem('index', index)
        localStorage.setItem('edit_id', e._id)
    }

    const handlePostDelete = (e, index) => {
        axios.delete(`https://impossible-gray-pocket.cyclic.app/posts/${e._id}`)
            .then(res => {
                console.log(res.data.message)
                setSuccess(res.data.message)
                alert(res.data.message)
                setTimeout(() => {
                    setSuccess("")
                    window.location.reload();
                }, 2000)

            })
            .catch(err => {
                console.log(err)
                setError(err.message)
                alert(err.message)
                setTimeout(() => {
                    setError("")
                }, 2000)
            })
    }

    return (
        <div>
            <Box sx={{ m: '7%' }}>
                {error && (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        This is an error alert — <strong>{error}</strong>
                    </Alert>
                )}
                {Success && (
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        This is a success alert — <strong>{Success}</strong>
                    </Alert>
                )}
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {posts.map((e, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Item>
                                <Card onClick={() => CurrentCard(e, index)} sx={{ minWidth: 275, maxWidth: 300 }}>

                                    <CardContent>
                                        <Typography variant="h5" fontWeight={'bold'} component="div">
                                            {e.title.slice(0, 70) + "..."}
                                        </Typography>
                                        {e.content.slice(0, 100) + "..."} <div><button>read more</button></div>
                                    </CardContent>
                                </Card>
                                <Button variant="contained" sx={{ minWidth: 100, maxWidth: 30, mt: '50px', margin: '20px' }} onClick={() => handlePostEdit(e, index)}>Edit</Button>

                                <Button variant="contained" sx={{ minWidth: 100, maxWidth: 30, mt: '50px', margin: '20px' }} onClick={() => handlePostDelete(e, index)}>Delete</Button>

                            </Item>
                        </Grid>
                    ))}


                </Grid>
            </Box>
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Channel
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to !
                </Typography>
                <Copyright />
            </Box>
        </div >
    )
}
