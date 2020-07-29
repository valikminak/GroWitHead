import React, {useState} from 'react';
import TextItem from "./TextItem";
import ListLayout from "../Layout/ListLayout";
import {closeInput} from "../../../Functions";

let idText = 5000;

const Text = ({dispatch, subject, category}) => {
    const [inputValue, setInputValue] = useState('');
    const [newCategoryTextTitle, setNewCategoryTextTitle] = useState(false);
    const addCategoryText = (e) => {
        if ((inputValue.length > 0 && e.key === "Enter") || (inputValue.length > 0 && e.target.nodeName === "BUTTON")|| (inputValue.length > 0 && e.target.innerHTML === "Add "+category.name)) {
            dispatch({
                type: "ADD_NEW_CATEGORY_TEXT_TITLE",
                payload:
                    {
                        subjectId: subject.id,
                        categoryId: category.id,
                        newCategoryTextTitle: inputValue,
                        id: idText++
                    }
            });
            setNewCategoryTextTitle(false);
            setInputValue('')
        }
    };
    const setText = (e) => {
        if (!newCategoryTextTitle) {
            setNewCategoryTextTitle(true)
        }
        if (newCategoryTextTitle) {
            addCategoryText(e);
            setNewCategoryTextTitle(false)
        }
    };
    return (
        <div className="learningText" onClick={(e) => {
            closeInput(e, newCategoryTextTitle, setNewCategoryTextTitle)
        }}>
                <div onClick={setText} className="learningHeader">
                    Add {category.name}
                </div>
                <div className="learningText__window">
                        <div className='learningList'>
                            <div className="learningList__add">
                                <ListLayout newItem={newCategoryTextTitle}
                                            inputValue={inputValue} setInputValue={setInputValue}
                                            addItem={addCategoryText}/>
                            </div>
                                <div className="learningText__list">
                                    {category.text.length > 0 && category.text.map((text) =>
                                        <TextItem dispatch={dispatch} text={text} subject={subject} category={category}
                                                  key={text.id}/>
                                    )}
                                </div>
                        </div>
                </div>
        </div>
    );
};

export default Text;