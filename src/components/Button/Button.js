import styled from "styled-components";

const Button  = styled.button`
    height: 3.5em;
    width: 3.5em;
    border: 1px solid #f2f4f6;
    border-radius: 14px;
    margin: 5px;
    outline: none;
    cursor: pointer;
    position: relative;
    background-color: #ffffff;

    .button-wrapper {
        display: block;
        margin: auto;
        font-size: 14px;
    }

    .icon-wrapper {
        margin: auto;
        font-size: 25px;
        margin-top: -7px;
    }

    .votes {
        margin-top: -5px;
    }


`;

export default Button;