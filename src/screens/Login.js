import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Paper, Box, Grid, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from 'react-apollo'
import { Link, useHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import { Form, Icon, notification } from 'antd';
import image from "../images/background.jpg";
import logo from '../images/logo.png'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Login() {
    const classes = useStyles()

    const history = useHistory()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

        const { data } = await mutate({
            variables: {
                email: email,
                password: password
            }
        })

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
            notification.open({
                message: `Web TCC Pos`,
                description: `Olá ${data.signin.user.firstname}, você está logado no sistema!`,
                duration: 10,
                icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                style: {
                    width: 500,
                    marginLeft: 100 - 200,
                    marginTop: 10,
                },
            })
            history.push('/home')
            return
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <img src={logo} alt="logo" width="40" height="40" />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
          </Typography>
                    <Form className={classes.form} onSubmit={handleSubmit} noValidate>
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
                        />,
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
                        />,
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // htmlType="submit"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register">Don't have an account? Sign Up</Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </Form>
                </div>
            </Grid>
        </Grid>
    );
}

export default Form.create({ name: 'login' })(Login)