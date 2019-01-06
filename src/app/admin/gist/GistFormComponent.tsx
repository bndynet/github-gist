import * as React from 'react';
import { match } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Theme, createStyles, withStyles, TextField, FormControlLabel, Switch, Button } from '@material-ui/core';

import { PageHeader, MdEditor } from '../../../ui';
import { adminGistActions, getState } from '.';
import { globalActions, KEY_THEME } from '../../global';
import storage from '../../../storage';

const styles = (theme: Theme) =>
    createStyles({
        editor: {
            height: 'calc(100vh - 250px)',
            marginTop: 15,
        },
        preview: {
            height: 'calc(100vh - 250px)',
            overflow: 'auto',
            border: `1px solid ${theme.palette.divider}`,
            marginLeft: theme.spacing.unit,
            marginTop: theme.spacing.unit * 2,
            padding: theme.spacing.unit * 3,
            borderRadius: 4,
        },
        switch: {
            paddingLeft: 16,
        },
    });

class GistFormComponent extends React.Component<
    {
        classes: any;
        match: match<{id: string}>,
        theme: string;
        onCreateGist: (title: string, content: string, isPrivate: boolean, resolve: () => void) => void;
        onUpdateGist: (id, title, content, isPrivate, resolve: () => void) => void;
        onGetGistDetail: (id: string, resolve: () => void) => void;
        onShowMsg: (msg: string) => void;
    },
    { gistId: string, gistTitle: string, gistContent: string, isPrivate: boolean }
> {
    constructor(props) {
        super(props);
        this.state = {
            gistId: this.props.match.params.id,
            gistTitle: '',
            gistContent: '',
            isPrivate: false,
        };
    }

    public componentDidMount() {
        if (this.state.gistId) {
            this.props.onGetGistDetail(this.state.gistId, () => {
                this.resetState();
            });
        }
    }

    public render() {
        const { classes } = this.props;
        return (
            <div>
                <PageHeader
                    title={this.state.gistId ? 'Edit Gist' : 'New Gist'}
                    toolbox={(
                        <div>
                            <FormControlLabel className={classNames(classes.switch)} control={<Switch checked={this.state.isPrivate} onClick={() => this.setState({ isPrivate: !this.state.isPrivate})} />} label='Secret Gist?' />
                        </div>
                    )} />
                <Grid container={true}>
                    <Grid item={true} xs={12}>
                        <TextField
                            label='Title'
                            margin='normal'
                            fullWidth={true}
                            variant='outlined'
                            value={this.state.gistTitle}
                            onChange={(e) => this.setState({gistTitle: e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                </Grid>
                <MdEditor
                    className={classes.editor}
                    theme={this.props.theme}
                    content={this.state.gistContent}
                    onChange={this.changeContent}
                    placeholder='Write your gist...' />
                <div className='p-right-bottom'>
                    <Button variant='fab' color='secondary' onClick={this.submit}>
                        <FontAwesomeIcon icon={['far', 'save']} size='2x' />
                    </Button>
                </div>
            </div>
        );
    }

    private changeContent = (content) => {
        this.setState({ gistContent: content });
    }

    private submit = () => {
        if (!this.state.gistTitle || !this.state.gistContent) {
            this.props.onShowMsg('The title and content can not be empty!');
            return;
        }
        if (this.state.gistId) {
            this.props.onUpdateGist(this.state.gistId, this.state.gistTitle, this.state.gistContent, this.state.isPrivate, () => {
                this.resetState();
            });
        } else {
            this.props.onCreateGist(this.state.gistTitle, this.state.gistContent, this.state.isPrivate, () => {
                this.resetState();
            });
        }
    }

    private resetState = () => {
        const currentGist = getState().currentGist;
        this.setState({
            gistId: currentGist.id,
            gistTitle: currentGist.description,
            isPrivate: !currentGist.public,
            gistContent: (currentGist.files && currentGist.files[Object.keys(currentGist.files)[0]].content),
        });
    }
}


const mapStateToProps = (state) => ({
    theme: state.global.theme && state.global.theme.type,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onCreateGist: (title, content, isPrivate, resolve) => dispatch(adminGistActions.createGist(title, content, isPrivate, resolve)),
    onUpdateGist: (id, title, content, isPrivate, resolve) => dispatch(adminGistActions.updateGist(id, title, content, isPrivate, resolve)),
    onGetGistDetail: (id: string, resolve: () => void) => dispatch(adminGistActions.getGistDetail(id, resolve)),
    onShowMsg: (msg: string) => dispatch(globalActions.notifyError(msg)),
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GistFormComponent));
