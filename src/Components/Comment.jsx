import React, { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import './scss/comment.scss'
import Modal from '@mui/material/Modal'
import { MdSend } from 'react-icons/md'
import CommentMessage from './CommentMessage'
import { useSelector } from 'react-redux'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import * as firebase from '../Firebase/firebase'
import ClipLoader from 'react-spinners/ClipLoader'
import { v4 as uuidv4 } from 'uuid'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 325,
  bgcolor: '#111721',
  borderRadius: 2,
  border: 'none',
  outline: 'none',
  p: 1,
}

export default function BasicModal({
  open,
  setOpen,
  comments,
  uid,
  property_type,
}) {
  const [isInputting, setIsInputting] = useState(true)
  const [loading, setLoading] = useState(false)
  const userInfo = useSelector((state) => state.user)
  const [userComment, setUserComment] = useState({
    message: '',
    timeStamp: new Date().toUTCString(),
    photoURL: userInfo?.photoURL || '',
    userName: userInfo?.displayName || 'User',
    id: uuidv4(),
  })
  const opinions = useMemo(() => comments.reverse(),[comments])
  const handleClose = () => setOpen(false)
  const handleOnFocusInput = (e) => {
    setIsInputting(!isInputting)
  }

  const submitComment = async () => {
    if (!userComment.message) return

    setLoading(true)
    const propertyRef = doc(firebase.db, 'properties', uid)
    return await updateDoc(propertyRef, {
      comments: arrayUnion({ userComment }),
    }).then(() => {
      setUserComment({
        message: '',
        timeStamp: new Date().toUTCString(),
        photoURL: userInfo?.photoURL || '',
        userName: userInfo?.displayName || 'User',
        id: uuidv4(),
      })
      setLoading(false)
    })
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className="comment-input">
          <div className="input-container">
            {isInputting && <p>Opinion on {property_type}</p>}
            <div className="input">
              <input
                type="text"
                name="name"
                onFocus={handleOnFocusInput}
                onBlur={handleOnFocusInput}
                value={userComment.message}
                autoComplete='off'
                onChange={(e) =>
                  setUserComment({ ...userComment, message: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    submitComment()
                  }
                }}
              />
            </div>
          </div>
          {loading ? (
            <ClipLoader color={'white'} loading={true} size={30} />
          ) : (
            <MdSend size={30} onClick={submitComment} />
          )}
        </div>
        <div className="comment">
          {opinions?.map(({ userComment }) => (
            <CommentMessage comment={userComment} key={userComment.timeStamp} />
          ))}
        </div>
      </Box>
    </Modal>
  )
}

