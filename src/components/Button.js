import React from 'react';

const Button = ({ children, onClick, className, disabled }) => {
	return disabled ? (
		<button className={className} onClick={onClick} disabled={true}>
			{children}
		</button>
	) : (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
