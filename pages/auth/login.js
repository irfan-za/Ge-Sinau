import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Card from '../../components/base/card'
import TextField from '../../components/base/text-field'
import Divider from '@material-ui/core/Divider'
import Button, { ButtonVariant } from '../../components/base/button'
import InputGroup from '../../components/input-group'
import { handleInputChange } from '../../utils/component-handler.ts'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-4xl font-bold font-poppins mb-10">
          <span className="text-green-500">Ge&apos;</span>
          <span className="text-blue-500">Sinau</span>
        </div>
        <div className="col-span-2 flex justify-center items-center">
          <div className="w-80">
            <Card>
              <form method="POST">
                <div className="mb-3">
                  <InputGroup label="Email">
                    <TextField
                      required
                      value={email}
                      placeholder="Your email"
                      type="text"
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
                  <Button>Login</Button>
                </div>
                <Link href="/auth/register">
                  <>
                    <Button variant={ButtonVariant.secondary}>
                      Sign Up
                    </Button>
                  </>
                </Link>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
