import React, { useState } from 'react';
import ExternalLink from './ExternalLink';
import ProjectOverviewItem from './ProjectOverviewItem';
import Modal from './Modal';
import MessageDialog from './MessageDialog';

const DialogLink = ({ title, url, useDialog, message, image, dialogTitle }) => {
    const [showDialog, setShowDialog] = useState(false);
    const linkAction = () => {
        if (useDialog) {
            return () => setShowDialog(true);
        }
    };
    return (
        url && (
            <ProjectOverviewItem title={title}>
                {useDialog && (
                    <Modal show={showDialog} updateShow={setShowDialog}>
                        <MessageDialog
                            link={url}
                            update={setShowDialog}
                            message={message}
                            image={image}
                            title={dialogTitle}
                        />
                    </Modal>
                )}
                <ExternalLink
                    to={url}
                    title={title}
                    showExternalIcon={true}
                    action={linkAction()}
                >
                    {url}
                </ExternalLink>
            </ProjectOverviewItem>
        )
    );
};

export default DialogLink;
