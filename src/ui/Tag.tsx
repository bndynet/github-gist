import * as React from 'react';
import classNames from 'classnames';

import { createStyles, Theme, withStyles, Typography } from '@material-ui/core';

import { variantColor } from '../theme';

const styles = (theme: Theme) =>
    createStyles({
        ...variantColor(theme),
        root: {
            borderRadius: 3,
            display: 'inline-block',
            fontSize: '0.75rem',
            lineHeight: '1em',
            padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 2}px`,
        },
        spacing: {
            marginBottom: theme.spacing.unit,
            marginRight: theme.spacing.unit,
        },
    });

class Tag extends React.Component<{ classes: any; variant: string; hasSpacing?: boolean }> {
    public render() {
        const { classes, variant, hasSpacing } = this.props;
        return (
            <Typography
                color='inherit'
                variant='caption'
                className={classNames(classes.root, classes[variant], hasSpacing && classes.spacing)}
            >
                {this.props.children}
            </Typography>
        );
    }
}

export default withStyles(styles)(Tag);
