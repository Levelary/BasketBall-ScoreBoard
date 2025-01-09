

var missingMsg = document.getElementById("missingMsg");
var invalidMsg = document.getElementById("invalidMsg");

document.getElementById("submitBtn").addEventListener('click', async function(event){
    event.preventDefault();

    missingMsg.style.display = "none";
    invalidMsg.style.display = "none";

    // var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    // console.log(username, email);

    if(!email || !password) {
        missingMsg.style.display = "block";
        missingMsg.textContent = "Enter email and password to login";
        return;    
    }

    try {
        var response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });

        var result = await response.json();

        // if(result.type === "user")
        //     window.location.href = "../main.html";
        // else if(result.type === "admin")
        //     window.location.href = "../main.html";
        // console.log("resultf ", result);
        if(result.success === true) {
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";

            window.location.href = "../main.html";
        }
        else
            invalidMsg.style.display = "block";
    }
    catch(err) {
        console.log(err);
    }
});