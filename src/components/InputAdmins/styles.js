import styled from 'styled-components';
import { Form } from 'antd';
import { TextField } from '@material-ui/core/';

export const FormLogin = styled(Form)`
    width: 100%;
    padding: 2em;
    display: inline-block;
    background: rgba(255, 255, 255, 0.4);
    text-align: center;
    Button {
        width: 100px;
        margin: 4em 0em 2em 0em;
        margin-right: 2.5em;
        margin-left: 2.5em;
    }    
`;

export const Div = styled.div`
    margin: 0px 50px 0px 50px;
    padding-top: 25px;
`;

export const Titulo = styled.h2`
    color: #4a148c;
`;

export const TextFieldInput = styled(TextField)`
    width: 40%;
`;
