import './index.css';
import React from 'react';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.show,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.escModal = this.escModal.bind(this);
    }
    openModal() {
        this.setState(
            {
                open: true,
            },
            () => this.props.updateShow(this.state.open)
        );
    }
    closeModal() {
        this.setState(
            {
                open: false,
            },
            () => this.props.updateShow(this.state.open)
        );
    }
    escModal(event) {
        if (event.keyCode === 27) {
            this.closeModal();
        }
    }
    componentDidMount() {
        document.addEventListener(
            'keydown',
            this.escModal,
            false
        );
    }
    componentWillUnmount() {
        document.removeEventListener(
            'keydown',
            this.escModal,
            false
        );
    }
    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.setState({
                open: this.props.show,
            });
        }
    }
    render() {
        return this.state.open ? (
            <div className="modal-mask">
                <div
                    className="modal-background"
                    onClick={this.closeModal}
                ></div>
                <div className="modal-body-content">
                    {this.props.children}
                </div>
            </div>
        ) : (
            ''
        );
    }
}

export default Modal;
