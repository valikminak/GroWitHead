import React, {useState} from 'react';
import '../Style.scss'
import {SectionText} from "../../Styled/ShowHideLearnText/ShowHideLearnText";
import {Close, EditDone, ResizeHide, ResizeShow} from "../../../SVG/SVG";

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
                    subjectId: subject.id,
                    categoryId: category.id,
                    textId: text.id,
                    categoryTextChanged: inputValue
                }
        });
        setText(true);
        setFocusText(false)
    };
    const deleteCategoryText = () => {
        dispatch({
            type: "DELETE_CATEGORY_TEXT",
            payload:
                {
                    subjectId: subject.id,
                    categoryId: category.id,
                    textId: text.id
                }
        })
    };


    return (
        <SectionText show={show} textAdded={textAdded}>
            <div className="textItemHeader">
                <span
                    className="textItemHeader__title">{text.name.length > 10 ? text.name.slice(0, 10) + "..." : text.name}</span>
                <div className="textItemHeader__nav">
                    {show && <span onClick={() => setShow(false)}><ResizeHide width={"11px"} height={"11px"}/></span>}
                    {show && <span onClick={addCategoryText}><EditDone width={"13px"} height={"13px"}/></span>}
                    {!show && <span className="expandTextItem" onClick={() => setShow(true)}><ResizeShow width={"10px"}
                                                                                                         height={"10px"}/></span>}
                    {!show && <span className="deleteTextItem" onClick={deleteCategoryText}><Close width={"17px"}
                                                                                                   height={"17px"}/></span>}
                </div>
            </div>
            {show && <div className="textItemContent">
                <textarea
                    spellCheck={false}
                    autoFocus={focusText}
                    value={inputValue} onFocus={() => setText(false)}
                    onChange={(e) => setInputValue(e.target.value)}/>
            </div>}
        </SectionText>
    );
};

export default TextItem;