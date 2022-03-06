var globalDojo;
var dojoDiv = document.querySelector("#the-dojo");
var replayDiv = document.querySelector("#replay");
var checkWin;

function hideDiff(){
    var easy = document.querySelector("#easy")
    var medium = document.querySelector("#medium")
    var hard = document.querySelector("#hard")
    easy.remove()
    medium.remove()
    hard.remove()
}

function buildDojo(num){
    var theDojo = [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]


    for(var i = 1; i<=num; i++){
        while(true){
            var rand1 = Math.floor(Math.random()*9)
            var rand2 = Math.floor(Math.random()*9)
            if(theDojo[rand1][rand2]==0){
                theDojo[rand1][rand2] = 1
                break
            }
        }

    }
    checkWin = 100 - num
    globalDojo = theDojo
    dojoDiv.innerHTML = render(globalDojo);
}

// Creates the rows of buttons for this game
function render(theDojo) {
    var result = "";
    var count = 0
    for (var i = 0; i < theDojo.length; i++) {
        for (var j = 0; j < theDojo[i].length; j++) {
            count++;
            result += `<button class="tatami" onclick="howMany(${i}, ${j}, this)" id="test${count}"></button>`;
        }
    }
    replayDiv.innerHTML = ""
    return result;
}

// TODO - Make this function tell us how many ninjas are hiding 
//        under the adjacent (all sides and corners) squares.
//        Use i and j as the indexes to check theDojo.


function howMany(i, j, element) {
    console.log({ i, j });
    if (globalDojo[i][j] === 0) {
        var temp = checks(i, j, element)
        element.innerHTML = `<p>${temp}</p>`;
        winner();
    }
    else {
        clearBoard();
    }
}

function checks(i, j) {
    var temp = 0;
    var top = i > 0
    var bottom = i < globalDojo.length - 1
    var left = j > 0
    var right = j < globalDojo[i].length - 1
    var checks = {
        "top": [top, function () {
            temp += globalDojo[i - 1][j]
        }],
        "bottom": [bottom, function () {
            temp += globalDojo[i + 1][j]
        }],
        "left": [left, function () {
            temp += globalDojo[i][j - 1]
        }],
        "right": [right, function () {
            temp += globalDojo[i][j + 1]
        }],
        "topLeft": [top && left, function () {
            temp += globalDojo[i - 1][j - 1]
        }],
        "topRight": [top && right, function () {
            temp += globalDojo[i - 1][j + 1]
        }],
        "bottomLeft": [bottom && left, function () {
            temp += globalDojo[i + 1][j - 1]
        }],
        "bottomRight": [bottom && right, function () {
            temp += globalDojo[i + 1][j + 1]
        }]
    }

    for (var k in checks) {
        if (checks[k][0]) {
            checks[k][1].call()
        }
    }

    return temp
}

function winner(){
    checkWin--;
    if(checkWin==0){
        clearBoard();
        replayDiv.innerHTML += '<p id="win">Winner!</p>'
    }
}

function clearBoard(){
    var count = 0

    for (var i = 0; i < globalDojo.length; i++) {
        for (var j = 0; j < globalDojo[i].length; j++) {
            count++
            var id = document.querySelector(`#test${count}`)
            if(globalDojo[i][j]==0){
                id.innerHTML = checks(i, j);
            }
            else{
                id.innerHTML = '<img src="./ninja.jpg" alt="ninja" id="ninja">'
                if(checkWin != 0){
                    replayDiv.innerHTML = '<button onclick="replay()" id="replayButton">Replay</button>'
                }
            }
        }
    }
}

function replay(){
    buildDojo();
    dojoDiv.innerHTML = render(globalDojo);
    console.table(globalDojo);
    for(var i = 1; i<=100; i++){
        var id = document.querySelector(`#test${i}`)
        id.remove()
    }
    if(replayDiv.innerHTML == '<p id="win">Winner!</p> <button onclick="replay()" id="replayButton">Replay</button>'){
        var win = document.querySelector("#win")
        win.remove();
    }

    var menu = document.querySelector("#menu")
    menu.innerHTML = ('<button class="difficulty" id="easy" onclick="hideDiff(); buildDojo(10)">Easy</button><button class="difficulty" id="medium" onclick="hideDiff(); buildDojo(20)">Medium</button><button class="difficulty" id="hard" onclick="hideDiff(); buildDojo(30)">Hard</button>')
}

// BONUS CHALLENGES
// 1. draw the number onto the button instead of alerting it
// 2. at the start randomly place 10 ninjas into theDojo with at most 1 on each spot
// 3. if you click on a ninja you must restart the game 
//    dojoDiv.innerHTML = `<button onclick="location.reload()">restart</button>`;



// start the game
// message to greet a user of the game
var style = "color:cyan;font-size:1.5rem;font-weight:bold;";
console.log("%c" + "IF YOU ARE A DOJO STUDENT...", style);
console.log("%c" + "GOOD LUCK THIS IS A CHALLENGE!", style);
// shows the dojo for debugging purposes


// adds the rows of buttons into <div id="the-dojo"></div> 
console.table(globalDojo);

