import React from 'react';
import { technologySchema } from '../config/forms';
import Creator from '../components/Creator';

class TechnologyCreator extends React.Component {
    render() {
        return (
            <Creator
                {...this.props}
                type="Technology"
                schema={technologySchema}
                page="/technologies"
                create={() => {}}
            />
        );
    }
}

export default TechnologyCreator;
