import logo from './logo.svg';
import './App.css';

import ServerList from './components/ServerList';
import { useEffect, useState } from 'react';
import PlayerIO from './components/playerIOComponent';


function App() {

  const [servers, setServers] = useState([]);

  function RefreshServer(client) {
    console.log("refresh server");
    console.log(client)
  }

  function OnSuccess(success) {
    const servlist = success;
    const serverDataArray = [];
    for (let i = 0; i < servlist.length; i++) {
      let server = servlist[i];
      serverDataArray.push({
        id: server.id,
        roomType: server.roomType,
        host: server.roomData.host,
        roomName: server.roomData.roomName,
        scenarioId: server.roomData.scenarioId,
      });
    }
    setServers(serverDataArray);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PlayerIO OnRefresh={RefreshServer} OnSuccess={OnSuccess} />
        <ServerList serverList={servers} />
      </header>
    </div >
  );
}

export default App;
