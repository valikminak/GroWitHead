import React, {useEffect, useRef, useState} from 'react';
import './style.scss'
import TodoCard from "./todoCard";

let cardId = 200;

const TodoColumn = ({column, columns, setAddList, setNewColumn,inputValue,setInputValue}) => {
    const [inputCardValue, setInputCardValue] = useState();
    const [addCard, setAddCard] = useState(false);
    const [changeColumnValue, setColumnValue] = useState(column.name);
    const [changeColumnName, setNewColumnName] = useState(false);
    const columnRef = useRef(null);
    const columnNameRef = useRef(null);

    useEffect(() => {
        columnRef.current.focus();
    }, [column]);

    const addNewCard = () => {
        if (inputCardValue&&inputCardValue.length > 0) {
            setNewColumn(
                columns.map((item) => item.id === column.id
                    ? {
                        ...item,
                        card: [...item.card, {name: inputCardValue, id: cardId++}]
                    }
                    : item)
            );
            setInputCardValue('');
        }
    };
    const deleteCard = (id) => {
        setNewColumn(
            columns.map((item) => item.name === column.name
                ? {
                    ...item,
                    card: item.card.filter((card) => card.id !== id
                    )
                }
                : item)
        );
    };


    const columnName = () => {
        console.log("Hey")
        // column.name = changeInputValue;
        // setChangeInputValue(column.name);
        // setChange(false);
    };
    //
    // useEffect(() => {
    //     columnNameRef.current.select()
    // },[columnNameRef.current]);

    const closeInput = () => {
        addNewCard();
        setAddCard(false);
        setAddList(false)
    };

    return (
        <div ref={columnRef} onBlur={closeInput} className="columnWrapper">
            <div className="column">
                <div className="columnHeader">
                    {!changeColumnName&&<h5 onClick={()=>setNewColumnName(true)}>{column.name}</h5>}
                    {changeColumnName&& <textarea ref={columnNameRef} value={changeColumnValue} onChange={(e)=>setColumnValue(e.target.value)}/>}
                    <span>...</span>
                </div>
                <ul className="columnContent">
                    {column.card && column.card.map((card) =>
                        <TodoCard key={card.id} card={card} deleteCard={deleteCard}
                        />)}
                </ul>
                {!addCard && column.card.length === 0 &&
                <div className="columnFooter__add">
                    <button onClick={() => setAddCard(true)}>Add</button>
                </div>}
                {!addCard && column.card.length > 0 && <div className="columnFooter__add">
                    <button onClick={() => setAddCard(true)}>Add one more card</button>
                </div>}
                {addCard &&
                <div className="columnFooter__input">
                    <textarea value={inputCardValue} autoFocus={true} onChange={(e) => setInputCardValue(e.target.value)}
                              placeholder="Enter some title for this card"/>
                    <button onClick={addNewCard}>Add card</button>
                </div>}
            </div>
        </div>
    );
};

export default TodoColumn;