import React, { useState } from 'react';
import {
    TextField,
    Paper,
    Box,
    Grid,
    Typography,
    Button
} from '@material-ui/core/';
import {
    Root,
    GridImage,
    PaperDiv,
    AvatarImage,
    FormLogin
} from './styles';
import { useMutation } from 'react-apollo'
import { Link, useHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import { notification } from 'antd';
import logo from '../../images/logo.png';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="/">
                Pata Marca
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Index() {

    const history = useHistory()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false);

    const [mutate] = useMutation(gql`
    mutation signin($email: String! $password: String!) {
            signin(email: $email password: $password) {
                token
                user {
                    id
                    firstname
                    lastname
                    role
                }
            }
        }
    `);

    async function handleSubmit(e) {
        e.preventDefault()

        setSubmit(false)

        if (email === "" || password === "") {
            setSubmit(true)
        } else {
            const { error, data } = await mutate({
                variables: {
                    email: email,
                    password: password
                }
            })
            if (!error) {
                if (data.signin != null) {
                    if (data.signin.user.role !== 'ADMIN') {
                        notification.error({
                            message: `Error`,
                            description: `Usuário sem permissão de acesso`,
                            duration: 4,
                            placement: "topLeft",
                        })
                        return
                    }

                    if (!data.signin) {
                        notification.error({
                            message: `Error`,
                            description: `Dados inválidos, tente novamente com outros dados`,
                            duration: 4,
                            placement: "topLeft",
                        })
                        return
                    }

                    if (data.signin.token) {
                        localStorage.setItem('token', data.signin.token)
                        localStorage.setItem('user', JSON.stringify(data.signin.user))
                        console.log(data.signin.token)
                        history.push('/home')
                        return
                    }
                } else {
                    notification.error({
                        message: `Error`,
                        description: `Dados inválidos, tente novamente com outros dados`,
                        duration: 4,
                        style: {
                            width: 500,
                            marginLeft: 100 - 200,
                            marginTop: 10,
                        },
                    })
                }
            }
        }
    }

    return (
        <Root container component="main">
            <GridImage item xs={false} sm={4} md={7} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <PaperDiv>
                    <AvatarImage>
                        <img src={logo} alt="logo" />
                    </AvatarImage>
                    <Typography component="h1" variant="h5">
                        Sign in
          </Typography>
                    <FormLogin onSubmit={handleSubmit} dark={submit === false ? "false" : "true"} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Link to="/register">Don't have an account? Sign Up</Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </FormLogin>
                </PaperDiv>
            </Grid>
        </Root>
    );
}

export default Index