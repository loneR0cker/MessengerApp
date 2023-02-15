import {addMessage, boxScroll} from "./add";

//Fields Check + Add message start
const form = document.getElementById('form');
form.addEventListener('submit', formSend);
    
async function formSend(e) {
    e.preventDefault();
        
    let error = formCheck(form);
        
    if (error === 0) {
        //Add message function Start 
        addMessage();
        boxScroll();
    } else {
        setTimeout(() => {
            alert('Please fill empty fields');
        }, 200);
    }
}
    
function formCheck() {
    let error = 0;
    let formReq = document.querySelectorAll('.req');
        
    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);
            
        if (input.value === '') {
            formAddError(input);
            error++;
        }
    }
    return error;
}
function formAddError(input) {
    input.classList.add('error');
}
function formRemoveError(input) {
    input.classList.remove('error');
}