import React from 'react';
import {NavLink} from "react-router-dom";

const LearningHeader = ({title}) => {
    return (
        <NavLink to={'/learning'}> <div className="learningHeader">
            {title}
        </div></NavLink>
    );
};

export default LearningHeader;