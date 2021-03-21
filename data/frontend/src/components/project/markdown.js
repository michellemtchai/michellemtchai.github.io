import React from 'react';
import marked from 'marked';
marked.setOptions({
    gfm: true,
    breaks: true,
});

class Markdown extends React.Component {
    parsedText = () => {
        let parts = this.props.value.split('\n');
        let text = parts
            .map((part) =>
                part.replace(/(^[#]+)(.+$)/g, '$1##$2')
            )
            .join('\n');
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
