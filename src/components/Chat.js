
import React, { useState, useCallback, useEffect } from 'react';



export const Chat = () => {
	const [chatSocket, setChatSocket] = useState(null);

	useEffect(() => {
		const roomName = "lobby"

		if(chatSocket == null) {
			const chatSocket = new WebSocket(
				'ws://localhost:8000/ws/chat/'
				+ roomName
				+ '/'
			);
			setChatSocket(chatSocket);
			chatSocket.onmessage = function(e) {
				const data = JSON.parse(e.data);
				document.querySelector('#chat-log').value += (data.message + '\n');
			};

			chatSocket.onclose = function(e) {
				console.error('Chat socket closed unexpectedly');
			};

			document.querySelector('#chat-message-input').onkeyup = function(e) {
				if (e.keyCode === 13) {  // enter, return
					document.querySelector('#chat-message-submit').click();
				}
			};

			document.querySelector('#chat-message-submit').onclick = function(e) {
				const messageInputDom = document.querySelector('#chat-message-input');
				const message = messageInputDom.value;
				chatSocket.send(JSON.stringify({
					'message': message
				}));
				messageInputDom.value = '';
			};
		}


	}, [chatSocket]);
	return (
		<div>
			<textarea id="chat-log" cols="100" rows="20"></textarea><br/>
			<input id="chat-message-input" type="text" size="100" /><br/>
			<input id="chat-message-submit" type="button" value="Send"/>
		</div>
	);
};

export default Chat;