import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { notification } from 'antd';
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, TextField, Grid, Typography, Container } from '@material-ui/core/';
import { PaperDiv, AvatarImage, FormRegister } from './styles';
import logo from '../../images/logo.png'

function Index() {
    const history = useHistory()

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [mutate] = useMutation(gql`
        mutation createUser($data: CreateUserInput!) {
            createUser(data: $data) {
                id
                firstname
                lastname
                email
                role
            }
        }
    `)

    async function handleSubmit(e) {
        e.preventDefault()

        const { errors } = await mutate({
            variables: {
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                    role: "ADMIN"
                }
            }
        })

        if (!errors) {
            notification.success({
                message: 'Usuário cadastrado com sucesso!'
            })
            history.push('/login')
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <PaperDiv>
                <AvatarImage>
                    <img src={logo} alt="logo" />
                </AvatarImage>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <FormRegister onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                                autoComplete="fname"
                                name="firstname"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstname"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                name="lastname"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login">Already have an account? Sign in</Link>
                        </Grid>
                    </Grid>
                </FormRegister>
            </PaperDiv>
        </Container>
    );
}

export default Index