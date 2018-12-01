
import * as React from 'react';

import SimpleLineChart from './SimpleLineChart';
import Typography from '@material-ui/core/Typography';
import { GridSpacing } from "@material-ui/core/Grid";
import { Theme, createStyles, withStyles, Grid } from '@material-ui/core';

import ContentHeader from '../../common/ContentHeader';
import Alert from '../../common/Alert';

const styles = (theme: Theme) => (
    createStyles({
        contentHeader: {
            display: 'flex',
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
            marginBottom: theme.spacing.unit,
            '& h2': {
                flex: 1,
            }
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
            }
        },
        chartContainer: {

        },
    })
);

const renderAlert = (props) => {
    return (
        <Grid item xs={6}>
            <Alert title='OK' message='dddd' variant={props.variant} shadow={props.shadow} square={props.square} closeable={props.closeable}/>
        </Grid>
    );
};

class DashboardComponent extends React.Component<{
    classes: any,
}, {}> {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <ContentHeader title='Dashboard' navigation={{
                    'Home': '/home',
                    'Dashboard': '/admin/dashboard',
                    'Current': '',
                }}></ContentHeader>
                <Typography component="div" className={classes.chartContainer}>
                    <SimpleLineChart />
                </Typography>

                <Grid container spacing={16 as GridSpacing}>
                    {renderAlert({variant: 'info', square: true, closeable: true, shadow: 0})}
                    {renderAlert({variant: 'success', square: true, closeable: true, shadow: 0})}
                    {renderAlert({variant: 'warning', square: false, closeable: false, shadow: 3})}
                    {renderAlert({variant: 'error', square: false, closeable: false, shadow: 3})}
                </Grid>
            </div>
        );
    };
}

export default withStyles(styles)(DashboardComponent);