/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import Head from 'next/head'
import PrivatePage from '../../../components/private-page'
import UserNavigation from '../../../components/user-navigation'
import Card from '../../../components/base/card'
import InputGroup from '../../../components/input-group'
import TextField from '../../../components/base/text-field'
import TextArea from '../../../components/base/text-area'
import CreatableSelect from '../../../components/base/creatable-select'
import Button from '../../../components/base/button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { ProcessComponentsExpression } from '../../../components/process-components'
import FlashAlert, {
  FlashAlertState,
  FlashAlertHandler,
  FlashAlertStatus
} from '../../../components/flash-alert.tsx'
import BookData from '../../../api/book-data'
import { useAuth } from '../../../auth/auth-provider'
import { handleInputChange, handleInputFileChange, refCallback } from '../../../utils/component-handler.ts'

export default function Add () {
  const { session } = useAuth()
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [videoFileName, setVideoFileName] = useState('')
  const [flashAlertState, setflashAlertState] = useState(FlashAlertState)

  /**
   * Clearing all state form to default
   */
  const clearForm = () => {
    setTitle('')
    setTags([])
    setDescription('')
    setVideoUrl('')
    setVideoFile(null)
    setVideoFileName('')
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
   * Set new creatable select value
   * @param {Array<any>} value
   */
  const handleCreatableSelectChange = (value) => {
    setTags(value)
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
    try {
      const uploadVideo = BookData.uploadMedia(videoFile, session.accessToken)
      const uploadVideoResponse = await uploadVideo.getResponse(percentage => console.log(percentage))
      const isSuccess = (uploadVideoResponse.status === 'success')

      if (isSuccess) {
        const videoId = uploadVideoResponse.data.mediaId
        const bookTags = tags.map(tag => tag.value)
        const addBookResponse = await BookData.add({
          title,
          tags: bookTags,
          body: description,
          video: videoId,
          thumbnail: videoId,
          accessToken: session.accessToken
        })

        if (addBookResponse.status === 'success') {
          clearForm()
          FlashAlertHandler.open('Book successfully added !', FlashAlertStatus.success, setflashAlertState)
        } else {
          throw new Error('Failed to upload book !')
        }
      } else {
        throw new Error('Upload media failed !')
      }
    } catch (error) {
      handleFormSubmitError(error)
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
          <form className="px-4 grid lg:grid-cols-2 gap-6 mb-4" onSubmit={handleFormSubmit}>
            <div>
              <div className="mb-2">
                <video className="w-full h-72" controls src={videoUrl}/>
              </div>
              <div>
                <input
                  required
                  type="file"
                  value={videoFileName}
                  onChange={(event) => {
                    handleInputFileChange(event, setVideoFile)
                    handleInputChange(event, setVideoFileName)
                  }}
                  />
              </div>
            </div>
            <Card>
              <div className="px-2">
                {/* <InputGroup label="Thumbnail">
                  <ButtonImage
                    image={imageFile}
                    onChange={handleButtonImageChange}
                    onClose={handleButtonImageClose}/>
                </InputGroup> */}
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
      <FlashAlert
        open={flashAlertState.open}
        status={flashAlertState.status}
        message={flashAlertState.message}
        onClose={() => { FlashAlertHandler.close(flashAlertState, setflashAlertState) }}
        autoHideDuration={2000} />
    </>
  )
}

// eslint-disable-next-line no-unused-vars
function ButtonImage ({ image, onChange, onClose, disableClose }) {
  const [refInput, setRefInput] = useState(null)
  const [file, setFile] = useState(null)
  const [imageSource, setImageSource] = useState('')
  const [isCloseDisabled, setIsCloseDisabled] = useState(false)

  /**
   * Handle click event from component
   */
  const handleClick = () => {
    refInput?.click()
  }

  /**
   * Handle close event from component
   */
  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  /**
   * Handle file state when updated
   */
  const handleFileChange = () => {
    if (file) {
      const fileURL = createFileObjectURL(file)
      setImageSource(fileURL)

      if (onChange) {
        onChange(file)
      }
    } else {
      setImageSource('')
    }
  }

  /**
   * Set file state when image props updated
   */
  const setImageFile = () => {
    if (image) {
      setFile(image)
    } else {
      setFile(null)
    }
  }

  /**
   * Set isDisableClose state when props updated
   */
  const setDisableClose = () => {
    if (disableClose !== undefined) {
      setIsCloseDisabled(disableClose)
    }
  }

  useEffect(handleFileChange, [file])
  useEffect(setImageFile, [image])
  useEffect(setDisableClose, [disableClose])

  return (
    <div className="cursor-pointer">
      <ProcessComponentsExpression isCanRender={Boolean(imageSource)}>
        <div className="relative">
          <input
            ref={(el) => refCallback(el, setRefInput)}
            type="file"
            className="hidden"
            onChange={(evt) => handleInputFileChange(evt, setFile)}
            />
          <ProcessComponentsExpression isCanRender={!isCloseDisabled}>
            <div onClick={handleClose} className="absolute top-0 right-0 transform translate-x-1 -translate-y-1">
              <IconButton className="w-6 h-6 flex justify-center items-center" style={{ backgroundColor: 'red' }}>
                <Icon className="text-white">close</Icon>
              </IconButton>
            </div>
          </ProcessComponentsExpression>
          <div onClick={handleClick} className="w-full h-80 bg-gray-300 flex justify-center items-center rounded-2xl overflow-hidden">
            <img className="object-cover w-full h-full" src={imageSource}/>
          </div>
        </div>
      </ProcessComponentsExpression>
      <ProcessComponentsExpression isCanRender={!imageSource}>
        <input
          ref={(el) => refCallback(el, setRefInput)}
          type="file"
          className="hidden"
          onChange={(evt) => handleInputFileChange(evt, setFile)}
          />
        <div onClick={handleClick} className="w-full h-80 bg-gray-300 flex justify-center items-center rounded-2xl overflow-hidden">
          <Icon>add</Icon>
        </div>
      </ProcessComponentsExpression>
    </div>
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
