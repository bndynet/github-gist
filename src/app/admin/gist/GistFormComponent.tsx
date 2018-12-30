import * as React from 'react';
import { match } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import * as ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import { Grid, Theme, createStyles, withStyles, TextField, FormControlLabel, Switch, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { ContentHeader } from '../../../ui';
import { adminGistActions, getState } from '.';
import globalActions from '../../global/actions';

const styles = (theme: Theme) =>
    createStyles({
        textarea: {
            width: '100%',
            marginRight: theme.spacing.unit,
            '& div': {
                height: 'calc(100vh - 250px)',
                overflow: 'auto',
                paddingTop: theme.spacing.unit * 2,
                paddingBottom: theme.spacing.unit,
            },
        },
        textareaRoot: {},
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
        onCreateGist: (title: string, content: string, isPrivate: boolean) => void;
        onUpdateGist: (id, title, content, isPrivate) => void;
        onGetGistDetail: (id: string, resolve: () => void) => void;
        onShowMsg: (msg: string) => void;
    },
    { viewMode: boolean, gistTitle: string, gistContent: string, isPrivate: boolean }
> {
    private gistId: string;

    constructor(props) {
        super(props);
        this.gistId = this.props.match.params.id;
        this.changeContent = this.changeContent.bind(this);
        this.changeViewMode = this.changeViewMode.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            viewMode: true,
            gistTitle: '',
            gistContent: '',
            isPrivate: false,
        };
    }

    public componentDidMount() {
        if (this.gistId) {
            this.props.onGetGistDetail(this.gistId, () => {
                const currentGist = getState().currentGist;
                this.setState({
                    gistTitle: currentGist.description,
                    isPrivate: !currentGist.public,
                    gistContent: (currentGist.files && currentGist.files[Object.keys(currentGist.files)[0]].content),
                });
            });
        }
    }

    public render() {
        const { classes } = this.props;
        return (
            <div>
                <ContentHeader title={this.gistId ? 'Edit Gist' : 'New Gist'} />
                <Grid container={true}>
                    <Grid item={true} xs={6}>
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
                    <Grid item={true} xs={6}>
                        <FormControlLabel className={classNames('field-static', classes.switch)} control={<Switch checked={this.state.isPrivate} onClick={() => this.setState({ isPrivate: !this.state.isPrivate})} />} label='Secret Gist?' />
                    </Grid>
                    <Grid item={true} xs={this.state.viewMode ? 6 : 12}>
                        <TextField
                            label='Content'
                            multiline={true}
                            margin='normal'
                            value={this.state.gistContent}
                            placeholder='Write gist using Markdown language...'
                            onChange={this.changeContent}
                            className={classes.textarea}
                            variant='outlined'
                            InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                    {this.state.viewMode && (
                        <Grid item={true} xs={6}>
                            <ReactMarkdown
                                className={classNames('markdown-body', classes.preview)}
                                source={this.state.gistContent}
                            />
                        </Grid>
                    )}
                </Grid>
                <div className='p-right-bottom'>
                    <Button variant='fab' color='secondary' onClick={this.submit}>
                        <SaveIcon />
                    </Button>
                </div>
            </div>
        );
    }

    private changeContent(e) {
        this.setState({ gistContent: e.target.value });
    }

    private changeViewMode() {
        this.setState({ viewMode: !this.state.viewMode });
    }

    private submit() {
        if (!this.state.gistTitle || !this.state.gistContent) {
            this.props.onShowMsg('The title and content can not be empty!');
            return;
        }
        if (this.gistId) {
            this.props.onUpdateGist(this.gistId, this.state.gistTitle, this.state.gistContent, this.state.isPrivate);
        } else {
            this.props.onCreateGist(this.state.gistTitle, this.state.gistContent, this.state.isPrivate);
        }
    }
}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onCreateGist: (title, content, isPrivate) => dispatch(adminGistActions.createGist(title, content, isPrivate)),
    onUpdateGist: (id, title, content, isPrivate) => dispatch(adminGistActions.updateGist(id, title, content, isPrivate)),
    onGetGistDetail: (id: string, resolve: () => void) => dispatch(adminGistActions.getGistDetail(id, resolve)),
    onShowMsg: (msg: string) => dispatch(globalActions.notifyError(msg)),
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GistFormComponent));
