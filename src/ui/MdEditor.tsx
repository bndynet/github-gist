import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import { createStyles, Theme, withStyles, CircularProgress, Typography } from '@material-ui/core';
import { ifTheme } from '../theme';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            minHeight: 360,
            border: `solid 1px ${ifTheme(theme, 'rgba(0, 0, 0, 0.23)', 'rgba(255, 255, 255, 0.23)')}`,
            padding: 1,
            borderRadius: theme.shape.borderRadius,
        },
        rootFocused: {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
            padding: 0,
        },
        textarea: {
            flex: 1,
            padding: theme.spacing.unit,
            '& textarea': {
                border: 'none',
                width: '100%',
                height: '100%',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                fontSize: theme.typography.fontSize,
            },
            '& textarea:focus': {
                outline: 'none',
            },
        },
        preview: {
            flex: 1,
            borderLeft: `solid 5px ${theme.palette.divider}`,
            padding: theme.spacing.unit,
        },
    });

class MdEditor extends React.Component<{
    classes: any,
    className?: string,
    content?: string,
    placeholder?: string,
    onChange?: (content: string) => void,
    onFocus?: (e) => void,
    onBlur?: (e) => void,
 }, {
    content?: string,
    focused: boolean,
}> {

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
            focused: false,
        };
    }

    public render() {
        const { classes, className, content, placeholder } = this.props;
        return (
            <div className={classNames(classes.root, this.state.focused && classes.rootFocused, className)}>
                <div className={classes.textarea}>
                    <textarea
                        value={this.state.content || content}
                        placeholder={placeholder}
                        onChange={(e) => this.handleContentChange(e)}
                        onFocus={(e) => this.handleFocus(e)}
                        onBlur={(e) => this.handleBlur(e)}
                        />
                </div>
                <div className={classes.preview}>
                    <ReactMarkdown
                        className={classNames('markdown-body')}
                        source={this.state.content || content}
                    />
                </div>
            </div>
        );
    }


    private handleContentChange = (e) => {
        this.setState({
            content: e.target.value,
        });
        if (this.props.onChange) {
            this.props.onChange(this.state.content);
        }
    }

    private handleFocus = (e) => {
        this.setState({
            focused: true,
        });
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }

    private handleBlur = (e) => {
        this.setState({
            focused: false,
        });
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }
}

export default withStyles(styles)(MdEditor);
