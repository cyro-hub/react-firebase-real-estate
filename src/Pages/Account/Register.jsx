import React, { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook, BsApple } from 'react-icons/bs'
import './scss/form.scss'
import { useNavigate } from 'react-router-dom'
import * as firebase from '../../Firebase/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import * as typesOfActions from '../../Redux/actionTypes'
import Nav from '../../Components/Nav'

var passwordPattern = new RegExp('^[0-9A-Za-z]{8,}$')
var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const provider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

const Register = () => {
  const [isInputting, setIsInputting] = useState({
    email: true,
    password: true,
    confirmPassword: true,
    google: true,
    facebook: true,
    apple: true,
  })
  const userInfo = useSelector((state) => state.user)
  const [warning, setWarning] = useState('')
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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

    if (!passwordPattern.test(user.password)) {
      setWarning('Password must contain atleast 8 letter or numbers')
      return
    }
    if (!user.email.match(emailPattern)) {
      setWarning('Email incorrect')
      return
    }
    if (user.password !== user.confirmPassword) {
      setWarning('Password does not match')
      return
    }

    return await createUserWithEmailAndPassword(
      firebase.auth,
      user.email,
      user.password,
    )
      .then((userCredential) => {
        let user = userCredential.user

        setUser({
          email: '',
          password: '',
          confirmPassword: '',
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
      })
  }

  const registerWithGoogle = () => {
    signInWithPopup(firebase.auth, provider)
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

  const registerWithFacebook = () => {
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
        console.log(`${errorCode}:${errorMessage}`)
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
      <Nav />
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <h2>Register</h2>
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
        <div className="input-container">
          {isInputting.confirmPassword && <p>Confirm Password</p>}
          <div className="input">
            <input
              type="password"
              name="confirmPassword"
              onFocus={handleOnFocusInput}
              onBlur={handleOnBlurInput}
              value={user.confirmPassword}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="submit-container">
          <button type="submit" className="submit">
            Register
          </button>
          <button
            className="swap"
            type="button"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
        <div className="continue-other-method">Register with other methods</div>
        <div className="continue-container" onClick={registerWithGoogle}>
          {isInputting.google && <p>Continue with Google</p>}
          <div
            className="input continue-register"
            onMouseOver={() => handleOnMouseOver('google')}
            onMouseLeave={() => handleOnMouseLeave('google')}
          >
            <FcGoogle size={20} />
          </div>
        </div>
        <div className="continue-container" onClick={registerWithFacebook}>
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

export default Register
