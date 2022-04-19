const targetarray = ["plane", "turbo", "brawn", "teddy", "train", "power"];
//const target = targetarray[Math.floor(Math.random() * targetarray.length)];
let guesscount = 0;

window.onload = function () {
    let table = document.getElementById("myTable");
    let clickcount = 0;
    for (let r = 1; r < 7; r++)    {
        let tablerow = document.createElement("tr");
        for (let c = 1; c < 6; c++)    {
            let tablecol = document.createElement("td");
            tablecol.setAttribute("id", c + (r-1)*10);
            
            tablerow.appendChild(tablecol);
        }
        table.appendChild(tablerow);
    }
    
    
}

$(document).ready(function() {
    $("button").click(function() {
        
        let guess = document.getElementById("guess").value.toLowerCase();

        $.get("https://drtnf.net/wordle_guess?guess=" + guess, function(data) {
            guessOutcome(data.outcome);
        }) 

    });
});

function guessOutcome(outcome) {
    let correctcount = 0;

    let guess = document.getElementById('guess').value
    for (let i = 0; i < outcome.length; i++) {
        document.getElementById(guesscount*10+i+1).innerHTML = guess[i].toUpperCase();
        if (outcome[i] == 2)  {
            document.getElementById(guesscount*10+i+1).style.backgroundColor = 'green';
            correctcount++;
        }
        else if (outcome[i] == 1)    {
            document.getElementById(guesscount*10+i+1).style.backgroundColor = 'yellow';
        } else {
            document.getElementById(guesscount*10+i+1).style.backgroundColor = 'gray';
        }
        
    }
    guesscount++;
    if (correctcount == 5)  {
        document.getElementById("submit").style.display = "none";
        document.getElementById("wordle").innerHTML = "CORRECT WELL DONE";
        document.getElementById("wordle").style.color = "green";
    }
    else if (guesscount == 6)    {
        document.getElementById("submit").style.display = "none";
        document.getElementById("wordle").innerHTML = "RAN OUT OF GUESSES";
        document.getElementById("wordle").style.color = "red";
    }
    
    document.getElementById('guess').value = '';
}