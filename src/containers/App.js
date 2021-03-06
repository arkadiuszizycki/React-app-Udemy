/** @format */

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './App.css';
import { Layout, asyncComponent } from 'hoc';
import { BurgerBuilder } from 'containers/BurgerBuilder';
import { Logout } from 'containers/Auth';
import * as actions from 'store/actions';

const asyncCheckout = asyncComponent(() => {
    return import('containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('containers/Auth/Auth');
});

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }
    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <div className={classes.App}>
                <BrowserRouter>
                    <Layout>{routes}</Layout>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
