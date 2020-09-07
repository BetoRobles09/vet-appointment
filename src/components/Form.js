import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

const Form = ({ createAppointment }) => {
  const [appointment, setAppointment] = useState({
    pet: '',
    owner: '',
    date: '',
    time: '',
    symptoms: ''
  })

  const [error, setError] = useState(false)

  const updateState = e => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value
    })
  }

  const { pet, owner, date, time, symptoms } = appointment

  const submitAppointment = e => {
    e.preventDefault()
    if (pet.trim() === '' || owner.trim() === '' || date.trim() === '' || time.trim() === '' || symptoms.trim() === '') {
      setError(true)
      return
    }
    setError(false)

    appointment.id = uuid()

    createAppointment(appointment)

    setAppointment({
      pet: '',
      owner: '',
      date: '',
      time: '',
      symptoms: ''
    })
  }

  return (
    <>
      <h2>Create Appointment</h2>
      {error ? <p className='alerta-error'>All fields are mandatory</p> : null}
      <form onSubmit={submitAppointment}>
        <label>Pet name</label>
        <input type='text' name='pet' className='u-full-width' placeholder='Pet name' onChange={updateState} value={pet} />
        <label>Owner</label>
        <input type='text' name='owner' className='u-full-width' placeholder='Owner' onChange={updateState} value={owner} />
        <label>Date</label>
        <input type='date' name='date' className='u-full-width' onChange={updateState} value={date} />
        <label>Time</label>
        <input type='time' name='time' className='u-full-width' onChange={updateState} value={time} />
        <label>Symptoms description</label>
        <textarea className='u-full-width' name='symptoms' onChange={updateState} value={symptoms}> </textarea>
        <button type='submit' className='u-full-width button-primary'>Add Appointment</button>
      </form>
    </>
  )
}

export default Form
