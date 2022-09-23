import React, { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook, BsApple } from 'react-icons/bs'
import './scss/form.scss'
import { useNavigate } from 'react-router-dom'
import * as firebase from '../../Firebase/firebase'
import logo from '../../assets/logo1.png'
import { BiUserCircle } from 'react-icons/bi'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from 'firebase/auth'
import Avatar from '@mui/material/Avatar'
import { signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import * as typesOfActions from '../../Redux/actionTypes'

var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

const Login = () => {
  const userInfo = useSelector((state) => state.user)
  const [isInputting, setIsInputting] = useState({
    email: true,
    password: true,
    google: true,
    facebook: true,
    apple: true,
  })
  const [warning, setWarning] = useState('')
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleOnFocusInput = (e) => {
    setIsInputting({ ...isInputting, [e.target.name]: false })
  }

  const handleOnBlurInput = (e) => {
    setIsInputting({ ...isInputting, [e.target.name]: true })
  }

  const handleOnMouseOver = (prop) => {
    setIsInputting({ ...isInputting, [prop]: false })
  }

  const handleOnMouseLeave = (prop) => {
    setIsInputting({ ...isInputting, [prop]: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    for (const key in user) {
      if (user[key] === '') {
        setWarning(`${key} is empty`)
        return
      }
    }

    if (!user.email.match(emailPattern)) {
      setWarning('Email incorrect')
      return
    }

    return await signInWithEmailAndPassword(
      firebase.auth,
      user.email,
      user.password,
    )
      .then((userCredential) => {
        let user = userCredential.user

        setUser({
          email: '',
          password: '',
        })

        dispatch({
          type: typesOfActions.getUserInfo,
          payload: user,
        })

        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setWarning(`${errorCode}:${errorMessage}`)
        navigate('/register')
      })
  }

  const handleLogout = () => {
    signOut(firebase.auth)
      .then(() => {
        dispatch({ type: typesOfActions.getUserInfo, payload: null })
      })
      .catch((error) => {
        // An error happened.
      })
  }

  const loginWithGoogle = () => {
    signInWithPopup(firebase.auth, googleProvider)
      .then((result) => {
        let user = result.user
        dispatch({
          type: typesOfActions.getUserInfo,
          payload: user,
        })

        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setWarning(`${errorCode}:${errorMessage}`)
      })
  }

  const loginWithFacebook = () => {
    signInWithPopup(firebase.auth, facebookProvider)
      .then((result) => {
        let user = result.user
        dispatch({
          type: typesOfActions.getUserInfo,
          payload: user,
        })

        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setWarning(`${errorCode}:${errorMessage}`)
      })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setWarning('')
    }, 4000)
    return () => clearTimeout(timer)
  })

  return (
    <div className="contact">
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
            />
          ) : (
            <Avatar onClick={handleLogout}>RS</Avatar>
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
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <h2>Login</h2>
        </div>
        {warning && <p className="warning">{warning}</p>}
        <div className="input-container">
          {isInputting.email && <p>Email</p>}
          <div className="input">
            <input
              type="text"
              name="email"
              onFocus={handleOnFocusInput}
              onBlur={handleOnBlurInput}
              value={user.email}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="input-container">
          {isInputting.password && <p>Password</p>}
          <div className="input">
            <input
              type="password"
              name="password"
              onFocus={handleOnFocusInput}
              onBlur={handleOnBlurInput}
              value={user.password}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="submit-container">
          <button type="submit" className="submit">
            Login
          </button>
          <button
            className="swap"
            type="button"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
        <div className="continue-other-method">Register with other methods</div>
        <div className="continue-container" onClick={loginWithGoogle}>
          {isInputting.google && <p>Continue with Google</p>}
          <div
            className="input continue-register"
            onMouseOver={() => handleOnMouseOver('google')}
            onMouseLeave={() => handleOnMouseLeave('google')}
          >
            <FcGoogle size={20} />
          </div>
        </div>
        <div className="continue-container" onClick={loginWithFacebook}>
          {isInputting.facebook && <p>Continue with Facebook</p>}
          <div
            className="input continue-register"
            onMouseOver={() => handleOnMouseOver('facebook')}
            onMouseLeave={() => handleOnMouseLeave('facebook')}
          >
            <BsFacebook size={20} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
