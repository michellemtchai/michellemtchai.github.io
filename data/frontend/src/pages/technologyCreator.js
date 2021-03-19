import React from 'react';
import { api } from '../config/api';
import { technologySchema } from '../config/forms';
import Creator from '../components/creator';

class TechnologyCreator extends React.Component {
    render() {
        return (
            <Creator
                {...this.props}
                type="Technology"
                schema={technologySchema}
                page="/technologies"
                create={api.createTechnology}
            />
        );
    }
}

export default TechnologyCreator;
