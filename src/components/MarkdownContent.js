import React from 'react';
import Markdown from 'markdown-to-jsx';
import ExternalLink from './ExternalLink';
import Image from './Image';

const MarkdownContent = ({ content }) => {
    return (
        <Markdown
            options={{
                overrides: {
                    a: {
                        component: ExternalLink,
                    },
                    img: {
                        component: Image,
                    },
                },
            }}
        >
            {content}
        </Markdown>
    );
};

export default MarkdownContent;
