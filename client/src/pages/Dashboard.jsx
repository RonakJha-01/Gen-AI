import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets/assets'
import { Layers, Sprout} from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import CreationItems from '../components/CreationItems'
import bgImage from '../assets/assets/gradientBackground.png';
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const Dashboard = () => {

    const [creations, setCreations] = useState([])
    const [loading, setLoading] = useState(true)
      
    
      const {getToken} = useAuth()

    const getDashboardData = async () => {
     
        try {

         const {data} = await axios.get('/api/user/get-user-creations', 
          {headers:{Authorization: `Bearer ${await getToken()}`}}
        )

        if (data.success){
          setCreations(data.creations)
        }
        else{
          toast.error(data.message)
        }

        
       } catch (error) {
        toast.error(error.message)
       }
        
       setLoading(false)
    }

    useEffect(()=>{
      getDashboardData()
    },[])

  return (
    <div className='bg-cover bg-no-repeat bg-fixed bg-center min-h-screen h-full overflow-y-scroll p-6'
    style={{ backgroundImage: `url(${bgImage})` }}>
    
      <div className='flex justify-start gap-4 flex-wrap'>



       
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200 '>
         
          <div className='text-slate-600'>
            <p className='text-sm'>Total Creation</p>
            <h2 className='text-xl font-semibold'>{creations.length}</h2>
          </div>

          <div className='w-10 h-10 bg-primary rounded-lg text-white flex justify-center items-center '>
            <Layers className='w-5 text-white' />
          </div>

        </div>



        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200 '>
         
          <div className='text-slate-600'>
            <p className='text-sm'>Your Plan</p>
            <h2 className='text-xl font-semibold' >
                 <Protect plan='premium' fallback='free'>Premium</Protect> 
            </h2>
          </div>

          <div className='w-10 h-10 bg-primary rounded-lg text-white flex justify-center items-center '>
            <Sprout className='w-5 text-white' />
          </div>

        </div>

      </div>

       {loading ? ( <div className='flex justify-center items-center h-3/4'>
      <div className='w-11 h-11 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin'> </div> 
    </div>)
     : (<div className='space-y-3'>
        <p className='mt-6 mb-4'>Search History</p>

        {
          creations.map((item)=> <CreationItems key={item.id} item={item} /> )
        }

      </div>)}

      
      
    </div>
  )
}

export default Dashboard
