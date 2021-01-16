import React, {Component} from "react";
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerID: 2,
                id: 1,
                answers: [
                    {text: 'черный', id: 1},
                    {text: 'синий', id: 2},
                    {text: 'красный', id: 3},
                    {text: 'зеленый', id: 4}
                ]
            },
            {
                question: 'Когда была основана Москва?',
                rightAnswerID: 4,
                id: 2,
                answers: [
                    {text: '1989', id: 1},
                    {text: '1991', id: 2},
                    {text: '1488', id: 3},
                    {text: '1147', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerID) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }


        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results;

        if (question.rightAnswerID === answerID) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerID]: 'success'},
                results
            })


            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerID]: 'error'},
                results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({activeQuestion: 0, answerState: null, isFinished: false, results: {}})
    }

    componentDidMount() {
        console.log('Quiz ID = ', this.props.match.params.id)
    }


    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {this.state.isFinished
                        ? <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        : <ActiveQuiz
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />}

                </div>
            </div>
        )
    }
}

export default Quiz