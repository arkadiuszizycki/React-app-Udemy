/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { withLoading } from 'hoc';
import { Button, Input } from 'components/UI';
import classes from 'containers/Auth/Auth.css';
import * as actions from 'store/actions';
import { updateObject } from 'shared/utility';
import { checkValidity } from 'shared/validation';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        isSignup: true,
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler(event, controlName) {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation,
                ),
                touched: true,
            }),
        });
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup,
        );
    };

    switchAuthModeHandler = () => {
        this.setState((prevState) => {
            return { isSignup: !prevState.isSignup };
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }
        let form = formElementsArray.map((formElement) => (
            <Input
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                key={formElement.id}
                value={formElement.config.value}
                changed={(event) =>
                    this.inputChangedHandler(event, formElement.id)
                }
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
            />
        ));

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) =>
            dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withLoading(Auth));
