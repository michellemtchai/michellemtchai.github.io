import React from 'react';
import marked from 'marked';
marked.setOptions({
    gfm: true,
    breaks: true,
});

class Markdown extends React.Component {
    render() {
        return (
            <section
                dangerouslySetInnerHTML={{
                    __html: marked(this.props.text),
                }}
            ></section>
        );
    }
}

export default Markdown;
