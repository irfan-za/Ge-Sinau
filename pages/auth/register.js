import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Card from '../../components/base/card'
import TextField from '../../components/base/text-field'
import Divider from '@material-ui/core/Divider'
import Button, { ButtonVariant } from '../../components/base/button'
import InputGroup from '../../components/input-group'
import FlashAlert, {
  FlashAlertState,
  FlashAlertHandler,
  FlashAlertStatus
} from '../../components/flash-alert.tsx'
import { handleInputChange } from '../../utils/component-handler.ts'
import styles from '../../styles/auth/Login.module.css'

export default function Register () {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationPassword, setValidationPassword] = useState('')
  const [flashAlertState, setflashAlertState] = useState(FlashAlertState)

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
   * Handle submit form event to create user account
   * @param {React.FormEventHandler<HTMLFormElement>} event
   */
  const handleFormSubmit = (event) => {
    event.preventDefault()
    const passwordValidator = validatePassword()

    if (passwordValidator.isMatch) {
      // Do register here
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
        <div className={`w-screen h-screen ${styles.bgLogin} absolute`}></div>
        <div className='flex flex-col items-center justify-center h-screen'>
          <div className="text-4xl font-bold font-poppins mb-8">
            <span className="text-green-500">Ge&apos;</span>
            <span className="text-blue-500">Sinau</span>
          </div>
          <div className="col-span-2 flex justify-center items-center">
            <div className="w-80 md:w-96">
              <Card>
                <form className="m-2" onSubmit={handleFormSubmit}>
                  <div className="mb-3 mt-2">
                    <InputGroup label="Username">
                      <TextField
                        required
                        value={username}
                        placeholder="Your username"
                        type="text"
                        onChange={(event) => handleInputChange(event, setUsername, 255)}/>
                    </InputGroup>
                  </div>
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
                  <div className="mb-2">
                    <Divider/>
                  </div>
                  <div className="mb-2">
                    <Button type="submit">Create Account</Button>
                  </div>
                  <Link passHref href="/auth/login">
                    <Button variant={ButtonVariant.secondary}>
                      Sign In
                    </Button>
                  </Link>
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
