const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const overlay = document.getElementById("overlay");
const restartBtn = document.getElementById("btn-restart");
const quitBtn = document.getElementById("btn-quit");
const gameOver = document.getElementById("gameover");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
let currentTurn = "Player 01";
let cell = ['', '', '', '', '', '', '', '', ''];

const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let wonArr;

cells.forEach((cell) => {
    cell.addEventListener("mouseenter", hoverIn);
    cell.addEventListener("mouseleave", hoverOut);
    cell.addEventListener('click', action, { once: true});
});

restartBtn.addEventListener('click', restart);
quitBtn.addEventListener('click', quit);


function restart() {

    message.innerText = "Player 01's Turn!";
    overlay.classList.remove("active");
    cells.forEach((cell) => {
        cell.classList.remove('cross');
        cell.classList.remove('cross-hover');
        cell.classList.remove('circle');
        cell.classList.remove('circle-hover');
        cell.classList.remove('highlight');
        cell.addEventListener("mouseenter", hoverIn);
        cell.addEventListener("mouseleave", hoverOut);
        cell.removeEventListener('click', action, { once: true});
        cell.style.cursor = "pointer";
        location.reload();
        //location.reload(forceGet) used to force site to reload from server

       /*  function timedRefresh(time) {
            setTimeout("location.reload(true);", time);
        } */
    }); 
}




function quit() {
    window.close();
}

function action() {
    let currentClass = currentTurn === "Player 01" ? "cross" : "circle"
    this.classList.remove(`${currentClass}-hover`);
    this.classList.add(currentClass);


    if (isWinner(currentClass)){
        message.innerText = `${currentTurn} Won !!!`;
        wonArr.forEach((i) => cells[i].classList.add("highlight"));
        overlay.classList.add("active");
        gameOver.play();

        reset();
        return;
    } else {
        const res = Array.from(cells).every((cell) => {
            return cell.classList.length === 2;
        });
        if (res) {
            message.innerText = `It is a TIE !!!`;
            overlay.classList.add("active");
            gameOver.play();
            cells.forEach((cells) => {
                cell.classList.add("highlight");
            });
            
           reset();
        return;            
        }
    }

    currentTurn === "Player 01"
        ? (currentTurn = "Player 02")
        : (currentTurn = "Player 01");
        
    message.innerText = `${currentTurn}'s Turn!`;


    
        if (this.classList.contains("cross")) {
            player1.play();
        } if (this.classList.contains("circle")) {
            player2.play();
        }
}

    

 
        
/*

function action () {
        if(currentTurn === "Player 01")
           {
               this.classList.add("cross");
               this.classList.remove("cross-hover");
           } 
           else if(currentTurn === "Player 02")
           {
               this.classList.add("circle");
               this.classList.remove("circle-hover");
           }
*/
        
            
/* 
        currentTurn ==="Player 01"
        ? (currentTurn = "Player 02")
        : (currentTurn = "Player 01");

        
    } */
    function isWinner(currentClass) {
       return wins.some((win) => {
            const res = win.every((i) => cells[i].classList.contains(currentClass));
            if (res) {
                wonArr = win;
            }
            return res;
        });
    
    }

    function hoverIn() {
        let currentClass = currentTurn === "Player 01" ? "cross" : "circle";
        if (this.classList.contains("cross") || this.classList.contains("circle")) {
            this.style.cursor = "not-allowed";
        } else {
            this.classList.add(`${currentClass}-hover`);
        }
    }
        /* if(currentTurn === "Player 01")
            if(this.classList.contains("cross") || this.classList.contains("circle")){
               this.style.cursor = "not-allowed";
           } else{
               this.classList.add("cross-hover"); //|| this.classList.add(`{circle-hover}`)
           }
         if(currentTurn === "Player 02")
            if(this.classList.contains("circle") || this.classList.contains("cross")){
               this.style.cursor = "not-allowed";
           } else{
               this.classList.add("circle-hover"); //|| this.classList.add(`{circle-hover}`)
           }
    }
*/
    function hoverOut() {
    if (
        this.classList.contains("cross-hover") || 
        this.classList.contains("circle-hover")
    ) {
        this.classList.remove("cross-hover");
        this.classList.remove("circle-hover");
        }    
    }


     function reset() {
        cells.forEach(() => {
            cell.innerText = '';
            /* cell.classList.remove('circle');
            cell.classList.remove('cross'); */
            cell.addEventListener("mouseenter", hoverIn);
            cell.addEventListener("mouseleave", hoverOut);
            cell.removeEventListener('click', action, { once: true});
            cell.style.cursor = "not-allowed";
        });
        setTimeout(() => {
            overlay.classList.add("active");
        }, 2000);
    } 