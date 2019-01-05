import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { GridSpacing } from '@material-ui/core/Grid';
import { Theme, createStyles, withStyles, Grid, IconButton, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import _groupBy from 'lodash-es/groupBy';
import _countBy from 'lodash-es/countBy';

import { Alert, PageHeader, Panel, MiniCard, Tag } from '../../../ui';
import SimpleLineChart from './SimpleLineChart';
import FormatterPanel from './FormaterPanel';
import { User } from '../../../helpers/github';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { getState as getGithubState, Activity } from '../../_service/github';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Legend, Line } from 'recharts';

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

class DashboardComponent extends React.Component<
    {
        classes: any;
        user: User;
        activities: Activity[];
    },
    {}
> {

    public render() {
        const { classes, activities } = this.props;
        const repos = [];
        const chartData: {name: string}[] = [];
        const groups = _groupBy(activities, (activity: Activity) => {
            return activity.created_at.split('T')[0];
        });
        Object.keys(groups).forEach((key) => {
            const counts = _countBy(groups[key], 'repo.name');
            chartData.push({name: key, ...counts});
            Object.keys(counts).forEach((repo) => {
                if (repos.indexOf(repo) < 0) {
                    repos.push(repo);
                }
            });
        });

        return (
            <div data-name='top'>
                <PageHeader
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

                <PageHeader title='GitHub Activities' />
                <Typography component='div' className={classes.chartContainer}>
                    <ResponsiveContainer width='99%' height={320}>
                        <LineChart data={chartData}>
                            <XAxis dataKey='name' />
                            <YAxis />
                            <CartesianGrid vertical={false} strokeDasharray='3 3' />
                            <Legend />
                            {repos && repos.map((repo) => (
                                <Line type='monotone' dataKey={repo} activeDot={{ r: 8 }} />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </Typography>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    activities: getGithubState().activities,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardComponent));
