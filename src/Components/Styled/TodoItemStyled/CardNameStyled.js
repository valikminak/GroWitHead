import React from "react";
import styled from "styled-components";


const CardNameStyles = styled.span`
color: "black";
font-weight:${({important}) => important ? "900" : "300"};
font-size: "13px";
color:${({important})=>important?"#FFB423":"#000000"};
text-decoration: ${({done}) => done ? "line-through" : "none"};
width:165px;
word-wrap:break-word;
white-space: normal;
`;
export const CardNameStyled = ({children, important, done}) => {
    return <CardNameStyles important={important} done={done}>{children}</CardNameStyles>
};



