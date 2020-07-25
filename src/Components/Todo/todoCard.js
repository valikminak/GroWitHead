import React, {memo, useEffect, useRef, useState} from 'react';
import './style.scss'
import {CardNameStyled} from "../Styled/TodoItemStyled/CardNameStyled";
import {Draggable} from "react-beautiful-dnd";
import {Delete, Done, Important} from "../../SVG/SVG";

const TodoCard = memo(({card, index, deleteCard, importantCard, cardDone}) => {
    const [change, setChange] = useState(false);
    const [changeInputValue, setChangeInputValue] = useState(card.name);
    const changeInputRef = useRef(null);
    useEffect(() => {
        if (change) {
            changeInputRef.current.focus();
            changeInputRef.current.select();
        }
    }, [change]);
    const changeCardName = () => {
        if (changeInputValue !== " ") {
            card.name = changeInputValue;
            setChangeInputValue(card.name);
            setChange(false);
        }
        setChangeInputValue(card.name);
        setChange(false);
    };
    const deleteItem = () => {
        deleteCard(card.id);
    };
    const setImportant = () => {
        importantCard(!card.important, card.id)
    };
    const setDone = () => {
        cardDone(!card.done, card.id)
    };


    return (
        <Draggable
            key={card.id}
            index={index}
            draggableId={card.name + card.id}
        >
            {(provider) => {
                return (
                    <li
                        ref={provider.innerRef}
                        {...provider.draggableProps}
                        {...provider.dragHandleProps}
                        className="card" onDoubleClick={() => setChange(true)}>
                        {change && <textarea className="cardChange" ref={changeInputRef} value={changeInputValue}
                                             onChange={(e) => setChangeInputValue(e.target.value.replace(/\s+/g, ' '))}
                                             onBlur={changeCardName}/>}

                        {!change &&
                        <CardNameStyled important={card.important} done={card.done}>{card.name}</CardNameStyled>}
                        {!change &&
                        <div className="cardNav">
                            <span className="cardNav__important" onClick={setImportant}>
                                <Important height={card.important ? "17px" : "15px"}
                                           width={card.important ? "17px" : "15px"}/>
                            </span>
                            <span className="cardNav__done" onClick={setDone}>
                                <Done height={card.done ? "17px" : "15px"}
                                      width={card.done ? "17px" : "15px"}/>
                            </span>
                            <span className="cardNav__delete" onClick={deleteItem}>
                                <Delete width={"15px"} height={"15px"}/>
                            </span>
                        </div>}
                    </li>
                )
            }}
        </Draggable>
    );
})

export default TodoCard;



