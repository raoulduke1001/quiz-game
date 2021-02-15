import React, {Component} from "react";
import classes from './QuizList.module.css';
import {NavLink} from "react-router-dom";
import axios from "axios";

export default class QuizList extends Component {
    renderQuizes() {
        return [1, 2, 3].map((quiz, index) => {
            return (
                <li key={index}>
                    <NavLink to={'/quiz/' + quiz}>
                        тест {quiz}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        axios.get('https://newproject-79cfb-default-rtdb.firebaseio.com/quiz.json').then(response => {
            console.log(response)
        })
    }


    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    <ul>
                        {this.renderQuizes()}
                    </ul>
                </div>
            </div>
        )
    }
}