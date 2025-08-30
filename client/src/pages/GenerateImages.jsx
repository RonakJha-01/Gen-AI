import React, { useState } from 'react'
import { assets } from '../assets/assets/assets'
import { Bot, Edit, Image, PencilLine } from 'lucide-react'
import bgImage from '../assets/assets/newBackground.png';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {

  const imageStyle =
    ['Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style',
      'Realistic style', '3D style', 'Portrait style']

  const [selectedstyle, setSelectedStyle] = useState('Realistic')
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState(false)

    const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const {getToken} = useAuth()


  const onSubmitHandler = async (e) => {
    e.preventDefault();

     try {

        setLoading(true)
        const prompt = `Generate an image of ${input} in the style of ${selectedstyle}.` // this prompt will be sent to backend our for us or user prompt will be simple as input by gemini will get it like this "Generate a blog title about ${input} in the category of ${selectedCategory}" so it could give better result and this prompt is also visible in the database but no user can see this prompt they see their own prompt only
        const {data} = await axios.post('/api/ai/generate-images', {prompt, publish},
          {headers:{Authorization: `Bearer ${await getToken()}`}}
        )

        if (data.success){
          setContent(data.content)
        }
        else{
          toast.error(data.message)
        }

        
       } catch (error) {
        toast.error(error.message)
       }
        
       setLoading(false)
  }


  return (
    <div className=' bg-cover bg-no-repeat bg-fixed bg-center min-h-screen h-full 
    overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'
      style={{ backgroundImage: `url(${bgImage})` }} >

      {/* left side */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-[rgba(0,0,0,0.4)], bg-[hsla(210,100%,50%,0.15)] rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Image className='w-6 text-primary' />
          <h1 className='text-xl font-semibold text-white'>AI Image Generator</h1>
        </div>
        <p className='mt-6 text-sm font-semibold text-gray-200'>Your Imagination, Rendered</p>

        <textarea onChange={(e) => setInput(e.target.value)} value={input} rows={4} className='w-full
       p-2 px-3 mt-2 outline-none text-sm rounded-md border bg-white border-gray-300'
          placeholder='Describe the image in your mind…' required />

        <p className='mt-4 text-sm font-medium text-gray-200'>Styles</p>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {imageStyle.map((item) => (
            <span onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedstyle === item ? 
                'bg-primary/50 text-white'
                : 'text-gray-800 bg-gray-400 border-gray-300'
                }`} key={item} > {item}

            </span>
          ))
          }

        </div>

        <div className='my-6 flex items-center gap-2'>
          <label className="relative cursor-pointer">
            <input type="checkbox" onChange={(e)=> setPublish(e.target.checked)}
            checked = {publish} className='sr-only peer' />

            <div className='w-9 h-5 bg-slate-400 rounded-full peer-checked:bg-primary transition'></div>
            <span className='absolute left-1 top-1 w-3 h-3 bg-black rounded-full transition 
            peer-checked:translate-x-4'></span>
          </label>
          <p className='text-sm text-white'>Public this image</p>

        </div>

        <br />

        <button disabled = {loading} className='w-full flex justify-center items-center gap-2 bg-primary text-white px-4 py-2 mt-6
      text-sm rounded-lg cursor-pointer'>

        {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'> </span> 
                : <Image className='w-5' /> 
      }
          
          Generate Magic
        </button>
      </form>

      {/* right side*/}
      <div className= {`w-full max-w-lg p-4 
     rounded-lg flex flex-col border border-gray-200 min-h-96
      ${content ? "bg-[hsla(220,100%,20%,0.85)]" : "bg-[hsla(210,100%,50%,0.15)]" }`}
      >
        <div className='flex items-center gap-3'>
          <Bot className='w-5 h-5 text-primary' />
          <h1 className='text-xl font-semibold text-white'>Your Masterpiece</h1>
        </div>

        {!content ? (<div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-black'>
            <Image className='w-9 h-9 text-primary' />
            <p className='text-primary font-semibold' >Your AI-crafted image will appear here once the magic is done </p>
          </div>
        </div>)
         : 
         (<div className='mt-3 h-full overflow-y-scroll text-sm text-white'>
               
                         <div className='mt-3 h-full'>
                           <img src={content} alt="image" className='w-full h-full'  />
                           </div>
               
                       </div>)}

        

      </div>


    </div>
  )
}

export default GenerateImages
