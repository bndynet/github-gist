import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import { ifTheme } from '../theme';
import * as CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/markdown/markdown.js';

const EDITOR_THEME_DARK = 'material';
const EDITOR_THEME_LIGHT = 'default';

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
        editor: {
            flex: 1,
            '& .CodeMirror': {
                height: '100%',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                fontSize: theme.typography.fontSize,
            },
            '& .CodrMirror .CodeMirror-scroll': {
                borderTopLeftRadius: theme.shape.borderRadius,
            },
            '& .CodeMirror-gutters': {
                borderTopLeftRadius: theme.shape.borderRadius,
                borderBotttomLeftRadius: theme.shape.borderRadius,
            },
        },
        preview: {
            flex: 1,
            borderLeft: `solid 3px ${theme.palette.divider}`,
            padding: theme.spacing.unit,
            overflow: 'auto',
        },
    });

class MdEditor extends React.Component<{
    classes: any,
    className?: string,
    content?: string,
    placeholder?: string,
    theme?: string | 'light' | 'dark',
    onChange?: (content: string) => void,
    onFocus?: (e) => void,
    onBlur?: (e) => void,
 }, {
    content?: string,
    focused: boolean,
}> {
    private textAreaElement: HTMLTextAreaElement;
    private editor: CodeMirror.EditorFromTextArea;
    private didDefaultValue: boolean;
    private theme: string;

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
            focused: false,
        };
        this.theme = this.props.theme;
    }

    public componentDidUpdate() {
        if (this.textAreaElement && this.editor && this.textAreaElement.defaultValue && !this.didDefaultValue) {
            this.editor.setValue(this.textAreaElement.defaultValue);
            this.didDefaultValue = true;
        }
        if (this.props.theme !== this.theme) {
            this.theme = this.props.theme;
            this.editor.setOption('theme', this.props.theme === 'dark' ? EDITOR_THEME_DARK : EDITOR_THEME_LIGHT);
        }
    }

    public componentDidMount() {
      this.initEditor();
    }

    public render() {
        const { classes, className, content } = this.props;
        return (
            <div className={classNames(classes.root, this.state.focused && classes.rootFocused, className)}>
                <div className={classes.editor}>
                    <textarea
                        defaultValue={this.state.content || content}
                        ref={(s) => this.textAreaElement = s}
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

    private initEditor() {
        this.editor = CodeMirror.fromTextArea(this.textAreaElement, {
            lineNumbers: true,
            lineWrapping: true,
            mode: 'markdown',
            placeholder: this.props.placeholder,
            theme: this.props.theme === 'dark' ? EDITOR_THEME_DARK : EDITOR_THEME_LIGHT,
        });
        this.editor.on('change', (editorInstance) => {
            this.setState({
                content: editorInstance.getValue(),
            });
            if (this.props.onChange) {
                this.props.onChange(this.state.content);
            }
        });
        this.editor.on('focus', (editorInstance) => {
            this.setState({
                focused: true,
            });
            if (this.props.onFocus) {
                this.props.onFocus(editorInstance);
            }
        });
        this.editor.on('blur', (editorInstance) => {
            this.setState({
                focused: false,
            });
            if (this.props.onBlur) {
                this.props.onBlur(editorInstance);
            }
        });
    }
}

export default withStyles(styles)(MdEditor);
