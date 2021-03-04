import {
    FETCH_QUIZ_SETSTATE,
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_START,
    FINISHED_QUIZ,
    QUIZ_NEXT_QUESTION, RETRY_QUIZ
} from "../actions/actionTypes";
import {FETCH_QUIZES_ERROR} from "../actions/actionTypes";
import {FETCH_QUIZES_SUCCESS} from "../actions/actionTypes";


const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null
}

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {...state, loading: true}
        case FETCH_QUIZES_SUCCESS:
            return {...state, loading: false, quizes: action.quizes}
        case FETCH_QUIZES_ERROR:
            return {...state, loading: false, error: action.error}
        case FETCH_QUIZ_SUCCESS:
            return {...state, loading: false, quiz: action.quiz}
        case FETCH_QUIZ_SETSTATE:
            return {...state, answerState: action.answerState, results: action.results}
        case FINISHED_QUIZ:
            return {...state, isFinished: true}
        case QUIZ_NEXT_QUESTION:
            return {...state, answerState: null, activeQuestion: action.number}
        case RETRY_QUIZ:
            return {...state, activeQuestion: 0, answerState: null, isFinished: false, results: {}}
        default:
            return state
    }
}