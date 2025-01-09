document.addEventListener('DOMContentLoaded', () => {
    displaySets();
});


let pauseBtn = document.getElementById("pause");
let paused = 1;
pauseBtn.addEventListener('click', function() {
    if(pauseBtn.textContent === "Start")
    {
        // clearInterval(timerCount);
        startTimer();
    }
    if(pauseBtn.textContent === "Pause")
    {
        paused = 1;
        pauseBtn.textContent = "Resume";
    }
    else
    {
        paused = 0;
        pauseBtn.textContent = "Pause";
    }
});


let resetBtn = document.getElementById("reset");
resetBtn.addEventListener('click', Reset);
function Reset() {
    pauseBtn.textContent = "Start";
    document.getElementById("minutes").textContent = String(10).padStart(2,0);
    document.getElementById("seconds").textContent = String(0).padStart(2,0);
    paused = 1;
    clearInterval(timerCount);
}


var timerCount;
function startTimer() {
    let minutes = document.getElementById("minutes").textContent;
    let seconds = parseInt(document.getElementById("seconds").textContent, 10);
    timerCount = setInterval(function() {
        if(minutes <= 0)
            timerCount = null;
        if(!paused)
        {
            if(seconds > 0)
                seconds--;
            else
            {
                minutes--;
                seconds = 59;
            }
            document.getElementById("minutes").textContent = minutes;
            document.getElementById("seconds").textContent = seconds;
        }
    }, 1000);
}

let saveSetBtn = document.getElementById("save");
saveSetBtn.addEventListener('click', async function(event) {
    event.preventDefault();

    try{
        let winner = "A", scoreA = 10, scoreB = 9;
        var response = await fetch('http://localhost:3000/sets', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({winner, scoreA, scoreB})
        });


        var result = await response.json();

        // console.log(result);
        if(result.success)
        {
            Reset();
            displaySets();
        }
        else    
            console.log(result.message);
    }
    catch(err){
        console.log(err);
    }
});

async function displaySets() {
    // event.preventDefault();

    var setsTable = document.querySelector("#setTable tbody");

    try {
        var response = await fetch('/sets', {
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        });
            
        var sets = await response.json();
        // console.log(sets);

        setsTable.innerHTML = "";
        sets.forEach(set => {
            var newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${set.setNo}</td>
                <td>${set.winner}</td>
                <td>${set.scoreA} : ${set.scoreB}</td>`

            setsTable.appendChild(newRow);
        });
    }
    catch(err) {
        console.log(err)
    }
}