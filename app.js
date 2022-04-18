const targetarray = ["plane", "turbo", "brawn", "teddy", "train", "power"];
const target = targetarray[Math.floor(Math.random() * targetarray.length)];
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

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        console.log(this.responseText);
    };
    xhttp.open("GET", "https://drtnf.net/wordle_guess?guess=GUESS");
    xhttp.send();
}

function wordle(guess) {
    
    var output = [];
    var i = 0;
    let targetclone = target;
    let correctcount = 0;
    
    for (var char of guess) {
        document.getElementById(guesscount*10+i+1).innerHTML = char.toUpperCase();
        if (char === target[i])  {
            output[i] = 2;
            document.getElementById(guesscount*10+i+1).style.backgroundColor = 'green';
            correctcount++;
        }
        else if (targetclone.includes(char))    {
            targetclone = targetclone.slice(0, targetclone.indexOf(char)) + targetclone.slice(targetclone.indexOf(char)+1, target.length);
            output[i] = 1;
            document.getElementById(guesscount*10+i+1).style.backgroundColor = 'yellow';
        } else {
            output[i] = 0;
            document.getElementById(guesscount*10+i+1).style.backgroundColor = 'gray';
        }
        i++;
    }
    document.getElementById("wordle").innerHTML = output;
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