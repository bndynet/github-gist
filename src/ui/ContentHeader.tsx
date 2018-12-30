import * as React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
    createStyles({
        contentHeader: {
            display: 'flex',
            paddingTop: theme.spacing.unit * 3,
            paddingBottom: theme.spacing.unit,
            marginBottom: theme.spacing.unit,
            '& h2': {
                flex: 1,
            },
        },
        breadcrumb: {
            display: 'flex',
            '& > *': {
                alignSelf: 'flex-end',
                color: theme.palette.text.primary,
                textDecoration: 'none',
            },
            '& > *:not(:last-child):after': {
                content: '">"',
                display: 'inline-block',
                marginLeft: 5,
                marginRight: 5,
            },
            '& > span': {
                color: theme.palette.text.disabled,
            },
        },
        chartContainer: {},
    });

const renderNavItem = (navigation) => {
    const items = [];
    for (const key of Object.keys(navigation)) {
        items.push(navigation[key] ? <Link key={key} to={navigation[key]}>{key}</Link> : <span key={key}>{key}</span>);
    }
    return items;
};

class ContentHeader extends React.Component<{ classes: any; title: string; navigation?: object }, {}> {
    public render() {
        const { classes, title, navigation } = this.props;
        return (
            <div className={classes.contentHeader}>
                <Typography component='h2' variant='h5'>
                    {title}
                </Typography>
                {navigation && (
                    <Typography variant='caption' className={classes.breadcrumb}>
                        {renderNavItem(navigation)}
                    </Typography>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(ContentHeader);
