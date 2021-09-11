import { useState, useRef } from 'react'
import TextField from '../components/base/text-field'
import Divider from '@material-ui/core/Divider'
import Button, { ButtonVariant } from '../components/base/button'
import InputGroup from '../components/input-group'
import TextareaAutosize from "../components/base/text-area"
import { handleInputChange } from '../utils/component-handler.ts'




export default function CreateBook(){
  const buttonRef = useRef(null)
  const tagContainer =useRef(null)
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [description, setDescription] = useState('')
  console.log(description)

  const handleFormSubmit = (event) => {
    event.preventDefault()
    console.table(title, tag, description)
  }
  
  const tagHandler=()=>{
    return tagContainer.current.innerHtml=<button className="border border-blue-600 bg-blue-100 text-blue-600">{tag}</button>
  }
  return(
    <div className="container mx-auto">
      <h1 className="text-center text-3xl text-blue-500 font-bold mt-3">Post New Book</h1>
      <div className="w-3/5 mx-auto">
        <form className="m-2" onSubmit={handleFormSubmit}>
          <div className="mb-3 mt-2">
            <InputGroup label="Judul">
              <TextField
                required
                value={title}
                type="text"
                onChange={(event) => handleInputChange(event, setTitle, 255)}/>
            </InputGroup>
          </div>
          <div className="mb-3 mt-2">
            <InputGroup label="Tag">
              <TextField
                required
                value={tag}
                type="text"
                onChange={(event) => handleInputChange(event, setTag, 255)}/>
            </InputGroup>
            <div ref={tagContainer}></div>
            <button onClick={tagHandler} className="px-2 py-0.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold">Add</button>
          </div>
          <div className="mb-10">
            <h2 className="mb-2 font-roboto text-lg font-medium text-gray-800">Video</h2>
            <input type="file" id="video" name="video" accept="video/*"/>
          </div>
          <div className="mb-10">
            <InputGroup label="Deskripsi">
            <TextareaAutosize 
              required
              aria-label="minimum height" 
              minRows={3} 
              value={description}
              onChange={(event) => handleInputChange(event, setDescription, 255)}/>
            </InputGroup>
          </div>
          <div className="mb-2">
            <Divider/>
          </div>
            <Button ref={buttonRef} type="submit">Submit</Button>
        </form>
      </div>
    </div>
  )
}