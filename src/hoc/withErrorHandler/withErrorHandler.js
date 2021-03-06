/** @format */

import React, { Component } from 'react';

import { Modal } from 'components/UI';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(
                null,
                (req) => {
                    this.setState({ error: null });
                    return req;
                },
            );
            this.resInterceptor = axios.interceptors.response.use(
                (res) => res,
                (error) => {
                    this.setState({ error });
                },
            );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmHandler = () => {
            this.setState({ error: null });
        };
        render() {
            return (
                <React.Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    };
};

export default withErrorHandler;
