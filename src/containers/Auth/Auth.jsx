import React, {Component} from "react";
import classes from './Auth.module.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

export default class Auth extends Component {
    loginHandler = () => {
    }

    regHandler = () => {
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        <Input label='Email'/>
                        <Input label='Пароль' errorMessage={'test'}/>
                        <Button type='success' onClick={this.loginHandler}>Вход</Button>
                        <Button type='primary' onClick={this.regHandler}>Регистрация</Button>
                    </form>
                </div>
            </div>
        )
    }
}