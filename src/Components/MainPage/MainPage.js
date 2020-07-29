import React from 'react';
import './Style.scss'
import {Link} from "react-router-dom";

const MainPage = () => {
    return (
        <div className="main">
            <div className="mainLogo">
                <img src="https://res.cloudinary.com/minak/image/upload/v1595687487/GroWitHead/GroWitHead_hqtaos.png" alt="Logo"/>
            </div>
            <div className="mainList">
                <Link to={'/todo'}>
                    <div className="mainList__choice todo">
                        Todo
                    </div>
                </Link>
                <Link to={'/learning'}>
                    <div className="mainList__choice learning">
                        Learning
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default MainPage;