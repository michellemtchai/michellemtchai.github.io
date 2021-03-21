import React from 'react';
import marked from 'marked';
marked.setOptions({
    gfm: true,
    breaks: true,
});

class Markdown extends React.Component {
    parsedText = () => {
        let text = this.props.text.replace(
            /([#]+)(.+\n)/g,
            '$1##$2'
        );
        return marked(text);
    };
    render() {
        return (
            <section
                dangerouslySetInnerHTML={{
                    __html: this.parsedText(),
                }}
                style={{
                    cursor: 'default',
                    ...this.props.style,
                }}
            ></section>
        );
    }
}

export default Markdown;
