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
        return processHtml(marked(text));
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

const processHtml = (html) => {
    let processes = [plainLinkToTabLink, listBolding];
    processes.forEach((proc) => (html = proc(html)));
    return html;
};

const plainLinkToTabLink = (html) => {
    let linkRegex = /(\<a)(\s+href=\".+\"\>.+)(\<\/a\>)/g;
    let attributes =
        'class="tab-link" target="_blank" rel="noopener"';
    let icon = '<i class="fas fa-external-link-alt"></i>';
    let newLink = `$1 ${attributes}$2${icon}$3`;
    listBolding(html);
    return html.replace(linkRegex, newLink);
};

const listBolding = (html) => {
    let listRegex = /(\<li\>)(.+)(\<\/li\>)/g;
    let newList = `$1<span>$2</span>$3`;
    return html.replace(listRegex, newList);
};
