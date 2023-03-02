import React, { useState} from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Button, Link, Typography, Alert, AlertTitle } from '@mui/material';
import { Container, Stack } from '@mui/system';
import axios from 'axios';

export default function EditPost(props) {

    let currData = {
        title: '',
        content: ''
    }

    const [values, setValues] = React.useState(currData);

    const [Success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    };

    const [posts, setPosts] = useState([]);
    var id = localStorage.getItem('edit_id')

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(id)
        axios.patch(`https://impossible-gray-pocket.cyclic.app/posts/${id}`, values)

            .then(res => {
                setValues(currData)
                console.log(res.data.message);
                setSuccess(res.data.message)
                setTimeout(() => {
                    setSuccess("")
                }, 3000)
            })
            .catch(err => {
                console.log(err.response.data.message);
                setError(err.response.data.message)
                setTimeout(() => {
                    setError("")
                }, 3000)
            })
    }
    return (
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
                        <h1> Edit Post</h1>
                    </Typography>
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
                    <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-tile">Title</InputLabel>
                        <Input
                            id="standard-adornment-name"
                            type='text'
                            value={values.title}
                            onChange={handleChange('title')}
                            endAdornment={
                                <InputAdornment position="end">
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-content">Content</InputLabel>
                        <Input
                            id="standard-adornment-content"
                            type='text'
                            value={values.content}
                            onChange={handleChange('content')}
                            endAdornment={
                                <InputAdornment position="end">
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormControl onClick={handleSubmit} sx={{ width: '50%', height: '40px', mt: '50px' }}>
                        <Button variant="contained"
                            sx={{ bgcolor: 'green' }}
                        >
                            + Submit
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
    )
}
