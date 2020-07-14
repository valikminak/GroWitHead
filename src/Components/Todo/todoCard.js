import React, {useEffect, useRef, useState} from 'react';
import './style.scss'
import {CardNameStyled} from "../Styled/TodoItemStyled/CardNameStyled";

const TodoCard = ({card, deleteCard}) => {
    const [important, setImportant] = useState(false);
    const [done, setDone] = useState(false);
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
        card.name = changeInputValue;
        setChangeInputValue(card.name);
        setChange(false);
    };
    const deleteItem = () => {
        deleteCard(card.id);
    };

    return (
            <li className="card" onDoubleClick={()=>setChange(true)}>
                {change && <textarea className="cardChange" ref={changeInputRef} value={changeInputValue}
                                     onChange={(e) => setChangeInputValue(e.target.value)}
                                     onBlur={changeCardName}/>}

                {!change && <CardNameStyled important={important} done={done}>{card.name}</CardNameStyled>}
                {!change &&
                <div className="cardNav">
                    <span className="cardNav__important" onClick={() => setImportant(!important)}><img style={{transform: important ? "scale(1.2)":"scale(1)"}} src="/Images/important.svg" alt=""/></span>
                    <span className="cardNav__done" onClick={()=>setDone(!done)}><img style={{transform: done? "scale(1.2)":"scale(1)"}} src="/Images/done.svg" alt=""/></span>
                    <span className="cardNav__delete" onClick={deleteItem}><img src="/Images/delete.svg" alt=""/></span>
                </div>}
            </li>
    );
};

export default TodoCard;



