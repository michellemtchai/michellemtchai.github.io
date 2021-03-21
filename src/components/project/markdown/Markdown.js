import './index.css';
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
        return plainLinkToTabLink(marked(text));
    };
    render() {
        return (
            <section
                className="markdown"
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

const plainLinkToTabLink = (html) => {
    let linkRegex = /(\<a)(\s+href=\".+\"\>.+)(\<\/a\>)/g;
    let attributes =
        'class="tab-link" target="_blank" rel="noopener"';
    let icon = '<i class="fas fa-external-link-alt"></i>';
    let newLink = `$1 ${attributes}$2${icon}$3`;
    return html.replace(linkRegex, newLink);
};
