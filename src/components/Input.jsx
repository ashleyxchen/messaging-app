import React from 'react'
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";



const Input = () => {

  const [text, setText] = useState("")
  const [img, setImg] = useState(null)

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {
    if (img) { // send text & img

      const storageRef = ref(storage, uuid);
      const uploadTask = uploadBytesResumable(storageRef, img)

      uploadTask.on(
        (error) => {
          // setErr(true)
        }, 
        () => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {   // update arr in firestore
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      )
      
    } else { // send text
      await updateDoc(doc(db, "chats", data.chatId), {   // update arr in firestore
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    
    // save to currUser
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    // save to other user
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("")
    setImg(null)
  };

  return (
    <div className="input">
    <input
      type="text"
      placeholder="Type something..."
      onChange={(e) => setText(e.target.value)}
      value={text}
    />
    <div className="send">
      <img src={Attach} alt="" />
      <input
        type="file"
        style={{ display: "none" }}
        id="file"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <label htmlFor="file">
        <img src={Img} alt="" />
      </label>
      <button onClick={handleSend}>Send</button>
    </div>
  </div>
  )
}

export default Input
