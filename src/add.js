
//Getting Elements
const messageBox = document.querySelector('.message_box');
const login = document.querySelector('.login_input');
const message = document.querySelector('.rectangle_input');

//DOM template of message + Add message function
export function addMessage() {
    const loginValue = login.value;

    const div = document.createElement('div');
    div.classList.add('message_field');
    messageBox.append(div);

    const owner = document.createElement('div');
    owner.classList.add('message_owner');
    owner.innerHTML = loginValue;
    div.append(owner);

    const cancel = document.createElement('div');
    cancel.classList.add('message_cancel');
    div.append(cancel);

    //Delete new messages function
    const messegesCancel = document.querySelectorAll('.message_cancel');

    if (messegesCancel.length > 0) {
        messegesCancel.forEach(messageCancel => {
            messageCancel.addEventListener('click', deleteMessage);
                
            function deleteMessage(event) {
                if(event.target.closest('.message_cancel')) {
                    messageCancel.parentElement.style.cssText = `transform: translateY(-20px)`;
                            
                    setTimeout(() => {
                        messageCancel.parentElement.style.cssText = 'opacity: 0';
                    }, 200);
                            
                    setTimeout(() => {
                        messageCancel.parentElement.remove();
                    }, 400);
                }
            }
        })
    }

    const text = document.createElement('div');
    text.classList.add('message_text');
    text.innerHTML = resValue();
    div.append(text);

    const date = document.createElement('div');
    date.classList.add('message_date');
    date.innerHTML = formatDate();
    div.append(date);
}



//Message text check
function resValue() {
    let messageValue = message.value;
    const messagePlace = messageValue.lastIndexOf(' ', 35);

    if (messageValue.length >= 34) {
        const messageMax = messageValue.replace(messagePlace, '<br>');

        if (messagePlace == -1 && messageValue.length > 32) {
            const messageMax = messageValue.replace(messageValue.slice(30, 36), '<br>');
            
            return messageMax; 
        };

        /*for (let i = 0; messageValue.length > i; i++) {
            const item = messageValue.map(item);
            if (messageValue[i] == item ) {
                alert('This message doesn`t make any sence...');
            }
        }*/

        return messageMax;
    } else {
        return messageValue;
    }


}




//Getting Date
function formatDate() {
    const d = new Date();
    const hours = d.getHours()
    const minutes = d.getMinutes();
    const minutesRes = minutes.toString();
    
    let result = `${hours}:${minutes}`;
    let result0 = '';

    if (minutesRes.length < 2) {
        const result0 = `${hours}:0${minutes}`;
        return result0;
    }

    result == result0;

    return result;
}



//Scroll after sending
export function boxScroll() {
    setTimeout(() => {
        messageBox.scrollTo({
            top: 9999 * 9999,
            behavior: 'smooth'
        });
    }, 100);
}

