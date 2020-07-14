import React, {useState} from 'react';
import './Style.scss'
import {NavLink} from "react-router-dom";
import LearningHeader from "./Layout/LearningHeader";

const Category = ({subject, dispatch}) => {
    const [inputValue, setInputValue] = useState('');
    const [newCategory, setNewCategory] = useState(false);
    const addCategory = () => {
        if (inputValue.length > 0) {
            dispatch({
                type: "ADD_NEW_CATEGORY",
                payload:
                    {
                        subjectName: subject.name,
                        newCategory: inputValue,
                        categoryId: Math.random()
                    }
            });
            setNewCategory(false);
            setInputValue('')
        }
    };
    return (
        <div className="learningCategory">
            <LearningHeader title={subject.name}/>
            <div className='learningList'>
                <div className="learningList__add">
                    {newCategory
                        ? <div>
                            <span onClick={() => setNewCategory(false)}>
                                X
                            </span>
                            <input type="text" autoFocus={true} value={inputValue}
                                   onChange={(e) => setInputValue(e.target.value)}/>
                            <button onClick={addCategory}>Add</button>
                        </div>
                        : <p onClick={() => setNewCategory(true)}>
                            + Add category
                        </p>}
                </div>
                <div className="learningList__list">
                    <ul>
                        {subject.category.length > 0 && subject.category.map(({name, id}) =>
                            <li
                                key={id}><NavLink
                                to={`/learning/${subject.name.toLowerCase()}/${name.toLowerCase()}`}>{name}</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Category;