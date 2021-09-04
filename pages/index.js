import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/base/button'

export default function Home () {
  return (
    <div>
      <Head>
        <title>Ge Sinau</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex justify-center items-center h-screen">
          <div className="w-64">
            <div className="text-4xl font-bold font-poppins mb-10 text-center">
              <span className="text-green-500">Ge&apos;</span>
              <span className="text-blue-500">Sinau</span>
            </div>
            <Link passHref href="/auth/login">
              <Button>
                <h2>Login &rarr;</h2>
              </Button>
          </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
