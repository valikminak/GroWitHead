import React from 'react';
import {Route, Switch} from "react-router";
import './Style.scss'

import Learning from "../Learning/Learning";
import Todo from "../Todo/Todo";
import MainPage from "../MainPage/MainPage";

const App = () => {
    return (
        <div className="app">
                    <Switch>
                        <Route path={'/'} component={MainPage} exact/>
                        <Route path={'/learning/:category?/:text?'} component={Learning}/>
                        <Route path={'/todo/:name?'} component={Todo}/>
                    </Switch>
        </div>

    );
};

export default App
