
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
    const messagePlace = messageValue.lastIndexOf(' ', 30);
    let counter = 0;
    const num = messageValue[1];

    for (let i = 0; i < messageValue.length; i++){    
        if (num === messageValue[i]) {
            counter++;
        };

        if (counter >= 26) {
            alert('This message doesn`t make any sense');
            return 'alert: The maximum number of identical letters is 25'
        }
    }

    if (messageValue.length >= 30) {
        const messageMax = messageValue.replace(messagePlace, '<br>');

        if (messagePlace == -1 && messageValue.length > 35) {
            const messageMax = messageValue.replace(messageValue.slice(33, 35), '<br>'); //Eng 34 - 33, 36;  Ru 29 - 27, 30;

            return messageMax; 
        };

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

