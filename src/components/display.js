import React from 'react';

const Display = (props) => {
    function handleChange(e) {
        e.preventDefault();
    }

    return (
        <div className="display">
            <input type="text" value={props.input} onChange={handleChange}/>
        </div>
    );
  }

export default Display;
