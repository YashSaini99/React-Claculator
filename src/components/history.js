import React from 'react';


const History = (props) => {
    const historyList = props.history.map((obj, index) => {
        return (<tr key={index} ><td onClick={()=> props.updateDisplayHistory(obj.exp)}><span className="exp">{obj.exp} = </span>{obj.result}</td></tr>) 
    })

    return (
        <div className="history-list">
            <table>
                <tbody>
                {historyList.reverse()}
                </tbody>
            </table>
        </div>
    );
}

export default History;
