import "@bndynet/dialog/dist/dialog.css";

import * as React from "react";
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
import DeleteIcon from "@material-ui/icons/Delete";

import { PageHeader, Panel } from "../../../ui";
import { Gist } from "../../../helpers/github";
import { Dispatch, Action } from "redux";
import { connect } from "react-redux";
import { adminGistActions, getState } from ".";
import { push } from "connected-react-router";
import { confirm, notify } from "@bndynet/dialog";

const styles = (theme: Theme) =>
    createStyles({
        // nothing to do
        actionsCell: {
            width: 140,
        },
        datetimeCell: {
            width: 240,
        },
        miniCell: {
            width: 80,
        },
    });

class GistListComponent extends React.Component<
    {
        classes: any;
        gists: Gist[];
        onListGists: () => void;
        onEditGist: (gist: Gist) => void;
        gotoEdit: (id: string) => void;
        onRemoveGist: (gist: Gist, callback: () => void) => void;
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
                <Table className={classes.table} cellPadding={0}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="center" className={classes.miniCell}>Files</TableCell>
                            <TableCell align="center" className={classes.miniCell}>Public</TableCell>
                            <TableCell className={classes.datetimeCell}>Modified</TableCell>
                            <TableCell align="center" className={classes.actionsCell}>Actions</TableCell>
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
                                    <TableCell align="center">{gist.files && Object.keys(gist.files).length}</TableCell>
                                    <TableCell align="center">
                                        {gist.public ? <i className="fas fa-check" /> : <i className="fas fa-lock" />}</TableCell>
                                    <TableCell>{gist.updated_at}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => this.edit(gist)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => this.remove(gist)}>
                                            <DeleteIcon />
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

    private remove(gist: Gist) {
        confirm("Are you sure you want to remove this Gist?", () => {
            this.props.onRemoveGist(gist, () => {
                notify("Removed successfully.", "success");
                this.props.onListGists();
            });
        });
    }
}

const mapStateToProps = (state) => ({
    gists: getState().gists,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onListGists: () => dispatch(adminGistActions.listGists()),
    onEditGist: (gist: Gist) => dispatch(adminGistActions.editGist(gist)),
    gotoEdit: (id: string) => dispatch(push(`/admin/gist/edit/${id}`)),
    onRemoveGist: (gist: Gist, callback: () => void) => dispatch(adminGistActions.removeGist(gist, callback)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(GistListComponent));
