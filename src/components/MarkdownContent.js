import React from 'react';
import ExternalLink from './ExternalLink';
import Image from './Image';
import { rehype } from 'rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeReact from 'rehype-react';

const MarkdownContent = ({ content }) => {
    const RemappedExternalLink = (props) => (
        <ExternalLink {...props} to={props.href} showExternalIcon={true} />
    );
    const processed = rehype()
        .data('settings', { fragment: true })
        .use(rehypeSanitize, defaultSchema)
        .use(rehypeReact, {
            createElement: React.createElement,
            components: {
                img: Image,
                a: RemappedExternalLink,
            },
        })
        .processSync(content);
    return processed.result;
};

export default MarkdownContent;
