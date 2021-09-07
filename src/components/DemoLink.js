import React, { useState } from 'react';
import ExternalLink from './ExternalLink';
import ProjectOverviewItem from './ProjectOverviewItem';
import Modal from './Modal';
import SleepModeDialog from './SleepModeDialog';

const DemoLink = ({ demoUrl, sleep }) => {
    const [showDialog, setShowDialog] = useState(false);
    const linkAction = () => {
        if (sleep) {
            return () => setShowDialog(true);
        }
    };
    return (
        demoUrl && (
            <ProjectOverviewItem title="Demo URL">
                {sleep && (
                    <Modal show={showDialog} updateShow={setShowDialog}>
                        <SleepModeDialog
                            link={demoUrl}
                            update={setShowDialog}
                        />
                    </Modal>
                )}
                <ExternalLink
                    to={demoUrl}
                    title="Demo URL"
                    showExternalIcon={true}
                    action={linkAction()}
                >
                    {demoUrl}
                </ExternalLink>
            </ProjectOverviewItem>
        )
    );
};

export default DemoLink;
