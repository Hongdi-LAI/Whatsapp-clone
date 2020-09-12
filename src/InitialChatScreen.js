import React, {useState} from 'react';
import './InitialChatScreen.css';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {Avatar, IconButton} from '@material-ui/core';

function InitialChatScreen() {

    return (
        <div className ="initialChatScreen">
            <div className = "initialChatScreen__header">
                <Avatar 
                    src = {'https://image.similarpng.com/very-thumbnail/2020/05/Modern-WhatsApp-icon-PNG.png'}
                    alt = ""
                />
                <div className = "initialChatScreen__headerInfo">{' '}</div>  
                <div className = "initialChatScreen__headerRight">
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
            <div className = "initialChatScreen__body">
                <h1>Select or Add Your Chat On the Left</h1>
            </div>
            <div className = "initialChatScreen__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input/>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default InitialChatScreen
