import React from 'react'
import Avatar from '@mui/material/Avatar'
import moment from 'moment'
import { useSelector } from 'react-redux'

const CommentMessage = ({ comment }) => {
  const { photoURL } = useSelector((state) => state.user)
  const { message, timeStamp, userName } = comment
  return (
    <>
      <div className="message-container">
        {photoURL ? (
          <Avatar
            alt="Remy Sharp"
            src={photoURL}
            sx={{ width: 25, height: 25 }}
          />
        ) : (
          <Avatar sx={{ width: 25, height: 25 }}>RS</Avatar>
        )}
        <div className="comment-message">
          <p>{message}</p>
          <div className="comment-info">
            <h3>{userName}</h3>
            <p>{moment(timeStamp).fromNow()}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentMessage
