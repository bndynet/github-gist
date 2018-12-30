import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { GridSpacing } from '@material-ui/core/Grid';
import { Theme, createStyles, withStyles, Grid, IconButton } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { Alert, ContentHeader, Panel, MiniCard, Tag } from '../../../ui';
import SimpleLineChart from './SimpleLineChart';
import FormatterPanel from './FormaterPanel';
import { User } from '../../../helpers/github';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

const styles = (theme: Theme) =>
    createStyles({
        contentHeader: {
            display: 'flex',
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
            marginBottom: theme.spacing.unit,
            '& h2': {
                flex: 1,
            },
        },
        breadcrumb: {
            display: 'flex',
            '& > *': {
                alignSelf: 'flex-end',
                textDecoration: 'none',
            },
            '& > *:not(:last-child):after': {
                content: '">"',
                display: 'inline-block',
                marginLeft: 5,
                marginRight: 5,
            },
        },
        chartContainer: {},
    });

const renderAlert = (props) => {
    /* tslint:disable */
    return (
        <Grid item={true} sm={6}>
            <Alert
                title='Alert Title'
                message='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.'
                variant={props.variant}
                shadow={props.shadow}
                square={props.square}
                closeable={props.closeable}
            />
        </Grid>
    );
};

const renderPanel = (props) => {
    return (
        <Grid item={true} sm={6}>
            <Panel
                title='Panel Title'
                variant={props.variant}
                closeable={props.closeable}
                minimizeable={props.minimizeable}
                actions={props.actions}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam
                beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat
                deleniti? Eum quasi quidem quibusdam.
            </Panel>
        </Grid>
    );
};

class DashboardComponent extends React.Component<
    {
        classes: any;
        user: User;
    },
    {}
> {
    public render() {
        const { classes } = this.props;
        return (
            <div data-name='top'>
                <ContentHeader
                    title='Dashboard'
                    navigation={{
                        Home: '/',
                        Dashboard: null,
                    }}
                />
                <Grid container={true} spacing={16 as GridSpacing}>
                    <Grid item={true} md={3} xs={6}>
                        <MiniCard
                            title={this.props.user.public_gists}
                            description='Public Gists'
                            links={[[ 'More info', '/admin/gist/list' ]]}
                            variant='info'
                            icon={<ShoppingCartIcon />}
                        />
                    </Grid>
                    <Grid item={true} md={3} xs={6}>
                        <MiniCard
                            title={this.props.user.public_repos}
                            description='Public Repos'
                            links={[[ 'More info', `https://github.com/${this.props.user.login}?tab=repositories` ]]}
                            variant='success'
                            icon={<ShoppingCartIcon />}
                        />
                    </Grid>
                    <Grid item={true} md={3} xs={6}>
                        <MiniCard
                            title={this.props.user.followers}
                            description='Followers'
                            links={[[ 'More info', `https://github.com/${this.props.user.login}?tab=followers`]]}
                            variant='warning'
                            icon={<ShoppingCartIcon />}
                        />
                    </Grid>
                    <Grid item={true} md={3} xs={6}>
                        <MiniCard
                            title={this.props.user.following}
                            description='Following'
                            links={[[ 'More info', `https://github.com/${this.props.user.login}?tab=following`]]}
                            variant='error'
                            icon={<ShoppingCartIcon />}
                        />
                    </Grid>
                </Grid>

                <ContentHeader title='Chart' />
                <Typography component='div' className={classes.chartContainer}>
                    <SimpleLineChart />
                </Typography>

                <ContentHeader title='Alerts' />
                <Grid container={true} spacing={16 as GridSpacing}>
                    {renderAlert({ variant: 'info', square: true, closeable: false })}
                    {renderAlert({ variant: 'success', square: true, closeable: false })}
                    {renderAlert({ variant: 'warning', square: false, closeable: true, shadow: 3 })}
                    {renderAlert({ variant: 'error', square: false, closeable: true, shadow: 3 })}
                </Grid>

                <ContentHeader title='Panels' />
                <Grid container={true} spacing={16 as GridSpacing}>
                    {renderPanel({ variant: 'info' })}
                    {renderPanel({ variant: 'success' })}
                    {renderPanel({ variant: 'warning', closeable: true, minimizeable: true })}
                    {renderPanel({
                        variant: 'error',
                        closeable: true,
                        minimizeable: true,
                        actions: [
                            <Tag key='1' variant='error'>8 New Members</Tag>,
                            <IconButton key='2' onClick={() => alert('Help')}>
                                <HelpIcon />
                            </IconButton>,
                        ],
                    })}
                </Grid>

                <ContentHeader title='Formatters' />
                <FormatterPanel />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardComponent));
