import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import LearningHeader from "./Layout/LearningHeader";

const Subjects = ({dispatch,subjects}) => {
    const [inputValue, setInputValue] = useState('');
    const [newSubject, setNewSubject] = useState(false);

    const addSubject = (e) => {
        if(inputValue.length>0){
            dispatch({
                type: "ADD_NEW_SUBJECT",
                payload: {
                    id:Math.random(),
                    subjectName:inputValue},

            });
            setNewSubject(false);
            setInputValue('')
        }
    };

    return (
        <div className="learningSubjects">
            <LearningHeader title={"Learning"}/>
            <div className='learningList'>
                <div className="learningList__add">
                    {newSubject
                        ? <div>
                            <span onClick={()=>setNewSubject(false)}>
                                X
                            </span>
                            <input type="text" autoFocus={true}  value={inputValue}
                                   onChange={(e) => setInputValue(e.target.value)}/>
                            <button onClick={(e)=>addSubject(e)} >Add</button>
                        </div>
                        : <p onClick={() => setNewSubject(true)}>
                            + Add subject
                        </p>}
                </div>
                <ul className='learningList__list'>
                    {subjects && subjects.map(({name, id}) => <li key={id}><NavLink
                        to={`/learning/${name.toLowerCase()}`}>{name}</NavLink></li>
                    )}
                </ul>
            </div>
        </div>

    );
};

export default Subjects;