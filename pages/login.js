import { useState, useContext, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from "next/router"
import Card from '../components/base/card'
import TextField from '../components/base/text-field'
import Divider from '@material-ui/core/Divider'
import Button, { ButtonVariant } from '../components/base/button'
import InputGroup from '../components/input-group'
import { handleInputChange } from '../utils/component-handler.ts'
import styles from '../styles/auth/Login.module.css'
// user context
import { UserContext } from '../components/UserContext'


export default function Login () {
  const [currentUser, setCurrentUser]=useContext(UserContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const buttonRef=useRef(null)
  const router=useRouter()

  useEffect(() => {
    if(currentUser){
      router.push("/article")
    }
  }, [currentUser])


  /**
   * Handle submit form event to perform login
   * @param {React.FormEventHandler<HTMLFormElement>} event
   */
  const handleFormSubmit = (event) => {
    event.preventDefault()
    console.log(buttonRef.current.textContent)
    buttonRef.current.textContent="Loading...";
      setCurrentUser({
        email,password
      })
    buttonRef.current.textContent="Login";
    
  }

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
                    <InputGroup label="Email">
                      <TextField
                        required
                        value={email}
                        placeholder="Your email"
                        type="email"
                        onChange={(event) => handleInputChange(event, setEmail, 255)}/>
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
                    <Button ref={buttonRef} type="submit">Login</Button>
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
    </>
  )
}