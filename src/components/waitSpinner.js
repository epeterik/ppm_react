import React from 'react';
import '../ui-toolkit/css/nm-cx/main.css';

export const WaitSpinner = (props) => {
    if (props.isWaiting)
    {
        return (
            <span className="loading-indicator xlarge"></span>
            );
    }
    else
    {
        return (
            <div></div>
        );
    }

}