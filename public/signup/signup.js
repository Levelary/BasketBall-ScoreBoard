var missingMsg = document.getElementById("missingMsg");
var invalidMsg = document.getElementById("invalidMsg");

document.getElementById("submitBtn").addEventListener('click', async function(event){
    event.preventDefault();

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;
    missingMsg.style.display = "none";
    invalidMsg.style.display = "none";

    if(!username || !email) {
        missingMsg.style.display = "block";
        missingMsg.textContent = "Enter the username or email to login";
        return;    
    }
    if(!password) {
        missingMsg.style.display = "block";
        missingMsg.textContent = "Enter the password to login";
        return;
    }

    if(password !== password2) {
        invalidMsg.style.display = "block";
        return;
    }

    try {
        var response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, email, password})
        });

        var result = await response.json();
        // console.log(result);

        if(result.success) {
            document.getElementById("username").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("password2").value = "";

            window.location.href = "../login/login.html";
        }
        else
            invalidMsg.style.display = "block";
    }
    catch(err) {
        console.log(err);
    }

});