let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true; // true => O, false => X

const winnigpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const reset = () =>{
    turn0 = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
};

boxes.forEach((box)=> {
    box.addEventListener("click",() => {
        if(turn0) {
            box.innerText = "O";
            turn0 = false;
        }else{
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText ="";
    }
};

const showwinner = (winner) =>{
    msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () =>{
    msg.innerText = "😅 Match Draw!";
    msgcontainer.classList.remove("hide");
};

const checkWinner = () => {
    let isWinner = false;

    for (let pattern of winnigpatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;        

        if (pos1val != "" && pos2val != "" && pos3val != ""){
            if (pos1val === pos2val && pos2val === pos3val){
                showwinner(pos1val);
                isWinner = true;
                break;
            }
        }
    }

    // Agar winner nahi mila to check karo draw hai ya nahi
    if (!isWinner) {
        let allFilled = true;
        boxes.forEach((box)=>{
            if(box.innerText === ""){
                allFilled = false;
            }
        });

        if(allFilled){
            showDraw();
        }
    }
};

// 🔗 Buttons ko connect karo
resetbtn.addEventListener("click", reset);
newGamebtn.addEventListener("click", reset);
