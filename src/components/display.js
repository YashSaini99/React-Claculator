import React from 'react';

// This is a class component which shows the users input
const Display = (props) => {
    function handleChange(e) {
    }

    return (
        <div className="display">
            <input type="text" value={props.input} onChange={(e)=> handleChange(e)}/>
        </div>
    );
  }

export default Display;