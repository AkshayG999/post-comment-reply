import * as React from 'react';
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
)

export default function Home() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/posts')
            .then(res => {
                setPosts(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    // console.log(posts)

    let navigate = useNavigate()
    const CurrentCard = (e, index) => {
        navigate(`/get-sigle-post/${e._id}`)
        localStorage.setItem('index', index)
        localStorage.setItem('id', e._id)
    }

    return (

        <Box sx={{ m: '7%' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {posts.map((e, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Item>
                            <Card onClick={() => CurrentCard(e, index)} sx={{ minWidth: 275, maxWidth: 300 }}>

                                <CardContent>
                                    {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Order no : {e._id}
                                    </Typography> */}
                                    <Typography variant="h5" component="div">
                                        {e.title}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {e.content}
                                    </Typography>
                                    {/* <Typography variant="body2">
                                        Total price: ₹ {e.sub_total}
                                        <br />

                                    </Typography> */}
                                </CardContent>
                            </Card>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
