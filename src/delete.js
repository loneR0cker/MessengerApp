
//Geeting elements
const messageBox = document.querySelector('.message_box');
const messegesCancel = document.querySelectorAll('.message_cancel');

//Delete old messeges function
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




