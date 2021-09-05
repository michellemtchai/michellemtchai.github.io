import React, { useState } from 'react';
import * as styles from './Tabs.module.scss';

const Tabs = ({ list }) => {
    const [selectedTab, setSelectedTab] = useState(list[0]);
    const changeTab = (tab) => (event) => {
        event.preventDefault();
        setSelectedTab(tab);
    };
    return (
        <section className={styles.tabs}>
            <ul className={styles.tab}>
                {list.map((tab, i) => (
                    <li
                        key={`tab-${i}`}
                        tabIndex={i}
                        className={
                            selectedTab.name === tab.name ? styles.selected : ''
                        }
                    >
                        <a onClick={changeTab(tab)} href={`#${tab.link}`}>
                            {tab.name}
                        </a>
                    </li>
                ))}
            </ul>
            <selectedTab.content id={selectedTab.link} />
        </section>
    );
};

export default Tabs;
