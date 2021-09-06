import React from 'react';
import ExternalLink from './ExternalLink';
import Image from './Image';
import { rehype } from 'rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeReact from 'rehype-react';
import * as styles from './MarkdownContent.module.scss';

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
    return <div className={styles.markdown}>{processed.result}</div>;
};

export default MarkdownContent;
