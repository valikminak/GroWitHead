import React, {useReducer} from 'react';
import './Style.scss'
import {Route, Switch, withRouter} from "react-router-dom";
import Category from "./Category";
import Subjects from "./Subjects";
import Text from "./Text/Text";
import {learningReducer} from "../../Reducers/LearningReducer";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {replaced} from "./Layout/ListLayout";





const Learning = (props) => {
    const {match:{params:{category,text}}} = props;


    const [state, dispatch] = useReducer(
        learningReducer,
        []
    );


    return (
        <div className="learning">
            <Subjects dispatch={dispatch} subjects={state}/>
            <TransitionGroup component={null}>
                <CSSTransition key={category} exit={false} timeout={500} classNames={'animCategoryPage'}>
                    <Switch>
                        {state && state.map((subject) => <Route key={subject.id}
                                                                path={`/learning/${replaced(subject.name)}${subject.id}/:text?`}
                                                                render={() => <Category dispatch={dispatch}
                                                                                        subject={subject}/>}/>)}
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <TransitionGroup component={null}>
                <CSSTransition key={text} exit={false} timeout={500} classNames={'animTextPage'}>
                    <Switch>
                        {state && state.map((subject) => subject.category.map((category) =>
                            <Route
                                path={`/learning/${replaced(subject.name)}${subject.id}/${replaced(category.name)}${category.id}`}
                                render={() => <Text dispatch={dispatch} subject={subject} category={category}/>}/>))}
                    </Switch>
                </CSSTransition>
            </TransitionGroup>

        </div>
    )
        ;
};

export default withRouter(Learning);