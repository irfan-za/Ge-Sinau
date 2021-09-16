import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import PrivatePage from '../../../components/private-page'
import UserNavigation from '../../../components/user-navigation'
import Card from '../../../components/base/card'
import InputGroup from '../../../components/input-group'
import TextField from '../../../components/base/text-field'
import TextArea from '../../../components/base/text-area'
import CreatableSelect from '../../../components/base/creatable-select'
import Button, { ButtonVariant } from '../../../components/base/button'
import FlashAlert, {
  FlashAlertState,
  FlashAlertHandler,
  FlashAlertStatus
} from '../../../components/flash-alert.tsx'
import AlertDialog, { DialogBoxHandler as dialogHandler } from '../../../components/dialog-box.tsx'
import BookData from '../../../api/book-data'
import ApiBaseURL from '../../../constant/api-base-url'
import { useAuth } from '../../../auth/auth-provider'
import { handleInputChange, handleInputFileChange } from '../../../utils/component-handler.ts'

/**
 * Get detail book by id then pass to Edit page component props
 * @param {import('next').NextPageContext} context
 * @returns
 */
export async function getServerSideProps (context) {
  const bookId = context.query.slug
  const response = await BookData.get(bookId)
  return {
    props: response.data.book
  }
}

Edit.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  body: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired
}

export default function Edit (props) {
  const { session } = useAuth()
  const bookId = props.id
  const [title, setTitle] = useState(props.title)
  const [tags, setTags] = useState(mapToReactSelectValue(props.tags))
  const [description, setDescription] = useState(props.body)
  const [videoUrl, setVideoUrl] = useState(`${ApiBaseURL.origin}/upload/media/${props.video}`)
  const [videoFile, setVideoFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [flashAlertState, setflashAlertState] = useState(FlashAlertState)
  const [dialogOpen, setDialogOpen] = useState(false)

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
   * Delete book by id from Api
   * @param {boolean} isCanDelete
   */
  const performDeleteBook = async (isCanDelete) => {
    try {
      if (isCanDelete) {
        const response = await BookData.delete(bookId, session.accessToken)
        console.log(response)
      }
    } catch (error) {
      FlashAlertHandler.open(error.message, FlashAlertStatus.error, setflashAlertState)
    }
  }

  /**
   * Handle error when adding book to api
   * @param {Error} error
   */
  const handleFormSubmitError = (error) => {
    let message = 'Something went wrong !'

    if (error.name === 'NetworkError') {
      message = 'Network error !'
    } else if (error.name === 'InternalServerError') {
      message = 'Internal server error !'
    }

    FlashAlertHandler.open(message, FlashAlertStatus.error, setflashAlertState)
  }

  /**
   * Handle add book to api when form submitted
   * @param {import('react').FormEvent<HTMLFormElement>} event
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    const uploadVideo = await BookData.uploadVideo(videoFile, session.accessToken)
    uploadVideo(
      /**
       * Perform add book to api after video uploaded
       * @param {JSON} response
       */
      async (response) => {
        try {
          const uploadResponse = response
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

            if (addBookResponse.status === 'success') {
              clearForm()
              FlashAlertHandler.open('Book successfully added !', FlashAlertStatus.success, setflashAlertState)
            } else {
              throw new Error('Failed to upload book !')
            }
          } else {
            throw new Error('Video upload failed !')
          }
        } catch (error) {
          handleFormSubmitError(error)
        }
      },
      /**
       * Update upload video progress precentage
       * @param {number} progress video upload precentage
       */
      (progress) => {
        // Progress precentage handler
      },
      handleFormSubmitError)
  }

  useEffect(handleVideoFileChange, [videoFile])

  return (
    <>
      <Head>
        <title>Edit Book</title>
      </Head>
      <PrivatePage>
        <UserNavigation>
          <form className="px-4 grid lg:grid-cols-2 gap-6 mb-4" onSubmit={handleFormSubmit}>
            <div>
              <div className="mb-2">
                <video className="w-full h-72" controls src={videoUrl}/>
              </div>
              <div>
                <input
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
                <div className="mb-2">
                  <Button type="submit">Update</Button>
                </div>
                <div>
                  <Button
                    variant={ButtonVariant.secondary}
                    onClick={() => dialogHandler.open(setDialogOpen)}>
                    Delete
                    </Button>
                </div>
                </div>
              </div>
            </Card>
          </form>
        </UserNavigation>
      </PrivatePage>
      <AlertDialog
        open={dialogOpen}
        title="Are you sure to delete this category ?"
        message="All contained data in this category will be deleted !"
        onResponse={(response) => dialogHandler.response(response, performDeleteBook, setDialogOpen)}
        />
      <FlashAlert
        open={flashAlertState.open}
        status={flashAlertState.status}
        message={flashAlertState.message}
        onClose={() => { FlashAlertHandler.close(flashAlertState, setflashAlertState) }}
        autoHideDuration={2000} />
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

/**
 * Convert array of string to react-select component supported input value
 * @param {Array<string>} array
 * @returns
 */
function mapToReactSelectValue (array) {
  return array.map(item => ({
    label: item,
    value: item
  }))
}
