import React, {useState} from 'react';
import LearningHeader from "../Layout/LearningHeader";
import TextItem from "./TextItem";


const Text = ({dispatch, subject, category}) => {
    const [inputValue, setInputValue] = useState('');
    const [newCategoryTextTitle, setNewCategoryTextTitle] = useState(false);
    const addCategoryText = () => {
       if(inputValue.length>0){
           dispatch({
               type: "ADD_NEW_CATEGORY_TEXT_TITLE",
               payload:
                   {
                       subjectName: subject.name,
                       nameCategory: category.name,
                       newCategoryTextTitle: inputValue
                   }
           });
           setNewCategoryTextTitle(false);
           setInputValue('')
       }
    };
    return (
        <div className="learningText">
            <LearningHeader title={category.name}/>
            <div className="learningText__window">
                <div className='learningList'>
                    <div className="learningList__add">
                        {newCategoryTextTitle
                            ? <div>
                                <span onClick={() => setNewCategoryTextTitle(false)}>
                                    X
                                </span>
                                <input type="text" autoFocus={true} value={inputValue}
                                       onChange={(e) => setInputValue(e.target.value)}/>
                                <button onClick={addCategoryText}>Add</button>
                            </div>
                            : <p onClick={() => setNewCategoryTextTitle(true)}>
                                + Add Category Text
                            </p>}
                    </div>
                    <div className="learningText__list">
                        {category.text.length > 0 && category.text.map((text) =>
                            <TextItem dispatch={dispatch} text={text} subject={subject} category={category} key={text.id}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Text;