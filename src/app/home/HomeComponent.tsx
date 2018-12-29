import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

import { actions as authActions, getState as getAuthState, UserInfo } from '../auth';
import homeActions from './actions';
import globalActions from '../global/actions';

import { LocaleType } from '../../locales';
import { GitHubIcon } from '../../ui';

const styles = (theme: Theme) =>
    createStyles({
        '@global': {
            body: {
                paddingTop: theme.spacing.unit * 4,
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.default,
            },
            '.markdown-body a': {
                color: theme.palette.text.primary,
                textDecoration: 'underline',
            },
        },
        main: {
            maxWidth: 845,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        logo: {
            fill: theme.palette.text.primary,
            marginRight: theme.spacing.unit * 4,
            transform: 'scale(1.5)',
        },
        forkMe: {
            position: 'absolute',
            top: 0,
            right: 0,
            border: 0,
        },
        btn: {
            marginRight: theme.spacing.unit,
            marginBottom: theme.spacing.unit * 4,
            padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
        },
    });

interface HomeComponentProps {
    classes: any;
    readme: string;
    onAuth(): void;
    onLogout(): void;
    onPreLogout(): void;
    onGetReadme(): void;
    onChangeLocale(locale: string): void;
}

interface HomeComponentState {
    logoutDelay?: number;
    showREADME: boolean;
}

class HomeComponent extends React.Component<HomeComponentProps, HomeComponentState> {
    private interval: any;
    private user: UserInfo;

    constructor(props: HomeComponentProps) {
        super(props);
        this.handleStart = this.handleStart.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            logoutDelay: null,
            showREADME: false,
        };
        this.user = getAuthState().user;
    }

    public componentWillMount() {
        this.props.onGetReadme();
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.body}>
                <a href='https://github.com/bndynet/github-gist'>
                    <img
                        className={classes.forkMe}
                        src='https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png'
                        alt='Fork me on GitHub'
                    />
                </a>
                <main className={classes.main}>
                    <Typography variant='h3' component='h1'>
                        <GitHubIcon classNames={classes.logo} />
                        GitHub Gist
                    </Typography>
                    <br /><br />
                    <Typography variant='body1' component='p'>
                        The gist management platform for your GitHub which is based on admin-template-for-react project.
                        Here you can manage your gists on GitHub and create, update and remove them.
                        Important is that easy to write your gists with Markdown language because of the integrated Markdown Editor.
                    </Typography>
                    <br /><br />
                    <Button variant='contained' color='primary' className={classes.btn} onClick={this.handleStart}>
                        Start Your Gist
                    </Button>
                    <Button color='primary' className={classes.btn} onClick={() => this.setState({showREADME: !this.state.showREADME})}>
                        Project README.md
                    </Button>
                    <Collapse in={!!this.state.showREADME} timeout='auto'>
                        <hr />
                        <ReactMarkdown source={this.props.readme} className={'markdown-body'} />
                    </Collapse>
                </main>
            </div>
        );
    }

    private handleLogout() {
        this.setState({
            logoutDelay: 5,
        });
        this.props.onPreLogout();
        this.interval = setInterval(() => {
            const delay = this.state.logoutDelay - 1;
            this.setState({
                logoutDelay: delay,
            });
            if (delay <= 0) {
                clearInterval(this.interval);
                this.props.onLogout();
                return;
            }
        }, 1000);
    }

    private handleStart() {
        if (!this.user) {
            this.props.onAuth();
        } else {
            push('/admin');
        }
    }

}

const mapStateToProps = (state) => ({
    readme: state.home.readme,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onAuth: () => {
        dispatch(authActions.auth());
    },
    onLogout: () => {
        dispatch(authActions.logout());
    },
    onPreLogout: () => {
        dispatch(
            globalActions.notify({
                message: 'Logging out...',
                variant: 'info',
                duration: 5000,
                placement: 'bottom left',
            }),
        );
    },
    onGetReadme: () => {
        dispatch(homeActions.getReadme());
    },
    onChangeLocale: (locale: LocaleType) => {
        dispatch(globalActions.changeLocale(locale));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeComponent));
