import React from 'react';
import {
    Button
} from '@material-ui/core/';
import {
    FormLogin,
    Div,
    Titulo,
    TextFieldInput,
} from './styles';

function Index() {
    return (
        <>
            <FormLogin>
                <Div>
                    <Titulo>Cadastro de Administrador</Titulo>
                    <div>
                        <TextFieldInput
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
