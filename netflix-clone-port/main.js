      let icon = document.getElementById('faq-1');let question = document.querySelectorAll('.question-container');

    icon.textContent = "+"


selectQ = () => {
    if (icon.textContent === '+'){
        icon.textContent = 'x';
    }
    icon.textContent = "+"
    
}

//Listen for question click
question.forEach(item => item.addEventListener('click', selectQ))


//TODO: finish open FAQs