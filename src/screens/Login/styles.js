import styled, { css } from 'styled-components';
import { Avatar, Grid } from '@material-ui/core/';
import image from "../../images/background.jpg";
import { Form } from 'antd';
import { fade, nono } from './keyframes';

export const Root = styled(Grid)`
    height: 100vh;
    overflow: hidden;
`;

export const GridImage = styled(Grid)`
    background-image: url(${image});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;

export const PaperDiv = styled.div`
    padding: 4em;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const AvatarImage = styled(Avatar)`
    width: 100;
    height: 40;
    background-color: #FFFFFF;

    img {
        background-color: #FFFFFF;
        width: 40px;
        height: 40px;
    }
`;

export const FormLogin = styled(Form)`
    width: 100;
    padding: 1em;
    animation: ${fade} 0.5s;
    Button {
        margin: 2em 0em 2em 0em;
    }
    animation: ${props => props.dark === "false" ? "" : css`${nono} 200ms linear`}
`;