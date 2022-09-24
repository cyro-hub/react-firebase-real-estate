import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/logo1.png'
import { BiUserCircle } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import * as typesOfActions from '../Redux/actionTypes'
import * as firebase from '../Firebase/firebase'
import { signOut } from 'firebase/auth'

const Nav = () => {
  const userInfo = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    signOut(firebase.auth)
      .then(() => {
        dispatch({ type: typesOfActions.getUserInfo, payload: null })
      })
      .catch((error) => {
        // An error happened.
      })
  }

  return (
    <div className="nav container">
      <img
        src={logo}
        alt="logo"
        onClick={() => {
          navigate('/')
        }}
      />
      {userInfo ? (
        userInfo?.photoURL ? (
          <Avatar
            onClick={handleLogout}
            alt="Remy Sharp"
            src={userInfo?.photoURL}
            sx={{ width: 30, height: 30 }}
          />
        ) : (
          <Avatar sx={{ width: 30, height: 30 }} onClick={handleLogout}>
            RS
          </Avatar>
        )
      ) : (
        <BiUserCircle
          size={30}
          onClick={() => {
            navigate('/login')
          }}
        />
      )}
    </div>
  )
}

export default Nav
