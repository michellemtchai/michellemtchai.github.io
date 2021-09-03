import React from 'react';

const Button = ({ children, onClick, className, disabled }) => {
    return disabled ? (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    ) : (
        <button className={className} onClick={onClick} disabled>
            {children}
        </button>
    );
};

export default Button;
