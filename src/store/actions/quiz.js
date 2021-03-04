import axios from "../../axios/axios-quiz";
import {FETCH_QUIZ_SETSTATE, FETCH_QUIZES_START, FINISHED_QUIZ, QUIZ_NEXT_QUESTION, RETRY_QUIZ} from "./actionTypes";
import {FETCH_QUIZES_SUCCESS} from "./actionTypes";
import {FETCH_QUIZES_ERROR} from "./actionTypes";
import {FETCH_QUIZ_SUCCESS} from "./actionTypes";

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quiz.json')
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `тест №${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START,

    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function fetchQuizByID(quizID) {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quiz/${quizID}.json`)
            const quiz = response.data
            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function finishedQuiz() {
    return {
        type: FINISHED_QUIZ,

    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ,
    }
}


export function quizSetState(answerState, results) {
    return {
        type: FETCH_QUIZ_SETSTATE,
        answerState, results
    }
}

export function quizAnswerClick(answerID) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results;

        if (question.rightAnswerID === answerID) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({[answerID]: 'success'},
                results))

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishedQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }

                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerID]: 'error'},
                results))
        }
    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}