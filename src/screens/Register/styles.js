import styled from 'styled-components';
import { Avatar } from '@material-ui/core/';
import { Form } from 'antd';

export const PaperDiv = styled.div`
    padding: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const AvatarImage = styled(Avatar)`
    margin: 1em;
    background-color: #FFFFFF;

    img {
        background-color: #FFFFFF;
        width: 40px;
        height: 40px;
    }
`;

export const FormRegister = styled(Form)`
    width: 100%;
    margin: 1em;

    Button {
        margin: 2em 0em 2em 0em;
    }
`;