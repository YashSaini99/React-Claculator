import React from 'react';

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
