import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import ListLayout, {replaced} from "./Layout/ListLayout";
import {Close} from "../../SVG/SVG";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {closeInput, handleDragEnd} from "../../Functions";


let idSubject = 3000;


const Subjects = ({dispatch, subjects}) => {
    const [inputValue, setInputValue] = useState('');
    const [newSubject, setNewSubject] = useState(false);

    const addSubject = (e) => {
        if ((inputValue.length > 0 && e.key === "Enter") || (inputValue.length > 0 && e.target.nodeName === "BUTTON")) {
            dispatch({
                type: "ADD_NEW_SUBJECT",
                payload: {
                    id: idSubject++,
                    subjectName: inputValue
                },

            });
            setNewSubject(false);
            setInputValue('')
        }
    };
    const deleteItem = (id) => {
        dispatch({
            type: "DELETE_SUBJECT_ITEM",
            payload: {
                subjectId: id,
            }
        })
    };
    const subjectDragEnd = ({draggableId, destination,source}) => {
        if (!destination) {
            return;
        }
        if (destination.droppableId !== source.droppableId) {
            return;
        }
        handleDragEnd(dispatch,subjects,draggableId,destination,"subjects")
    };
    return (
        <div className="learningSubjects" onClick={(e) => closeInput(e, newSubject, setNewSubject)}>
            <NavLink to={'/learning'}>
                <div onClick={() => setNewSubject(true)} className="learningHeader">
                    Learning
                </div>
            </NavLink>
            <DragDropContext onDragEnd={subjectDragEnd}>
                <div className='learningList'>
                    <ListLayout newItem={newSubject}
                                inputValue={inputValue} setInputValue={setInputValue}
                                addItem={addSubject}/>
                    <Droppable droppableId={"subjectList"}>
                        {(provided) => {
                            return (
                                <ul ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className='learningList__list'>
                                    {subjects && subjects.map((subject, index) => {
                                            return (
                                                <Draggable
                                                    key={subject.id}
                                                    index={index}
                                                    draggableId={subject.name+subject.id}
                                                >
                                                    {(provider) => {
                                                        return (
                                                            <li
                                                                ref={provider.innerRef}
                                                                {...provider.draggableProps}
                                                                {...provider.dragHandleProps}
                                                            >
                                                                <NavLink
                                                                    to={`/learning/${replaced(subject.name)}${subject.id}`}>
                                                                    {subject.name.length > 20 ? subject.name.slice(0, 20) + "..." : subject.name}
                                                                </NavLink>
                                                                <span className="deleteItem"
                                                                      onClick={() => deleteItem(subject.id)}><Close/></span>
                                                            </li>
                                                        )
                                                    }}
                                                </Draggable>
                                            )
                                        }
                                    )}
                                </ul>
                            )
                        }}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>

    );
};

export default Subjects