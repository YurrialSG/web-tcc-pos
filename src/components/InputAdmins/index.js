import React, { useState } from 'react';
import {
    Button
} from '@material-ui/core/';
import { notification } from 'antd';
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import {
    FormLogin,
    Div,
    Titulo,
    TextFieldInput,
} from './styles';

function Index() {

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

    function clear() {
        setFirstname("")
        setLastname("")
        setEmail("")
        setPassword("")
    }

    async function handleSubmit() {
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

        }
    }

    return (
        <>
            <FormLogin onSubmit={handleSubmit}>
                <Div>
                    <Titulo>Cadastro de Administrador</Titulo>
                    <div>
                        <TextFieldInput
                            value={firstname}
                            onChange={e => setFirstname(e.target.value)}
                            margin="normal"
                            required
                            id="firstname"
                            label="Firstname"
                            name="firstname"
                            autoComplete="firstname"
                            size="medium"
                            autoFocus
                        />
                    </div>
                    <div>
                        <TextFieldInput
                            value={lastname}
                            onChange={e => setLastname(e.target.value)}
                            margin="normal"
                            required
                            id="lastname"
                            label="Lastname"
                            name="lastname"
                            autoComplete="lastname"
                            size="medium"
                        />
                    </div>
                    <div>
                        <TextFieldInput
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            margin="normal"
                            required
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            size="medium"
                        />
                    </div>
                    <div>
                        <TextFieldInput
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            margin="normal"
                            required
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            size="medium"
                            autoComplete="current-password"
                        />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            variant="contained"
                            size="small"
                            color="primary"
                        >
                            Cadastrar
                        </Button>
                        <Button
                            onClick={clear}
                            variant="contained"
                            size="small"
                            color="inherit"
                        >
                            Limpar
                        </Button>
                    </div>
                </Div>
            </FormLogin>
        </>
    )
}

export default Index
