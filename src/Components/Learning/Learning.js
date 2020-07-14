import React, {useReducer} from 'react';
import './Style.scss'
import {Route, Switch} from "react-router-dom";
import Category from "./Category";
import Subjects from "./Subjects";
import Text from "./Text/Text";
import {learningReducer} from "../../Reducers/LearningReducer";




const Learning = () => {
    const [state, dispatch] = useReducer(
        learningReducer,
        [
        ]
    );

    return (
        <div className="learning">
            <Subjects dispatch={dispatch} subjects={state}/>
            <Switch>
                {state && state.map((subject) => <Route key={subject.id} path={`/learning/${subject.name.toLowerCase()}/:text?`}
                                                     render={()=><Category dispatch={dispatch} subject={subject}/>} />)}
            </Switch>
            <Switch>
                {state&&state.map((subject)=> subject.category.map((category)=><Route path={`/learning/${subject.name}/${category.name}`}
                                                                                    render={()=> <Text dispatch={dispatch} subject={subject} category={category} />} />))}
            </Switch>
        </div>
    );
};

export default Learning;