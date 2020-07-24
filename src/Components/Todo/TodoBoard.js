import React, {useEffect, useRef} from 'react';
import TodoColumn from "./TodoColumn";
import {DragDropContext} from "react-beautiful-dnd";

let listId = 1000;

const TodoBoard = ({board, boardList, inputValue, setInputValue, setNewBoard, addList, setAddList, isActiveBoard}) => {
    const newColumnNameRef = useRef();

    useEffect(() => {
        isActiveBoard(board.name)
    }, []);
    useEffect(() => {
        newColumnNameRef.current && newColumnNameRef.current.focus();
        newColumnNameRef.current && newColumnNameRef.current.select()
    }, [addList]);


    const addAnotherColumn = (e) => {
        if ((inputValue.length > 0 && inputValue !== " " && e.key === "Enter") || (inputValue.length > 0 && inputValue !== " " && e.type === "click")) {
            setNewBoard(boardList.map((item) => item.id === board.id
                ? {
                    ...item,
                    columns: [...item.columns, {name: inputValue, id: listId++, cards: []}]
                }
                : item
            ));
            setInputValue("");
        }

    };
    const handleDragEnd = () => {

    };
    return (
        <div className="todoContent">
            <DragDropContext onDragEnd={handleDragEnd}>
                {board.columns && board.columns.map((column) => {
                        return (
                            <TodoColumn key={column.id} board={board}
                                        boardList={boardList}
                                        column={column} setNewBoard={setNewBoard}/>
                        )
                    }
                )}
            </DragDropContext>
            {!addList && board.columns.length === 0 &&
            <div onClick={() => setAddList(true)} className="todoContent__add">
                Add new list
            </div>}
            {!addList && board.columns.length > 0 &&
            <div onClick={() => setAddList(true)} className="todoContent__add">
                Add another one column
            </div>}
            {addList && <div className="todoContent__input">
                <input placeholder="Enter a list title"
                       ref={newColumnNameRef}
                       onKeyDown={(e) => addAnotherColumn(e)}
                       value={inputValue}
                       onChange={(e) => setInputValue(e.target.value.replace(/\s+/g, ' '))} type="text"/>
                <div>
                    <button onClick={(e) => addAnotherColumn(e)}>Add list</button>
                </div>
            </div>}
        </div>
    );
};

export default TodoBoard;