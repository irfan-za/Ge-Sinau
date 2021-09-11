import { useEffect, useState } from 'react'
import Head from 'next/head'
import PrivatePage from '../../components/private-page'
import UserNavigation from '../../components/user-navigation'
import Card from '../../components/base/card'
import InputGroup from '../../components/input-group'
import TextField from '../../components/base/text-field'
import TextArea from '../../components/base/text-area'
import CreatableSelect from '../../components/base/creatable-select'
import Button from '../../components/base/button'
import BookData from '../../api/book-data'
import { useAuth } from '../../auth/auth-provider'
import { handleInputChange, handleInputFileChange } from '../../utils/component-handler.ts'

export default function Add () {
  const { session } = useAuth()
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [fileName, setFileName] = useState('')

  /**
   * Clearing all state form to default
   */
  const clearForm = () => {
    setTitle('')
    setTags([])
    setDescription('')
    setVideoUrl('')
    setVideoFile(null)
    setFileName('')
  }

  /**
   * Set new creatable select value
   * @param {*} value
   */
  const handleCreatableSelectChange = (value) => {
    setTags(value)
  }

  /**
   * Set video url state
   */
  const handleVideoFileChange = () => {
    if (videoFile) {
      setVideoUrl(createFileObjectURL(videoFile))
    }
  }

  /**
   * Handle add book to api when form submitted
   * @param {import('react').FormEvent<HTMLFormElement>} event
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const uploadResponse = await BookData.uploadVideo(videoFile, session.accessToken)
      if (uploadResponse.status === 'success') {
        const videoId = uploadResponse.data.mediaId
        const bookTags = tags.map(tag => tag.value)
        const addBookResponse = await BookData.add({
          title,
          tags: bookTags,
          body: description,
          video: videoId,
          accessToken: session.accessToken
        })

        console.log(addBookResponse)
        clearForm()
      } else {
        throw new Error('Video upload failed !')
      }
    } catch (error) {
      let message = 'Something went wrong !'

      if (error.name === 'NetworkError') {
        message = 'Network error !'
      } else if (error.name === 'InternalServerError') {
        message = 'Internal server error !'
      }

      console.error(message)
    }
  }

  useEffect(handleVideoFileChange, [videoFile])

  return (
    <>
      <Head>
        <title>Add Book</title>
      </Head>
      <PrivatePage>
        <UserNavigation>
          <form className="px-4 grid lg:grid-cols-2 gap-6" onSubmit={handleFormSubmit}>
            <div>
              <div className="mb-2">
                <video className="w-full h-72" controls src={videoUrl}/>
              </div>
              <div>
                <input
                  required
                  type="file"
                  value={fileName}
                  onChange={(event) => {
                    handleInputFileChange(event, setVideoFile)
                    handleInputChange(event, setFileName)
                  }}
                  />
              </div>
            </div>
            <Card>
              <div className="px-2">
                <InputGroup label="Title">
                  <TextField
                    required
                    value={title}
                    onChange={(event) => { handleInputChange(event, setTitle, 60) }}
                    type="text"
                    placeholder="Book title"
                    />
                </InputGroup>
                <InputGroup label="Tags">
                  <CreatableSelect
                    required
                    isMulti
                    value={tags}
                    onChange={handleCreatableSelectChange}
                    />
                </InputGroup>
                <InputGroup label="Description">
                  <TextArea
                    required
                    value={description}
                    onChange={(event) => { handleInputChange(event, setDescription) }}
                    placeholder="Write description"
                    />
                </InputGroup>
                <div className="mt-4">
                  <Button type="submit">Save</Button>
                </div>
              </div>
            </Card>
          </form>
        </UserNavigation>
      </PrivatePage>
    </>
  )
}

/**
 * Create object url from file input
 * @param {File} file
 * @returns - object url
 */
function createFileObjectURL (file) {
  const objectURL = window.URL.createObjectURL(file)
  return objectURL
}
