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
    TextFieldInputAddress,
} from './styles';

function Index() {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [zip_code, setZip_code] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState(0);

    // const [mutateCreateUser] = useMutation(gql`
    //     mutation createUser($data: CreateUserInput!) {
    //         createUser(data: $data) {
    //             id
    //             firstname
    //             lastname
    //             email
    //             role
    //         }
    //     }
    // `)

    const [mutateCreateAddress] = useMutation(gql`
        mutation createAddress($data: CreateAddressInput!) {
            createAddress(data: $data) {
                id
                street
                number
                complement
                zip_code
            }
        }
    `)

    function clear() {
        setFirstname("")
        setLastname("")
        setEmail("")
        setPassword("")
        setZip_code("")
        setStreet("")
        setNumber(0)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const { errors, data } = await mutateCreateAddress({
            variables: {
                data: {
                    street: street,
                    number: number,
                    zip_code: zip_code,
                }
            }
        })

        // const { errorsCreateUser, dataCreateUser } = await mutateCreateUser({
        //     variables: {
        //         data: {
        //             firstname: firstname,
        //             lastname: lastname,
        //             email: email,
        //             password: password,
        //             role: "ADMIN"
        //         }
        //     }
        // })

        console.log(data)
        // console.log(dataCreateUser)

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
                    <Titulo>Cadastro de Cliente</Titulo>
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
                    <div><br /></div>
                    <div>
                        <div>
                            <TextFieldInputAddress
                                value={zip_code}
                                onChange={e => setZip_code(e.target.value)}
                                margin="normal"
                                required
                                id="zip_code"
                                label="Zip code"
                                name="zip_code"
                                autoComplete="zip_code"
                                size="medium"
                                autoFocus
                            />
                        </div>
                        <div>
                            <TextFieldInputAddress
                                value={street}
                                onChange={e => setStreet(e.target.value)}
                                margin="normal"
                                required
                                id="street"
                                label="Street"
                                name="street"
                                autoComplete="street"
                                size="medium"
                                autoFocus
                            />
                        </div>
                        <div>
                            <TextFieldInputAddress
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                                margin="normal"
                                required
                                id="number"
                                label="Number"
                                name="number"
                                type="number"
                                autoComplete="number"
                                size="medium"
                                autoFocus
                            />
                        </div>
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
