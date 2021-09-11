import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Card from '../components/base/card'
import TextField from '../components/base/text-field'
import Divider from '@material-ui/core/Divider'
import Button, { ButtonVariant } from '../components/base/button'
import InputGroup from '../components/input-group'
import FlashAlert, {
  FlashAlertState,
  FlashAlertHandler,
  FlashAlertStatus
} from '../components/flash-alert.tsx'
import UserData from '../api/user-data'
import { handleInputChange } from '../utils/component-handler.ts'
import styles from '../styles/Login.module.css'

export default function Register () {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationPassword, setValidationPassword] = useState('')
  const [flashAlertState, setflashAlertState] = useState(FlashAlertState)

  /**
   * Clear application form
   */
  const clearForm = () => {
    setName('')
    setUsername('')
    setEmail('')
    setPassword('')
    setValidationPassword('')
  }

  /**
   * Password matching validator
   * @returns validator response
   */
  const validatePassword = () => {
    let isMatch = false
    let message = ''

    if (password === validationPassword) {
      isMatch = true
      message = 'Your password is match !'
    } else {
      isMatch = false
      message = "Your password isn't match !"
    }

    return {
      isMatch,
      message
    }
  }

  /**
   * Do new user registration
   * @async
   */
  const performRegister = async () => {
    try {
      FlashAlertHandler.open('Loading ...', FlashAlertStatus.info, setflashAlertState)
      const response = await UserData.register({ fullname: name, username, email, password })
      if (response.status === 'success') {
        clearForm()
        FlashAlertHandler.open('Success to register account', FlashAlertStatus.success, setflashAlertState)
      } else {
        const message = response.message || 'Failed to create account'
        FlashAlertHandler.open(message, FlashAlertStatus.error, setflashAlertState)
      }
    } catch (error) {
      let message = 'Something went wrong !'

      if (error.name === 'NetworkError') {
        message = 'Network error !'
      } else if (error.name === 'InternalServerError') {
        message = 'Internal server error !'
      }

      FlashAlertHandler.open(message, FlashAlertStatus.error, setflashAlertState)
    }
  }

  /**
   * Handle submit form event to create user account
   * @param {React.FormEventHandler<HTMLFormElement>} event
   */
  const handleFormSubmit = (event) => {
    event.preventDefault()
    const passwordValidator = validatePassword()

    if (passwordValidator.isMatch) {
      performRegister()
    } else {
      FlashAlertHandler.open(
        "Your password doesn't match !",
        FlashAlertStatus.error,
        setflashAlertState
      )
    }
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="relative">
        <div className={`w-screen h-screen fixed ${styles.bgLogin}`}></div>
        <div className='flex flex-col items-center justify-center pt-10 pb-10'>
          <div className="text-4xl font-bold font-poppins mb-8">
            <span className="text-green-500">Ge&apos;</span>
            <span className="text-blue-500">Sinau</span>
          </div>
          <div className="col-span-2 flex justify-center items-center">
            <div>
              <Card>
                <form className="p-4" onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                    <div className="col-span-1">
                      <div className="mb-3">
                        <InputGroup label="Full Name">
                          <TextField
                            required
                            value={name}
                            placeholder="Your name"
                            type="text"
                            onChange={(event) => handleInputChange(event, setName, 255)}/>
                        </InputGroup>
                      </div>
                      <div className="mb-3">
                        <InputGroup label="Username">
                          <TextField
                            required
                            value={username}
                            placeholder="Your username"
                            type="text"
                            onChange={(event) => handleInputChange(event, setUsername, 20)}/>
                        </InputGroup>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="mb-3">
                        <InputGroup label="Email">
                          <TextField
                            required
                            value={email}
                            placeholder="Your email"
                            type="email"
                            onChange={(event) => handleInputChange(event, setEmail, 255)}/>
                        </InputGroup>
                      </div>
                      <div className="mb-3">
                        <InputGroup label="Password">
                          <TextField
                            required
                            value={password}
                            placeholder="Your password"
                            type="password"
                            onChange={(event) => handleInputChange(event, setPassword, 255)}/>
                        </InputGroup>
                      </div>
                      <div className="mb-10">
                        <InputGroup label="Re-Enter Password">
                          <TextField
                            required
                            value={validationPassword}
                            placeholder="Type your password again"
                            type="password"
                            onChange={(event) => handleInputChange(event, setValidationPassword, 255)}/>
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <Divider/>
                    </div>
                    <div className="mb-2">
                      <Button type="submit">Create Account</Button>
                    </div>
                    <Link passHref href="/login">
                      <Button variant={ButtonVariant.secondary}>
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <FlashAlert
        open={flashAlertState.open}
        status={flashAlertState.status}
        message={flashAlertState.message}
        onClose={() => { FlashAlertHandler.close(flashAlertState, setflashAlertState) }}
        autoHideDuration={2000} />
    </>
  )
}
