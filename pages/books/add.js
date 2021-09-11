import Head from 'next/head'
import PrivatePage from '../../components/private-page'
import UserNavigation from '../../components/user-navigation'
import Card from '../../components/base/card'
import InputGroup from '../../components/input-group'
import TextField from '../../components/base/text-field'
import TextArea from '../../components/base/text-area'
import Button from '../../components/base/button'

export default function Add () {
  return (
    <>
      <Head>
        <title>Add Book</title>
      </Head>
      <PrivatePage>
        <UserNavigation>
          <div className="px-4 grid lg:grid-cols-2 gap-6">
            <div>
              <div className="mb-2">
                <iframe
                  className="w-full h-72"
                  src="https://www.youtube.com/embed/GTcM3qCeup0"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen/>
              </div>
              <div>
                <input type="file"/>
              </div>
            </div>
            <Card>
              <div className="px-2">
                <InputGroup label="Title">
                  <TextField type="text" placeholder="Book title"/>
                </InputGroup>
                <InputGroup label="Description">
                  <TextArea placeholder="Write description"/>
                </InputGroup>
                <div className="mt-4">
                  <Button>Save</Button>
                </div>
              </div>
            </Card>
          </div>
        </UserNavigation>
      </PrivatePage>
    </>
  )
}
