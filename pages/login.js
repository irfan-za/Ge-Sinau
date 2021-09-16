import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
import { handleInputChange } from '../utils/component-handler.ts'
import styles from '../styles/Login.module.css'

// useAuth hook
import { useAuth } from '../auth/auth-provider'

export default function Login () {
  const router = useRouter()
  const { login, session, getRejectedFromURL, clearRejectedFromURL } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [flashAlertState, setflashAlertState] = useState(FlashAlertState)

  /**
   * Redirect to page if user session available
   */
  const redirectToPrivatePage = () => {
    const blockedFrom = getRejectedFromURL()
    if (session && router) {
      if (blockedFrom) {
        router.push(blockedFrom)
        clearRejectedFromURL()
      } else {
        router.push('/user/books')
      }
    }
  }

  /**
   * Do user login
   */
  const performLogin = async () => {
    try {
      FlashAlertHandler.open('Loading ...', FlashAlertStatus.info, setflashAlertState)
      const { isSuccess, message } = await login(username, password)
      if (isSuccess) {
        redirectToPrivatePage()
      } else {
        FlashAlertHandler.open(message, FlashAlertStatus.info, setflashAlertState)
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
   * Handle submit form event to perform login
   * @param {React.FormEventHandler<HTMLFormElement>} event
   */
  const handleFormSubmit = (event) => {
    event.preventDefault()
    performLogin()
  }

  useEffect(redirectToPrivatePage, [session, router])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="relative">
        <div className={`w-screen h-screen ${styles.bgLogin} absolute`}></div>
        <div className='flex flex-col items-center justify-center h-screen'>
          <div className="text-4xl font-bold font-poppins mb-14">
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
                  <div className="mb-10">
                    <InputGroup label="Password">
                      <TextField
                        required
                        value={password}
                        placeholder="Your password"
                        type="password"
                        onChange={(event) => handleInputChange(event, setPassword, 255)}/>
                    </InputGroup>
                  </div>
                  <div className="mb-2">
                    <Divider/>
                  </div>
                  <div className="mb-2">
                    <Button type="submit">Login</Button>
                  </div>
                  <Link passHref href="/register">
                    <Button variant={ButtonVariant.secondary}>
                      Sign Up
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
