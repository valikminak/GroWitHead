import React from 'react';
import './Style.scss'
import {Link} from "react-router-dom";

const MainPage = () => {
    return (
        <div className="main">
            <div className="mainLogo">
                <img src="/Images/GroWitHead.png" alt="Logo"/>
            </div>
            <div className="mainList">
                <Link to={'/learning'}>
                    <div className="mainList__choice learning">
                        Learning
                    </div>
                </Link>
                <Link to={'/todo'}>
                    <div className="mainList__choice todo">
                        Todo
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default MainPage;