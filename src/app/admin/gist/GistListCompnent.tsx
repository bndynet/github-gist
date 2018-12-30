import * as React from 'react';
import classNames from 'classnames';
import { Grid, Theme, createStyles, withStyles, TextField, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { ContentHeader, Panel } from '../../../ui';
import { Gist } from '../../../helpers/github';
import { GridSpacing } from '@material-ui/core/Grid';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { adminGistActions, getState } from '.';
import { push, go } from 'connected-react-router';

const styles = (theme: Theme) =>
    createStyles({
        // nothing to do
    });

class GistListComponent extends React.Component<
    {
        classes: any;
        gists: Gist[];
        onListGists: () => void;
        onEditGist: (gist: Gist) => void;
        gotoEdit: (id: string) => void;
    },
    { }
> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        this.props.onListGists();
    }

    public render() {
        const { classes } = this.props;
        return (
            <div>
                <ContentHeader title='Gists' />
                <Grid container={true} spacing={16 as GridSpacing}>
                    {this.props.gists &&
                        this.props.gists.length > 0 &&
                        this.props.gists.map((gist) => (
                            <Grid item={true} sm={6} key={gist.id}>
                                <Panel
                                    title={gist.description}
                                    variant='primary'
                                    closeable={false}
                                    minimizeable={false}
                                    actions={[
                                        <IconButton key='2' onClick={() => this.edit(gist)}>
                                            <EditIcon />
                                        </IconButton>,
                                    ]}>
                                    {gist.description}
                                </Panel>
                            </Grid>
                        ))}
                </Grid>
            </div>
        );
    }

    private edit(gist: Gist) {
        this.props.onEditGist(gist);
        this.props.gotoEdit(gist.id);
    }
}

const mapStateToProps = (state) => ({
    gists: getState().gists,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onListGists: () => dispatch(adminGistActions.listGists()),
    onEditGist: (gist: Gist) => dispatch(adminGistActions.editGist(gist)),
    gotoEdit: (id: string) => dispatch(push(`/admin/gist/edit/${id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GistListComponent));
