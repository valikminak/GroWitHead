import React from 'react';
import {NavLink} from "react-router-dom";

const LearningLayout = ({nameTitle,nameSubject}) => {
    return (
        <div className="learning">
            <div className="learningHeader">
                <NavLink to={'/learning'}><h2 className="learningTitle">{nameTitle}</h2></NavLink>
            </div>
            <div className='learningList'>
                <div className="learningAdd">
                    <p>
                       + Add subject
                    </p>
                </div>
                <div className="learningList">
                    <ul>
                        {nameSubject.map((subject)=><li><NavLink to={`/learning/${subject.toLowerCase()}`}>{subject}</NavLink></li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LearningLayout;