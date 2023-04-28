// import React, { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext'
// import { ChatContext } from '../context/ChatContext'

// const Message = () => {
//   const {currentUser} = useContext(AuthContext)
//   const {data} = useContext(ChatContext)
  
//   return (
//     <div className='message owner'>
//       <div className='messageInfo'>
//       <img
//           src=""
//           alt=""
//         /> 
//         <span>Just now</span>
//       </div>
      
//       <div className="messageContent">
//         <p>hello</p>
//       </div>
//     </div>
//   )
// }

// export default Message

import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  // scroll to bottom
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      // check message or owner
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={ // show img for message or owner
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
