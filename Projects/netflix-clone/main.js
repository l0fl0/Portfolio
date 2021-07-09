let icon = document.getElementById('faq-1'); 
let answer = document.getElementById('answer-1');
let question = document.getElementById("What-is-Netflix?");
let question1 = document.getElementById('question1');



selectQ = () => {
    if (icon.innerHTML === '+') {
        answer.style.display = "block";
        return icon.innerHTML = '&times;';
    }
    icon.innerHTML = '&plus;';
    answer.style.display = "none";

}

//Listen for question click
question.addEventListener("click", selectQ)
