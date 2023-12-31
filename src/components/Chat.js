
import React, { useState, useCallback, useEffect } from 'react';



export const Chat = () => {
	const [chatSocket, setChatSocket] = useState(null);

	useEffect(() => {
		const roomName = "lobby"

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