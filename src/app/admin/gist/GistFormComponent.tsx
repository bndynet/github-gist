import * as React from 'react';
import classNames from 'classnames';
import * as ReactMarkdown from 'react-markdown';
import { Grid, Theme, createStyles, withStyles, TextField, FormControlLabel, Switch } from '@material-ui/core';

import { ContentHeader } from '../../../ui';

const styles = (theme: Theme) =>
    createStyles({
        textarea: {
            width: '100%',
            marginRight: theme.spacing.unit,
            '& div': {
                height: 'calc(100vh - 250px)',
                paddingTop: theme.spacing.unit * 2,
                paddingBottom: theme.spacing.unit,
            },
        },
        textareaRoot: {},
        preview: {
            width: '100%',
            height: 'calc(100vh - 250px)',
            border: `1px solid ${theme.palette.divider}`,
            marginLeft: theme.spacing.unit,
            marginTop: theme.spacing.unit * 2,
            padding: theme.spacing.unit * 3,
            borderRadius: 4,
        },
    });

class GistFormComponent extends React.Component<
    {
        classes: any;
    },
    { viewMode: boolean, gistTitle: string, gistContent: string}
> {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: true,
            gistTitle: '',
            gistContent: `# Hi, I am Markdown.
- one
- two
- ...

\`\`\`
Code block
\`\`\`
`,
        };
        this.changeContent = this.changeContent.bind(this);
        this.changeViewMode = this.changeViewMode.bind(this);
    }

    public render() {
        const { classes } = this.props;
        return (
            <div>
                <ContentHeader title='New Gist' />
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
                <Grid container={true}>
                    <Grid item={true} xs={this.state.viewMode ? 6 : 12}>
                        <TextField
                            label='Content'
                            multiline={true}
                            margin='normal'
                            value={this.state.gistContent}
                            onChange={this.changeContent}
                            className={classes.textarea}
                            variant='outlined'
                        />
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
            </div>
        );
    }

    private changeContent(e) {
        this.setState({ gistContent: e.target.value });
    }

    private changeViewMode() {
        this.setState({ viewMode: !this.state.viewMode });
    }
}

export default withStyles(styles)(GistFormComponent);
