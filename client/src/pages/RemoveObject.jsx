import React, { useState } from 'react';
import { assets } from '../assets/assets/assets';
import { Bot, Edit, Eraser, PencilLine, Scissors } from 'lucide-react';
import bgImage from '../assets/assets/newBackground.png'; // ✅ Import background image
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState('');
  const [object, setObject] = useState('');
  const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')
  
    const {getToken} = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

        setLoading(true)

       if (object.split(' ').length > 1) {
        return toast('Please eneter a single object')
        
       }

        const formData = new FormData();
        formData.append('image', input)
        formData.append('object', object)

         const {data} = await axios.post('/api/ai/remove-object', formData, 
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
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-fixed bg-center min-h-screen h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700"
      style={{ backgroundImage: `url(${bgImage})` }} // ✅ Use imported image
    >
      {/* Left side */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-[hsla(210,100%,50%,0.15)] rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Scissors className="w-6 text-primary" />
          <h1 className="text-xl font-semibold text-white">AI Object Remover</h1>
        </div>
        <p className="mt-6 text-sm font-semibold text-gray-200">Erase What You Don't Embrace</p>

        <input
          onChange={(e) => setInput(e.target.files[0])}
          type="file"
          accept='image/*'
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border bg-white border-gray-300 cursor-pointer "
          required
        />

       <p className='mt-6 text-sm font-semibold text-gray-200'>What do you want to remove </p>

        <textarea onChange={(e) => setObject(e.target.value)} value={object} rows={4} className='w-full
       p-2 px-3 mt-2 outline-none text-sm rounded-md border bg-white border-gray-300'
          placeholder='Type any object you want to remove' required />


        <button disabled = { loading } className="w-full flex justify-center items-center gap-2 bg-primary text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
                    {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'> </span> 
                       : <Scissors className="w-5" />
             }
          
             Magic
        </button>
      </form>

      {/* Right side */}
      <div className= {`w-full max-w-lg p-4 
     rounded-lg flex flex-col border border-gray-200 min-h-96
      ${content ? "bg-[hsla(220,100%,20%,0.85)]" : "bg-[hsla(210,100%,50%,0.15)]" }`}
      >
       <div className="flex items-center gap-3">
          <Bot className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-semibold text-white">Gone Without a Trace</h1>
        </div>

        { !content ? ( <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-black">
            <Scissors className="w-9 h-9 text-primary" />
            <p className='text-primary font-semibold'>Poof! Object gone. See your polished pic here </p>
          </div>
        </div>) : (<div className='mt-3 h-full overflow-y-scroll text-sm text-white'>
               
                         <div className='mt-3 h-full'>
                           <img src={content} alt="image" className='w-full h-full'  />
                           </div>
               
                       </div>)}
       
      </div>
    </div>
  );
};

export default RemoveObject;
