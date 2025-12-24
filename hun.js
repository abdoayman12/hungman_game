// hangman game
// create letters
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let lettersENG = `abcdefghijklmnopqrstuvwxyz${+a.join("")}.`;
let lettersArray = Array.from(lettersENG);
let containerLetters = document.querySelector(".letters");
let containerLetter = document.querySelectorAll(".letters .span-letter");
let containerLetterarr = Array.from(containerLetter);
// gennrate letters
lettersArray.forEach((letter) =>{
    // create span
    let span = document.createElement("span");
    span.classList.add("span-letter");
    //create text node
    let textNodeLetter = document.createTextNode(letter);
    // add text node in span
    span.appendChild(textNodeLetter);
    //add span in container letter
    containerLetters.appendChild(span);
});
//create object
let category;
let xmlReqoust = new XMLHttpRequest();
xmlReqoust.open("GET", "word.json");
xmlReqoust.send("word.json");
xmlReqoust.onload = function(){
    if (xmlReqoust.readyState === 4 && xmlReqoust.status === 200){
        let jsonXml = JSON.parse(xmlReqoust.responseText);
        category = Object.assign({}, jsonXml);
        let allkeys  = Object.keys(category);
        let randomProbnumber = Math.floor(Math.random() * allkeys.length);
        let randomProbKeys = allkeys[randomProbnumber];
        let randomKeysValue = category[randomProbKeys];
        let randomValueNumber = Math.floor(Math.random() * randomKeysValue.length);
        let randomValue = randomKeysValue[randomValueNumber];
        let randomValueArray = Array.from(randomValue);
        // add random category in category div
        document.querySelector(".category span").innerHTML = randomProbKeys;
        let letterGussesContainer = document.querySelector(".letters-guess");
        let lettersRandomValue = Array.from(randomValue);
        lettersRandomValue.forEach((letter, index) =>{
            let span = document.createElement("span");
            if (letter === " "){
                span.innerHTML = " ";
                span.classList.add("with-space");
            }
            // add span in letter guesses container
            letterGussesContainer.appendChild(span);
            // get random property
            // select guess span
            let guessSpan = document.querySelectorAll(".letters-guess span");
            let failed = 0;
            let theDraw = document.querySelector(".hangman-draw");
            // click letter
            document.addEventListener("click", (eve)=>{
                if (document.querySelector(".pope")){
                    return;
                }
                let statues = false;
                if (eve.target.className === "span-letter"){
                    eve.target.classList.add("clicked");
                    let theletter = eve.target.innerHTML.toLowerCase();
                    let thechoosen = Array.from(randomValue.toLowerCase())
                    thechoosen.forEach((wordLetter, wordIndex)=>{
                        if (wordLetter === theletter){
                            statues = true;
                            let allspan = document.querySelectorAll(".letters-guess span");
                            let arrspan = Array.from(allspan);
                            arrspan[wordIndex].innerHTML = theletter;
                            let newarr = arrspan.filter(span=>{return span.innerHTML !== '';})
                            if (newarr.length === randomValue.length){
                                let level;
                                if (failed < 4){
                                    level = "professional"
                                }else if (failed <= 6){
                                    level = "middle"
                                }else if (failed === 7){
                                    level = "Beginner"
                                }
                                winEndGame(level);
                            }
                        };
                    });
                    if (statues !== true){
                        failed++;
                        theDraw.classList.add(`failed-${failed}`);
                        if (failed === 8){
                            endLoseGame();
                        }
                    }
                };
            });
            document.addEventListener("keydown", function(eve){
                    if (document.querySelector(".pope")){
                        return;
                    }
                    let statues = false;
                    let allSpanLetter = document.querySelectorAll(".letters .span-letter");
                    let arrspansCliked = Array.from(allSpanLetter).filter(span => span.classList.contains("clicked"));
                    let arrspansClikedText = arrspansCliked.map(span => span.innerHTML.toLocaleLowerCase());
                    if (arrspansClikedText.includes(eve.key)){
                        return;
                    }
                    if (lettersArray.includes(eve.key)){
                        lettersArray.forEach((letter, index)=>{
                            if (eve.key.toLowerCase() === letter.toLowerCase()){
                                let spansGuess = document.querySelectorAll(".letters-guess span");
                                let arrspanGuess = Array.from(spansGuess);
                                let thechoosen = Array.from(randomValue.toLowerCase());
                                allSpanLetter[index].classList.add("clicked");
                                thechoosen.forEach((wordLetter, wordindex)=>{
                                    if (wordLetter === eve.key.toLowerCase()){
                                        statues = true;
                                        arrspanGuess[wordindex].innerHTML = wordLetter;
                                        let newarr = arrspanGuess.filter(span=> span.innerHTML !== "");
                                        if (newarr.length === randomValue.length){
                                        let level;
                                        if (failed < 4){
                                            level = "professional"
                                        }else if (failed <= 6){
                                            level = "middle"
                                        }else if (failed === 7){
                                            level = "Beginner"
                                        }
                                        winEndGame(level);
                                        }
                                    }
                                })
                            }
                        })
                if (statues !== true){
                    failed++;
                    theDraw.classList.add(`failed-${failed}`)
                    if (failed === 8){
                        endLoseGame();
                    }
                }
                    }
        })
            function winEndGame(level){
                let div = document.createElement("div");
                div.classList.add("pope");
                let textWin = document.createTextNode(`you win the your level is ${level}`);;
                let btn = document.createElement("button");
                btn.classList.add("btn-div");
                btn.innerHTML = "again";
                div.appendChild(textWin);
                div.appendChild(btn);
                document.body.appendChild(div);
                document.querySelector(".btn-div").onclick = function(){
                    location.reload();
                };
            };
            function endLoseGame(){
                let div = document.createElement("div");
                let btn = document.createElement("button");
                btn.classList.add("btn-div");
                btn.innerHTML = "again";
                div.classList.add("pope");
                let textLose;
                if (!isNaN(parseInt(randomValue))){
                    textLose = document.createTextNode(`you lose, the number is ${randomValue}`);
                }else{
                    textLose = document.createTextNode(`you lose, the word is ${randomValue}`);
                }
                div.appendChild(textLose);
                div.appendChild(btn);
                document.body.appendChild(div);
                document.querySelector(".btn-div").onclick = function(){
                    location.reload();
                };
            };
        });
    }
}