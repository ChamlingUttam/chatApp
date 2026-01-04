import React, { useEffect } from 'react'
import ChatHeader from '../skeletons/ChatHeader'
import ChatInputs from '../skeletons/MessageInputs'
import { useChatStore } from '../store/useMessageStore'
import { useAuthStore } from '../store/useAuthStore'
import avatar from "../img/avatar.png"
import { formatMessageTime } from '../lib/utils'


const ChatContainer = () => {

  const{messages,getMessages,selectedUser,isMessageLoading} = useChatStore()
  const{authUser}=useAuthStore()
  useEffect(()=>{
    getMessages(selectedUser._id)
  },[selectedUser._id,getMessages])

  if(isMessageLoading) return <div>Loading...</div>
  return (
    <div className='flex-1 flex-col overflow-auto'>
      <ChatHeader/>

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message)=>(
          <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>

          <div className="chat-image avatar">
            <div className='size-10 rounded-full border'>
              <img src={message.senderId===authUser._id ? authUser.profilePic || avatar :  selectedUser.profilePic || avatar} alt="profile pic" />

            </div>

          </div>

          <div className='chat-header mb-1'>
            <time className='text-sm opacity-50 ml-1'>{formatMessageTime(message.createdAt)}</time>
          </div>
          <div className='chat-bubble flex flex-col'>
            {message.image&&(
              <img src={message.image} alt="attachment" className='sm-max-w-[200px] rounded-md mb-2' />
            )}
            {message.text && <p>{message.text}</p>}
          </div>
          </div>
        ))}

      </div>
      
      <ChatInputs/>
    </div>
  )
}

export default ChatContainer
