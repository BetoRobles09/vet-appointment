import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Appointment from './components/Appointment'

/*
global localStorage
*/

function App () {
  let initialAppointments = JSON.parse(localStorage.getItem('appointments'))
  if (!initialAppointments) {
    initialAppointments = []
  }

  const [listAppointment, setListAppointment] = useState(initialAppointments)

  useEffect(() => {
    if (initialAppointments) {
      localStorage.setItem('appointments', JSON.stringify(listAppointment))
    } else {
      localStorage.setItem('appointments', JSON.stringify([]))
    }
  }, [listAppointment, initialAppointments])

  const createAppointment = appointment => {
    setListAppointment([
      ...listAppointment,
      appointment
    ])
  }

  const deleteAppointment = id => {
    const newAppointments = listAppointment.filter(appointment => appointment.id !== id)
    setListAppointment(newAppointments)
  }

  const title = listAppointment.length === 0 ? 'No appointments' : 'Manage your appointments'

  return (
    <>
      <h1>Patient Manager</h1>
      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Form createAppointment={createAppointment} />
          </div>
          <div className='one-half column'>
            <h2>{title}</h2>
            {listAppointment.map(appointment => (
              <Appointment appointment={appointment} key={appointment.id} deleteAppointment={deleteAppointment} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
