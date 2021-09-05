import React, { useState } from 'react';

const Tabs = ({ list }) => {
    const [selectedTab, setSelectedTab] = useState(list[0]);
    const changeTab = (tab) => (event) => {
        event.preventDefault();
        setSelectedTab(tab);
    };
    return (
        <section>
            <ul>
                {list.map((tab, i) => (
                    <li
                        key={`tab-${i}`}
                        tabIndex={i}
                        className={
                            selectedTab.name === tab.name ? 'selected' : ''
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
