import React, {useState} from 'react';
import './style.scss'
import TodoColumn from "./TodoColumn";


let listId = 1;

const Todo = () => {
    const [inputValue, setInputValue] = useState('');
    const [addList, setAddList] = useState(false);
    const [columns, setNewColumn] = useState([]);


    const addAnotherColumn = () => {
        if (inputValue.length > 0) {
                setNewColumn([...columns, {name: inputValue, id: listId++, card: []}]);
                setInputValue("");
        }

    };

    return (
            <div className="todo">
                <div className="todoHeader">
                    <h1 className="todoHeader__title">Todo</h1>
                    <div className="todoHeader__name">
                        <h2>Name</h2>
                        <span>+</span>
                    </div>
                </div>
                <div className="todoContent">
                    {columns && columns.map((column) => <TodoColumn
                                                                    key={column.id} column={column} columns={columns}
                                                                    inputValue={inputValue} setInputValue={setInputValue}
                                                                    setAddList={setAddList}
                                                                    setNewColumn={setNewColumn}
                    />)}
                    {!addList && columns.length === 0 &&
                    <div onClick={() => setAddList(true)} className="todoContent__add">
                        Add new list
                    </div>}
                    {!addList && columns.length > 0 &&
                    <div onClick={() => setAddList(true)} className="todoContent__add">
                        Add another one column
                    </div>}
                    {addList && <div className="todoContent__input">
                        <input placeholder="Enter a list title" autoFocus={true} value={inputValue}
                               onChange={(e) => setInputValue(e.target.value)} type="text"/>
                        <div>
                            <button onClick={addAnotherColumn}>Add list</button>
                        </div>
                    </div>}
                </div>
            </div>
    );
};

export default Todo;