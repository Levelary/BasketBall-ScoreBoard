document.addEventListener("DOMContentLoaded", () => {

    displayPlayersA();
})

var displayPlayersA = async () => {
    var currTable = document.querySelector("#tableA tbody");

    try {
        var response = await fetch(`http://localhost:3000/players`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });

        var playersList = await response.json();
        currTable.innerHTML = "";
        playersList.forEach(player => {
            var row = document.createElement("tr");
            row.innerHTML = `
            <td>${player.jno}</td>
            <td>${player.player}</td>
            <td>${player.score}</td>
            <td><input class="addPointsInput"/><button class="addPointsBtn">+</button></td>` //<button id="addPlayer">ADD</button>
            currTable.appendChild(row);
        });
    }
    catch(err) {
        console.log(err);
    }
}

/*---------------------------------------------------------*/

document.getElementById("logout").addEventListener('click', function(){ 
    window.location.href = "./login/login.html";
})
// var addPlayer = document.getElementsByClassName("addPlayer");

document.getElementById("addA").addEventListener('click', function() {
    var tableA = document.querySelector("#tableA tbody");

    var newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td><input id="jnoInput"/></td>
        <td><input id="playerInput"/></td>
        <td></td> 
        <td><button id="confirmPlayerA">ADD</button></td>`
    // newRow.appendChild(newData3);
    tableA.appendChild(newRow);


    document.getElementById("confirmPlayerA").addEventListener('click', async function() {
        var jno = document.getElementById("jnoInput").value;
        var player = document.getElementById("playerInput").value;
        var score = 0;// document.getElementById("scoreInput").value;
        var team = "A";
        // console.log(jno, player);

        try {
            var response = await fetch(`http://localhost:3000/players`, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({team, jno, player, score})
            });

            var result = await response.json();

            if(result.success)
                displayPlayersA();
            else
                console.log(result.message);
        
        }
        catch(err) {
            console.log(err);
        }

    });
});


// document.getElementById("addB").addEventListener('click', function() {
//     var tableB = document.querySelector("#tableB tbody");

//     var newRow = document.createElement("tr");

//     newRow.innerHTML = `
//         <td><input id="jnoInput"/></td>
//         <td><input id="playerInput"/></td>
//         <td></td>
//         <td><button id="confirmPlayerB">ADD</button></td>
//         </form>`
//     tableB.appendChild(newRow);


//     document.getElementById("confirmPlayerB").addEventListener('click', async function() {
//         var jno = document.getElementById("jnoInput").textContent;
//         var player = document.getElementById("playerInput").textContent;
//         var score = 0; //document.getElementById("scoreInput").textContent;
//         var team = "B";

//         // var newRow = document.createElement("tr");
//         // newRow.innerHTML = `
//         //     <td>${input1}</td>
//         //     <td>${input2}</td>
//         //     <td>${input3}</td>`
//         // displayTable("tableB");
//         // tableB.appendChild(newRow);
//         try {
//             var response = await fetch("http://localhost:3000/players", {
//                 method: 'POST',
//                 headers: {'Content-Type:': 'application/json'},
//                 body: JSON.stringify({team, jno, player, score})
//             });
//             var result = await response.json();

//             if(result.success)
//                 displayPlayers(tableB);
//             else
//                 console.log(result.message);
//         }
//         catch(err) {
//             console.log(err);
//         }

//     });
// });