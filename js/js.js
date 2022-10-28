const GAMEID = "escape-dev-sov5bslslewirz5gk6cuha";
const ROOMTYPE = "EscRoom";
const SEARCHTERMS = {};

let clientRef;

function TESTME() {
    console.log("TEST OK");
    return ["TEST OK", "a"];
}

//MAIN
(function () {
    // Connect();
})();

function onError(error) {
    console.log("Error: ");
    console.log(error);
}

function Connect(gameid) {
    function onSuccess(client) {
        clientRef = client;
        console.log("returning ;" + client);
        return client;
    }

    console.log("Connect");
    PlayerIO.authenticate(
        gameid,
        "guest",
        { "userId": "guest" },
        null,
        (client) => onSuccess(client),
        (error) => onError(error)
    )
}


//ref ; https://playerio.com/documentation/reference/javascript/multiplayer#listRooms
function CheckServers(client) {
    // console.log(client.connectUserId);
    function onSuccess(servers) {
        // console.log("Sucess: ")
        if (servers.length == 0) {
            console.log("no servers found.");
            return null;
        }
        else {
            console.log("return: " + servers.length + " " + servers);
            console.log(servers);
            return servers
        }
    }

    console.log("Check Server");
    client.multiplayer.listRooms(
        ROOMTYPE,
        SEARCHTERMS,
        25,
        0,
        (servers) => onSuccess(servers),
        (error) => onError(error)
    )
}
