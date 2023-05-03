import React from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext';
import { useContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = ({message}) => {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext);

  useEffect(()=> {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc)=> {
      doc.exists() && setMessages(doc.data().messages)
    })

    return ()=> {
      unSub()
    }
  })

  return (
    <div className="messages">
    {messages.map((m) => (
      <Message message={m} key={m.id} />
    ))}
  </div>
  );
};

export default Messages;