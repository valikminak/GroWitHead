import React, {useState} from 'react';
import '../Style.scss'
import {SectionText} from "../../Styled/ShowHideLearnText/ShowHideLearnText";

const TextItem = ({dispatch, text, subject, category}) => {
    const [inputValue, setInputValue] = useState(text.text);
    const [textAdded, setText] = useState(false);
    const [focusText, setFocusText] = useState(true);
    const [show, setShow] = useState(false);
    const addCategoryText = () => {
        dispatch({
            type: "ADD_NEW_CATEGORY_TEXT",
            payload:
                {
                    subjectName: subject.name,
                    nameCategory: category.name,
                    textName:text.name,
                    categoryTextChanged: inputValue
                }
        });
        setText(true);
        setFocusText(false)
    };
    const deleteCategoryText=()=>{
        dispatch({
            type:"DELETE_CATEGORY_TEXT",
            payload:
                {
                    subjectName: subject.name,
                    nameCategory: category.name,
                    textId: text.id
                }
        })
    }


    return (
        <SectionText show={show} textAdded={textAdded} >
            <div className="textItemHeader">
                <span>{text.name}</span>
                <div className="textItemHeader__nav">
                    {show&&<span onClick={() => setShow(false)}><img src="/Images/minus.svg" alt=""/></span>}
                    {show&&<span onClick={addCategoryText}><img src="/Images/success.svg" alt=""/></span>}
                    {!show&&<span onClick={()=>setShow(true)}><img src="/Images/open.svg" alt=""/></span>}
                    {!show&&<span onClick={deleteCategoryText}><img src="/Images/close.svg" alt=""/></span>}
                </div>
            </div>
            {show&&<div className="textItemContent">
                <textarea autoFocus={focusText} value={inputValue} onFocus={()=>setText(false)} onChange={(e)=>setInputValue(e.target.value)} />
            </div>}
        </SectionText>
    );
};

export default TextItem;