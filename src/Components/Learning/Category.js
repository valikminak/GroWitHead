import React, {memo, useState} from 'react';
import './Style.scss'
import {NavLink} from "react-router-dom";
import ListLayout, {replaced} from "./Layout/ListLayout";
import {Close} from "../../SVG/SVG";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {closeInput, handleDragEnd} from "../../Functions";

let idCategory = 4000;

const Category = memo(({ subject, dispatch }) => {


    const [inputValue, setInputValue] = useState('');
    const [newCategory, setNewCategory] = useState(false);
    const addCategory = (e) => {
        if ((inputValue.length > 0 && e.key === "Enter") || (inputValue.length > 0 && e.target.nodeName === "BUTTON") || (inputValue.length > 0 && e.target.innerHTML === "Add "+subject.name)) {
            dispatch({
                type: "ADD_NEW_CATEGORY",
                payload:
                    {
                        subjectId: subject.id,
                        newCategory: inputValue,
                        categoryId: idCategory++
                    }
            });
            setNewCategory(false);
            setInputValue('')
        }
    };
    const deleteItem = (id) => {
        dispatch({
            type: "DELETE_CATEGORY_ITEM",
            payload: {
                subjectId: subject.id,
                categoryId: id,
            }
        })
    };
    const categoryDragEnd = ({draggableId, destination, source}) => {
        if (!destination) {
            return;
        }
        if (destination.droppableId !== source.droppableId) {
            return;
        }
        handleDragEnd(dispatch, subject.category, draggableId, destination, "categories", subject.id)
    };
    const setCategory = (e) => {
        if (!newCategory) {
            setNewCategory(true)
        }
        if (newCategory) {
            addCategory(e);
            setNewCategory(false)
        }
    };
    return (
        <div className="learningCategory" onClick={(e) => {
            closeInput(e, newCategory, setNewCategory)
        }}>
            <div onClick={setCategory} className="learningHeader">
                Add {subject.name}
            </div>
            <DragDropContext onDragEnd={categoryDragEnd}>
                <div className='learningList'>
                    <div className="learningList__add">
                        <ListLayout newItem={newCategory}
                                    inputValue={inputValue} setInputValue={setInputValue}
                                    addItem={addCategory}/>
                    </div>
                    <Droppable droppableId={"categoryList"}>
                        {(provided) => {
                            return (
                                <ul
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className='learningList__list'>
                                    {subject.category.length > 0 && subject.category.map((item, index) =>
                                        <Draggable
                                            key={item.id}
                                            index={index}
                                            draggableId={item.name + item.id}>
                                            {(provider) => {
                                                return (
                                                    <li ref={provider.innerRef}
                                                        {...provider.draggableProps}
                                                        {...provider.dragHandleProps}>
                                                        <div style={{backgroundColor: subject.color}}>
                                                            <NavLink
                                                                to={`/learning/${replaced(subject.name)}${subject.id}/${replaced(item.name)}${item.id}`}>
                                                                {item.name}
                                                            </NavLink>
                                                            <span className="deleteItem"
                                                                  onClick={() => deleteItem(item.id)}><Close/></span>
                                                        </div>
                                                    </li>
                                                )
                                            }}
                                        </Draggable>
                                    )}
                                </ul>
                            )
                        }}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    );
});

export default Category;
