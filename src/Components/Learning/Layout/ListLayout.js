import React, {useEffect, useRef} from 'react';
import '../Style.scss'
import {CSSTransition, SwitchTransition} from "react-transition-group";


export const replaced = (name, space) => {
    return name.replace(/\s+/g, space ? ' ' : '')
};

const ListLayout = ({newItem, inputValue, setInputValue, addItem}) => {

    const inputRef = useRef();
    useEffect(() => {
        inputRef.current && inputRef.current.select()
    },[newItem]);
    return (
        <div className='learningList__item'>
            <div className="learningList__add">
                {newItem
                && <SwitchTransition component={false}>
                    <CSSTransition key={true} timeout={300} appear={true} classNames={'animInput'}>
                        <input type="text" ref={inputRef} autoFocus={true} value={inputValue}
                               onKeyDown={(e) => {
                                   addItem(e)
                               }}
                               onChange={(e) => setInputValue(replaced(e.target.value, true))}/>
                    </CSSTransition>
                </SwitchTransition>
                }
            </div>
        </div>
    );
};

export default ListLayout;