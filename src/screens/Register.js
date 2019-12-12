import React, { useState } from 'react';
import { Avatar, Button, TextField, Grid, Typography, makeStyles, Container } from '@material-ui/core/';
import { Link, useHistory } from 'react-router-dom'
import { Form, notification } from 'antd';
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import logo from '../images/logo.png'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        width: 100,
        height: 40,
        backgroundColor: "#FFFFFF"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Register({ form: { getFieldDecorator, validateFields } }) {
    const classes = useStyles();

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
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <img src={logo} alt="logo" width="40" height="40" />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Form className={classes.form} onSubmit={handleSubmit} noValidate>
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
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login">Already have an account? Sign in</Link>
                        </Grid>
                    </Grid>
                </Form>
            </div>
        </Container>
    );
}

export default Form.create({ name: 'register' })(Register)