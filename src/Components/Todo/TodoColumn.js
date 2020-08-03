import React, {memo, useEffect, useRef, useState} from 'react';
import './style.scss'
import TodoCard from "./TodoCard";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {DeleteColumn} from "../../SVG/SVG";

let cardId = 2000;

const TodoColumn = memo(({ board, boardList, column, setNewBoard, deleteColumn, index }) => {
        const [inputCardValue, setInputCardValue] = useState('');
        const [addCard, setAddCard] = useState(false);
        const [changeColumnValue, setColumnValue] = useState(column.name);
        const [newColumnName, setNewColumnName] = useState(false);
        const columnNameRef = useRef(null);
        const columnCardNameRef = useRef(null);

        useEffect(() => {
            columnNameRef.current && columnNameRef.current.focus();
            columnNameRef.current && columnNameRef.current.select();
        }, [newColumnName]);
        useEffect(() => {
            columnCardNameRef.current && columnCardNameRef.current.focus();
        }, [addCard]);

        const addImportantDone = (isImportant = false, importantCardId = null, isDone = false, doneCardId = null) => {
            return boardList.map((boardListItem) => boardListItem.id === board.id
                ? {
                    ...boardListItem,
                    columns: boardListItem.columns.map((columnsItem) => columnsItem.id === column.id
                        ? importantCardId || doneCardId ? {
                            ...columnsItem,
                            cards: column.cards.map((card) => (importantCardId ? card.id === importantCardId : card.id === doneCardId)
                                ? {    //Important Done
                                    name: card.name,
                                    id: card.id,
                                    important: importantCardId ? isImportant : card.important,
                                    done: doneCardId ? isDone : card.done
                                }
                                : card
                            )
                        } : { //Add New Card
                            ...columnsItem,
                            cards: [...columnsItem.cards, {
                                name: inputCardValue,
                                id: cardId++,
                                important: false,
                                done: false
                            }]
                        }
                        : columnsItem
                    )
                }
                : boardListItem
            )
        };
        const addNewCard = (e) => {
            if ((inputCardValue && inputCardValue.length > 0 && inputCardValue !== " " && e.key === "Enter")
                || (inputCardValue && inputCardValue.length > 0 && inputCardValue !== " " && e.type === "click")
                || (inputCardValue && inputCardValue.length > 0 && inputCardValue !== " " && e.type === "blur")) {
                setNewBoard(addImportantDone());
                setInputCardValue('');
            }

        };
        const importantCard = (isImportant, importantCardId) => {
            setNewBoard(addImportantDone(isImportant, importantCardId));
        };
        const cardDone = (isDone, doneCardId) => {
            setNewBoard(addImportantDone(undefined, undefined, isDone, doneCardId))
        };
        const deleteCard = (id) => {
            setNewBoard(
                boardList.map((boardListItem) => boardListItem.id === board.id
                    ? {
                        ...boardListItem,
                        columns: boardListItem.columns.map((columnsItem) => columnsItem.id === column.id
                            ? {
                                ...columnsItem,
                                cards: columnsItem.cards.filter((card) => card.id !== id)
                            }
                            : columnsItem
                        )
                    }
                    : boardListItem
                )
            );
        };
        const deleteItem = () => {
            deleteColumn(column.id)
        };
        const changeColumnName = (e, columnId) => {
            if ((changeColumnValue && changeColumnValue.length > 0 && changeColumnValue !== " " && e.key === "Enter")
                || (changeColumnValue && changeColumnValue.length > 0 && changeColumnValue !== " " && e.type === "blur")) {
                boardList.find((boardListItem) => boardListItem.id === board.id).columns.find((column) => column.id === columnId).name = changeColumnValue;
                setNewColumnName(false)
            }
        };


        return (
            <Draggable draggableId={column.name + column.id} index={index}>
                {(provided) => {
                    return (
                        <div
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            className="columnWrapper">
                            <div
                                className="column">
                                <div {...provided.dragHandleProps} className="columnHeader">
                                    <div>
                                        {!newColumnName &&
                                        <h5 onClick={() => setNewColumnName(true)}>{column.name}</h5>}
                                        {newColumnName &&
                                        <textarea maxLength={15} ref={columnNameRef}
                                                  onKeyDown={(e) => changeColumnName(e, column.id)}
                                                  onBlur={(e) => changeColumnName(e, column.id)} value={changeColumnValue}
                                                  onChange={(e) => setColumnValue(e.target.value)}/>}
                                    </div>
                                    <div style={{cursor: "pointer"}} onClick={deleteItem}>
                                        <DeleteColumn/>
                                    </div>
                                </div>
                                <Droppable droppableId={column.name + column.id}>
                                    {(provided) => {
                                        return (
                                            <ul
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className="columnContent"
                                                style={{height: `${(30.5 * column.cards.length)}px`}}
                                            >
                                                {column.cards && column.cards.map((card, index) => {
                                                        return (
                                                            <TodoCard key={card.id}
                                                                      index={index}
                                                                      card={card}
                                                                      deleteCard={deleteCard}
                                                                      importantCard={importantCard}
                                                                      cardDone={cardDone}/>
                                                        )
                                                    }
                                                )}
                                            </ul>
                                        )
                                    }}
                                </Droppable>
                                <div className="columnFooter">
                                    {!addCard && column.cards.length === 0 &&
                                    <div className="columnFooter__add">
                                        <button onClick={() => setAddCard(true)}>Add</button>
                                    </div>}
                                    {!addCard && column.cards.length > 0 && <div className="columnFooter__add">
                                        <button onClick={() => setAddCard(true)}>Add one more card</button>
                                    </div>}
                                    {addCard &&
                                    <div onKeyDown={(e) => addNewCard(e)} className="columnFooter__input">
                    <textarea
                        maxLength={15}
                        onBlur={(e) => addNewCard(e)}
                        ref={columnCardNameRef}
                        value={inputCardValue}
                        onChange={(e) => setInputCardValue(e.target.value.replace(/\s+/g, ' '))}
                        placeholder="Enter some title for this card"/>
                                        <div className="columnFooter__addCard">
                                            <button onClick={(e) => addNewCard(e)}>Add card</button>
                                            <span onClick={() => setAddCard(false)}>-</span>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Draggable>
        )
    })
;

export default TodoColumn;
