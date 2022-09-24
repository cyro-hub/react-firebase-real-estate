import React, { useEffect, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import * as firebase from '../Firebase/firebase'
import './scss/contact.scss'
import { v4 as uuidv4 } from 'uuid'
import ClipLoader from 'react-spinners/ClipLoader'
import governorates from '../data/kuwait-governorates.json'

const Contact = () => {
  const [warning, setWarning] = useState('')
  const [success,setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [areas, setAreas] = useState(governorates[0].areas)
  const [isInputting, setIsInputting] = useState({
    name: true,
    governorates: true,
    areas: true,
    message: true,
  })
  const [contact, setContact] = useState({
    name: '',
    governorate: 'Capital Governorate',
    area: 'Abdullah as-Salim suburb',
    message: '',
    key: uuidv4(),
  })
  const handleOnFocusInput = (e) => {
    setIsInputting({ ...isInputting, [e.target.name]: false })
  }

  const handleOnBlurInput = (e) => {
    setIsInputting({ ...isInputting, [e.target.name]: true })
  }

  const handleChanges = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    for (const key in contact) {
      if (!contact[key]) {
        setWarning(`${key} is empty`)
        return
      }
    }
    setLoading(true)
    const contactRef = doc(firebase.db, 'contact', uuidv4())
    return await setDoc(contactRef, contact, { merge: true }).then(() => {
      setContact({
        name: '',
        governorate: contact.governorate,
        area: contact.area,
        message: '',
        key: uuidv4(),
      })
      setSuccess('Thanks for reaching to us')
      setLoading(false)
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setWarning('')
      setSuccess('')
    }, 4000)

    return clearTimeout(timer)
  })

  useEffect(() => {
    governorates?.map((governorate) => {
      if (governorate.title.en === contact?.governorate) {
        setAreas(governorate.areas)
      }
    })
  }, [contact.governorate])

  return (
    <div className="contact">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <h2>Contact</h2>
        </div>
        {success && <p className="success">{success}</p>}
        {warning && <p className="warning">{warning}</p>}
        <div className="input-container">
          {isInputting.name && <p>Name</p>}
          <div className="input">
            <input
              type="text"
              name="name"
              onFocus={handleOnFocusInput}
              onBlur={handleOnBlurInput}
              placeholder="Name"
              value={contact.name}
              onChange={handleChanges}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="input-container">
          {isInputting.governorates && <p>Governorates</p>}
          <div className="input">
            <select name="governorate" onChange={handleChanges}>
              <option value="Capital Governorate">Capital Governorate</option>
              <option value="Hawalli Governorate">Hawalli Governorate</option>
              <option value="Mubarak al-Kabeer Governorate">
                Mubarak al-Kabeer Governorate
              </option>
              <option value="Ahmadi Governorate">Ahmadi Governorate</option>
              <option value="Farwaniya Governorate">
                Farwaniya Governorate
              </option>
              <option value="Jahra Governorate">Jahra Governorate</option>
            </select>
          </div>
        </div>
        <div className="input-container">
          {isInputting.areas && <p>Areas</p>}
          <div className="input">
            <select name="area" onChange={handleChanges}>
              {areas?.map((area) => (
                <option value={area.en} key={area.en}>
                  {area.en}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="input-container">
          {isInputting.message && <p>Message</p>}
          <div className="input">
            <textarea
              type="text"
              name="message"
              onFocus={handleOnFocusInput}
              onBlur={handleOnBlurInput}
              placeholder="message"
              value={contact.message}
              onChange={handleChanges}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="input-container submit-container">
          {loading ? (
            <ClipLoader
              className="submit"
              color={'white'}
              loading={true}
              size={30}
            />
          ) : (
            <button type="submit" className="submit">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Contact
