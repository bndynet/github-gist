import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import service from './service';
import { Alert } from '../../ui';
import { Dispatch, Action } from 'redux';
import authActions from './actions';

class CallbackComponent extends React.Component<{
    onAuthSuccess: (token: string) => void;
}> {
    private error: string;

    constructor(props) {
        super(props);

        if (service.getTokenFromUrl()) {
            this.props.onAuthSuccess(service.getTokenFromUrl());
        } else {
            this.error = service.getErrorFromUrl();
        }
    }

    public render() {
        return (
            <Alert
                className={classNames('screen-center')}
                title={this.error ? 'Oops...' : 'Authorizing...'}
                message={this.error || 'Application is obtaining authorization from 3rd-party application, please waiting...'}
                variant={this.error ? 'error' : 'info'}
            />
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onAuthSuccess: (token: string) => {
        dispatch(authActions.authSuccess(token));
    },
});

export default connect(null, mapDispatchToProps)(CallbackComponent);
