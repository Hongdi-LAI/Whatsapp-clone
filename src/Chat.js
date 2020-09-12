import { Avatar, IconButton } from '@material-ui/core'
import React , {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './Chat.css'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import AttachFile from '@material-ui/icons/AttachFile'
import MoreVert from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import db from './firebase'
import firebase from 'firebase'
import {useStateValue} from './StateProvider'

function Chat() {

    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot(snapshot => (setRoomName
                (snapshot.data().name)));
            
            // order by ascending timestamp
            db.collection('rooms').doc(roomId)
            .collection('messages').orderBy('timestamp','asc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ));
        }
    }, [roomId]) 

    const sendMessage = (e) => {
        e.preventDefault();

        if(input === ''){
            return;
        } else {
            db.collection('rooms').doc(roomId)
            .collection('messages').add({
                message: input,
                //get from google authentication
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }
        
        setInput('');
    };

    return (
        <div className ="chat">
            <div className = "chat__header">
                <Avatar 
                    src = {'https://image.similarpng.com/very-thumbnail/2020/05/Modern-WhatsApp-icon-PNG.png'}
                    alt = ""
                />
                <div className = "chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        {/* fetching the timestamp in last message of messages array */}
                        Last seen: {new Date(messages[messages.length - 1]?.
                        timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className = "chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className = "chat__body">
                {messages?.map((message) => (
                    // if the login user name change, the message box change 
                    <p className = 
                    {`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
                        <span className = "chat__name">
                            {message.name}
                        </span>
                        {message.message}
                        <span className = "chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>  
                    </p>
                ))}
            </div>

            <div className = "chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input
                        value = {input}
                        onChange = {e => setInput(e.target.value)}
                        type = "text" 
                        placeholder = "Type in a message..."    
                    />
                    <button 
                        type = "submit"
                        onClick = {sendMessage} 
                    >
                        Send a message
                    </button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>

        </div>
    )
}

export default Chat
