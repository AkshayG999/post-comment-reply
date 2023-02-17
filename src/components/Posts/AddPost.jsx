import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Link, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';

export default function AddPost() {

    let currData = {
        title: '',
        content: ''
    }

    const [values, setValues] = React.useState(currData);


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    };


    const handleSubmit = async (e) => {
        e.preventDefault()

        axios.post(`http://localhost:4000/posts`, values)
            .then(res => {
                setValues(currData)
                  
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        // <React.Fragment>
        <Container maxWidth="sm">
            <Box container direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ bgcolor: '#fff4', mt: '100px', pb: '50px', boxShadow: 10, borderRadius: '10px' }}>
                <Stack
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Typography sx={{ pt: '20px', ml: '30px' }}>
                        <h1>Creact Your Post</h1>
                    </Typography>
                    {/* {error && (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                This is an error alert — <strong>{error}</strong>
                            </Alert>
                        )} */}
                    <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-tile">Title</InputLabel>
                        <Input
                            id="standard-adornment-name"
                            type='text'
                            value={values.title}
                            onChange={handleChange('title')}
                            endAdornment={
                                <InputAdornment position="end">
                                    {/* <AccountCircle /> */}
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-content">content</InputLabel>
                        <Input
                            id="standard-adornment-content"
                            type='text'
                            value={values.content}
                            onChange={handleChange('content')}
                            endAdornment={
                                <InputAdornment position="end">
                                    {/* <AccountCircle /> */}
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl onClick={handleSubmit} sx={{ width: '50%', height: '40px', mt: '50px' }}>
                        <Button variant="contained"
                            sx={{ bgcolor: 'green' }}
                        >
                            + Add Post
                        </Button>
                    </FormControl>
                    <div>
                        <Link href='/'>
                            <Button variant="text" >
                                go back To Home Page
                            </Button>
                        </Link>
                    </div>
                </Stack>
            </Box>
        </Container>
        // </React.Fragment>
    )
}
