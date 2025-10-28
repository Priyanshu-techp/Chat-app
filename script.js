alert('This chat app is the only interface not full devloped app. and this is under building')
document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('message-form');
    const msgInput = document.getElementById('msg-input');
    const chatMessages = document.getElementById('chat-messages');
    const currentUserSpan = document.getElementById('current-user');

    const username = prompt('Enter your name:') || 'You';
    currentUserSpan.innerText = username;


    function outputMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        if (message.own) {
            messageDiv.classList.add('own');
        }

        const messageContent = `
                    <div class="meta">${message.username}</div>
                    <div class="text">${message.text}</div>
                    <div class="time">${message.time}</div>
                `;

        messageDiv.innerHTML = messageContent;
        chatMessages.appendChild(messageDiv);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    const initialMessages = [
        { username: 'Ritik', text: 'Hello everyone!', time: '10:25 AM', own: false },
        { username: 'Subham', text: 'Hi Ritik! How are you?', time: '10:26 AM', own: false },
        { username: 'Lalit', text: 'Welcome to the group chat!', time: '10:28 AM', own: false }
    ];

    initialMessages.forEach(msg => outputMessage(msg));

    function sendMessage() {
        const msgText = msgInput.value.trim();
        if (!msgText) return;

        const message = {
            username,
            text: msgText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            own: true
        };

        outputMessage(message);
        msgInput.value = '';
        msgInput.focus();

        setTimeout(() => {
            const reply = {
                username: 'Bot',
                text: 'Thanks for your message!',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                own: false
            };
            outputMessage(reply);
        }, 1000);
    }

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sendMessage();
    });

    msgInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
});