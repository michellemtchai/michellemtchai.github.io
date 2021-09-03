import React, { useState } from 'react';

const Tabs = ({ list }) => {
    const [selectedTab, setSelectedTab] = useState(list[0]);
    const changeTab = (tab) => {
        setSelectedTab(tab);
    };
    return (
        <section>
            <ul>
                {list.map((tab, i) => (
                    <li
                        key={`tab-${i}`}
                        onClick={() => changeTab(tab)}
                        role="button"
                        tabIndex={i}
                        className={
                            selectedTab.name === tab.name ? 'selected' : ''
                        }
                    >
                        {tab.name}
                    </li>
                ))}
            </ul>
            <selectedTab.content />
        </section>
    );
};

export default Tabs;
