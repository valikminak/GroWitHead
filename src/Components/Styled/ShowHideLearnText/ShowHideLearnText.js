import styled from "styled-components";
import React from "react";

const SectionTextStyles = styled.div`
position:${(props) => props.show ? "absolute" : "static"};
top:0;
right:0;
width:100%;
height:${(props) => props.show ? "100%" : "35px"};
padding:12px;
background-color: #fff;
z-index:${(props) => props.show ? "1" : "0"};

.textItemHeader {
    display: flex;
    position: relative;

.textItemHeader__nav {
      position: absolute;
      top: 0;
      right: 0;

      & span {
        cursor: pointer;
        margin-right: 2px;
        & img{
          width: 15px;
        }
      }
    }
  }
.textItemContent{
    height: 100%;
    & textarea{
      border: none;
      background-color: #fff3bf;
      color: ${(props)=>props.textAdded ? "rgba(0, 0, 0, 0.44)":"black"};
      overflow:scroll;
      width: 100%;
      height: 100%;
      resize: none;
      outline: none;
    }
  }
`;


export const SectionText = ({children, show, textAdded}) => {
    return <SectionTextStyles show={show} textAdded={textAdded}>{children}</SectionTextStyles>
};