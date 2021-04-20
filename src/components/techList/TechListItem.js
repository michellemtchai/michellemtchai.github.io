import React from 'react';
import Image from '../image/Image';

class TechListItem extends React.Component {
    render() {
        return (
            <>
                <Image
                    src={this.props.icon_url}
                    alt={this.props.name}
                    width="20px"
                    height="20px"
                />
                <span
                    dangerouslySetInnerHTML={{
                        __html: this.props.name,
                    }}
                ></span>
            </>
        );
    }
}

export default TechListItem;
