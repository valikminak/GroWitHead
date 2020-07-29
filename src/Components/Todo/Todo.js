import React, {useEffect, useRef, useState} from 'react';
import './style.scss'
import TodoBoard from "./TodoBoard";
import {Redirect, Route, Switch} from "react-router";
import {Link, NavLink} from "react-router-dom";
import {Home, ShowBoards} from "../../SVG/SVG";

let boardId = 1;

const Todo = ({history}) => {
    const [showBoards, setShowBoard] = useState(false);
    const [boardNameValue, setBoardNameValue] = useState('');
    const [board, setBoard] = useState(false);
    const [boardList, setNewBoard] = useState([]);
    const [activeBoardName, setActiveBoardName] = useState('Todo');
    const [activeBoardId, setActiveBoardId] = useState('');
    const [isChangeBoardName, setChangeBoardName] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [addList, setAddList] = useState(false);
    const createCardInputRef = useRef();
    const changeBoardNameRef = useRef();
    useEffect(() => {
        createCardInputRef.current && createCardInputRef.current.select()
    }, [board]);
    useEffect(() => {
        changeBoardNameRef.current && changeBoardNameRef.current.select();
    }, [isChangeBoardName]);
    const addNewBoard = (e) => {
        if ((boardNameValue.length > 0 && boardNameValue !== " " && e.key === "Enter") || (boardNameValue.length > 0 && boardNameValue !== " " && e.type === "click")) {
            setNewBoard([...boardList, {name: boardNameValue, id: boardId++, columns: []}]);
            setBoard(false);
            setBoardNameValue('')
        }
    };
    const closeCreateInput = (e) => {
        if (boardList.length > 0) {
            e.target.parentNode.className === "todoHeader__nav" || e.target.parentNode.parentNode.parentNode.className === "todoHeader__nav" ? setShowBoard(true) : setShowBoard(false);
        }
        if (e.target.className === "todo" || e.target.className === "todoContent" || e.target.className === "todoHeader__name" || e.target.className === "todoContent__boardName") {
            setBoard(false);
            setAddList(false);
            setBoardNameValue(boardNameValue);
        }
    };
    const isActiveBoard = (boardName) => {
        setActiveBoardName(boardName)
    };
    const changeBoardName = (e) => {
        if (activeBoardName.length > 0&&activeBoardName!==" ") {
            setNewBoard(boardList.map((boardListItem) =>
                boardListItem.id === activeBoardId ? {
                        ...boardListItem,
                        name: activeBoardName
                    }
                    : boardListItem));
            history.push(`/todo/${activeBoardName.replace(/\s+/g, '').toLowerCase()}${activeBoardId}`);
            setActiveBoardName(activeBoardName);
            setChangeBoardName(false);
        }

    };

    return (
        <div onClick={(e) => closeCreateInput(e)} className="todo">
            <div className="todoHeader">
                {showBoards
                    ? <div className="todoHeader__boardsList">{boardList?.map((board) => (
                        <NavLink activeClassName={"activeBoard"} key={board.id}
                                 to={`/todo/${board.name.replace(/\s+/g, '').toLowerCase()}${board.id}`}>
                            <span className="todoHeader__board">{board.name}</span>
                        </NavLink>))}
                    </div>
                    : <div>
                        <div className="todoHeader__title">
                                <span className="todoHeader__nav">
                                    <Link to={"/"}>
                                        <Home width={"70px"} height={"20px"}/>
                                    </Link>
                                        <ShowBoards onClick={() => setShowBoard(true)} height={"20px"} width={"100px"}/>
                                </span>
                            {!isChangeBoardName &&
                            <h1 onClick={() => activeBoardName !== "Todo" && setChangeBoardName(true)}>{activeBoardName}</h1>}
                            {isChangeBoardName
                            && <div className="todoHeader__change">
                                <textarea  ref={changeBoardNameRef} maxLength={30} spellCheck={false}
                                          value={activeBoardName} onChange={(e) => setActiveBoardName(e.target.value.replace(/\s+/g, ' '))}/>
                                <span onClick={changeBoardName}>
                                    Change
                                </span>
                            </div>}
                        </div>
                    </div>
                }
                <div className="todoHeader__name">
                    {board
                        ? <div className="todoHeader__addNewBoard">
                            <input
                                maxLength={20}
                                type="text"
                                ref={createCardInputRef}
                                autoFocus={true}
                                value={boardNameValue}
                                onKeyDown={(e) => addNewBoard(e)}
                                onChange={(e) => setBoardNameValue(e.target.value.replace(/\s+/g, ' '))}
                            />
                            <button onClick={(e) => addNewBoard(e)}>Create board</button>
                        </div>
                        : <span onClick={() => setBoard(true)} className="todoHeader__add">Create Board</span>
                    }
                </div>
            </div>
            <Switch>
                {boardList.map((board) => <Route key={board.id}
                                                 path={`/todo/${board.name.replace(/\s+/g, '').toLowerCase()}${board.id}`}
                                                 render={() => <TodoBoard
                                                     board={board} boardList={boardList}
                                                     inputValue={inputValue} setInputValue={setInputValue}
                                                     setNewBoard={setNewBoard}
                                                     addList={addList} setAddList={setAddList}
                                                     isActiveBoard={isActiveBoard}
                                                     activeBoardName={activeBoardName}
                                                     changeBoardName={changeBoardName}
                                                     isChangeBoardName={isChangeBoardName}
                                                     setActiveBoardId={setActiveBoardId}

                                                 />}/>)}
                {boardList.length === 1 &&
                <Redirect to={`/todo/${boardList[0].name.replace(/\s+/g, '').toLowerCase()}${boardList[0].id}`}/>}
            </Switch>
        </div>
    );
};

export default Todo;