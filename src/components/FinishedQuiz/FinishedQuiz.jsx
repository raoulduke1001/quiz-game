import React from 'react';
import classes from './FinishedQuiz.module.css'

const FinishedQuiz = props => {

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                <li>
                    <strong>1.</strong>
                    Question
                    <i className={'fa fa-times ' + classes.error}/>
                </li>
                <li>
                    <strong>1.</strong>
                    Question
                    <i className={'fa fa-check ' + classes.success}/>
                </li>
            </ul>
            <p> 4 of 100</p>
            <div>
                <button>replay</button>
            </div>
        </div>
    )
}
export default FinishedQuiz