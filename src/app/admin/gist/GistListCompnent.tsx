import * as React from "react";
import classNames from "classnames";
import {
    Theme,
    createStyles,
    withStyles,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { PageHeader, Panel } from "../../../ui";
import { Gist } from "../../../helpers/github";
import { Dispatch, Action } from "redux";
import { connect } from "react-redux";
import { adminGistActions, getState } from ".";
import { push } from "connected-react-router";

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
    {}
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
                <PageHeader title={"Gists (" + this.props.gists.length + ")"} />
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Files</TableCell>
                            <TableCell align="right">Public</TableCell>
                            <TableCell align="right">Modified</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.gists &&
                            this.props.gists.length > 0 &&
                            this.props.gists.map((gist) => (
                                <TableRow key={gist.id}>
                                    <TableCell component="th" scope="row">
                                        <a href={gist.html_url} target="_blank">{gist.description}</a>
                                    </TableCell>
                                    <TableCell align="right">{gist.files && Object.keys(gist.files).length}</TableCell>
                                    <TableCell align="right">
                                        {gist.public ? <i className="fas fa-check" /> : <i className="fas fa-lock" />}</TableCell>
                                    <TableCell>{gist.updated_at}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => this.edit(gist)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(GistListComponent));
