import React, {useEffect, useRef, useState} from 'react';
import './style.scss'
import TodoBoard from "./TodoBoard";
import {Redirect, Route, Switch} from "react-router";
import {Link} from "react-router-dom";

let boardId = 1;

const Todo = () => {
    const [showBoards, setShowBoard] = useState(false);
    const [boardNameValue, setBoardNameValue] = useState('');
    const [board, setBoard] = useState(false);
    const [boardList, setNewBoard] = useState([]);
    const [activeBoardName, setActiveBoardName] = useState('Todo');
    const [inputValue, setInputValue] = useState('');
    const [addList, setAddList] = useState(false);
    const createCardInputRef = useRef();

    useEffect(() => {
        createCardInputRef.current && createCardInputRef.current.select()
    }, [board]);

    const addNewBoard = (e) => {
        if ((boardNameValue.length > 0 && boardNameValue !== " " && e.key === "Enter") || (boardNameValue.length > 0 && boardNameValue !== " " && e.type === "click")) {
            setNewBoard([...boardList, {name: boardNameValue, id: boardId++, columns: []}]);
            setBoard(false);
            setBoardNameValue('')
        }
    };

    const closeCreateInput = (e) => {
        if (e.target.className !== "todoHeader__boards" && e.target.tagName !== "IMG") {
            setShowBoard(false);
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

    return (
            <div onClick={(e) => closeCreateInput(e)} className="todo">
                <div className="todoHeader">
                    {showBoards
                        ? <div className="todoHeader__boardsList">{boardList?.map((board) => (
                            <Link key={board.id}
                                  to={`/todo/${board.name.replace(/\s+/g, '').toLowerCase()}${board.id}`}>
                                <span className="todoHeader__board">{board.name}</span>
                            </Link>))}
                        </div>
                        : <div>
                            <div className="todoHeader__title">
                            <span className="todoHeader__boards"
                                  onClick={() => boardList.length > 0 && setShowBoard(true)}>
                                boards
                                <img src="/Images/showBoards.svg" alt="Boards"/>
                            </span>
                                <h1>{activeBoardName}</h1>
                            </div>
                        </div>
                    }
                    <div className="todoHeader__name">
                        {board
                            ? <div className="todoHeader__addNewBoard">
                                <input type="text"
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
                                                     />}/>)}
                    {boardList.length === 1 &&
                    <Redirect to={`/todo/${boardList[0].name.replace(/\s+/g, '').toLowerCase()}${boardList[0].id}`}/>}
                </Switch>
            </div>
    );
};

export default Todo;