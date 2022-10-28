// import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react';

function PlayerIO(props) {

    const GAMEID = "escape-dev-sov5bslslewirz5gk6cuha";
    const ROOMTYPE = "EscRoom";
    const [client, setClient] = useState({});


    function OnError(error) {
        console.log(error);
        return error;
    }

    function RefreshRooms() {
        if (client == null) {
            console.log("client == null");
            return;
        }
        console.log("refresh");
        ListRooms(client);
    }

    function ListRooms(client) {
        client.multiplayer.listRooms(
            ROOMTYPE,
            {},
            25,
            0,
            (servers) => props.OnSuccess(servers),
            (error) => OnError(error)
        )
    }

    useEffect(() => {

        if (typeof window !== "undefined") {

            // Make sure it only gets included once.
            if (!document.getElementById("externalLibrary")) {
                const script = document.createElement('script');
                script.id = 'externalLibrary'
                script.type = 'text/javascript';
                script.src = `./PlayerIOClientdevelopment.js`;

                // Call some function from the library when it loads.
                script.onload = function () {
                    window.PlayerIO.authenticate(
                        GAMEID,
                        "guest",
                        { "userId": "guest" },
                        null,
                        client => {
                            setClient(client);
                            ListRooms(client);
                        },
                        error => OnError(error)
                    )
                };

                document.getElementsByTagName("head")[0].appendChild(script);
            }

        }
    }, []);

    return (
        <>
            <button onClick={RefreshRooms}>Refresh Servers</button>
            {/* <div>            PlayerIO added        </div> */}
        </>
    )
}

export default PlayerIO;