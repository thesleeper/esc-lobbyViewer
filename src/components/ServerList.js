import React, { useEffect } from 'react';

function ServerList(props) {
    console.log(props.serverList.length + " servers found");
    const serverListHTML = props.serverList.map(item => {
        return <div key={item.id}>{item.host} {item.roomName} {item.scenarioId}</div>
    });

    return (
        <div>
            <h1>Server List</h1>
            <br />
            {props.serverList.length > 0 ? serverListHTML : "no servers found."}
        </div>
    )
}

export default ServerList