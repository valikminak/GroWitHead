import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import ListLayout, {replaced} from "./Layout/ListLayout";
import {Close} from "../../SVG/SVG";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {closeInput, handleDragEnd} from "../../Functions";


let idSubject = 3000;
const colors = ["#5199FF", "#1771F1", "#E4FFF9", "#B5FBDD", "#76FEC5", "#FFFCBB", "#FFE55E", "#FBCEB5", "#FE9E76", "#FFDFDC", "#FF9CA1", "#FF6A61", "#F6522E", "#EF2FA2", "#E47CCD"];
const Subjects = ({dispatch, subjects}) => {
    const [inputValue, setInputValue] = useState('');
    const [newSubject, setNewSubject] = useState(false);

    const addSubject = (e) => {
        if ((inputValue.length > 0 && e.key === "Enter") || (inputValue.length > 0 && e.target.nodeName === "BUTTON")|| (inputValue.length > 0 && e.target.className === "learningHeader")) {
            dispatch({
                type: "ADD_NEW_SUBJECT",
                payload: {
                    id: idSubject++,
                    subjectName: inputValue,
                    subjectColor: colors[Math.floor(Math.random() * colors.length)]
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
    const subjectDragEnd = ({draggableId, destination, source}) => {
        if (!destination) {
            return;
        }
        if (destination.droppableId !== source.droppableId) {
            return;
        }
        handleDragEnd(dispatch, subjects, draggableId, destination, "subjects")
    };
    const setSubject = (e) => {
        if (!newSubject) {
            setNewSubject(true)
        }
        if (newSubject) {
            addSubject(e);
            setNewSubject(false)
        }
    };
    return (
        <div className="learningSubjects" onClick={(e) => closeInput(e, newSubject, setNewSubject)}>
            <NavLink to={'/learning'}>
                <div onClick={setSubject} className="learningHeader">
                    Add Learning
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
                                                    draggableId={subject.name + subject.id}
                                                >
                                                    {(provider) => {
                                                        return (
                                                            <li ref={provider.innerRef}
                                                                {...provider.draggableProps}
                                                                {...provider.dragHandleProps}
                                                            >
                                                                <div style={{backgroundColor: subject.color}}>
                                                                    <NavLink
                                                                        to={`/learning/${replaced(subject.name)}${subject.id}`}>
                                                                        {subject.name}
                                                                    </NavLink>
                                                                    <span className="deleteItem"
                                                                          onClick={() => deleteItem(subject.id)}><Close/></span>
                                                                </div>
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