"use client"

import React, { useState } from 'react'
import SelectOption from './_components/SelectOption'
import { Button } from '@/components/ui/button';
import TopicInput from './_components/TopicInput';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Create() {

    const [step,setStep]=useState(0);

    const [formData, setFormData] = useState([]);
    const [loading,setLoading]=useState(false);

    const {user}=useUser();
    const router=useRouter()



    const handleUserInput=(fieldName,fieldValue)=>{

        setFormData(prev=>({
            ...prev,
            [fieldName]:fieldValue 


        }))
        console.log(formData);

    }

 
    const GenerateCourseOutline=async ()=>{
        const courseId=uuidv4();
        setLoading(true);
        const result=await axios.post('/api/generate-course-outline',{
            courseId:courseId,
            ...formData,

            createdBy:user?.primaryEmailAddress?.emailAddress
        });

        setLoading(false);

        router.replace('/dashboard')

        toast("Your course has been Generating")

        console.log(result.data.result.resp)


    }


    // const GenerateCourseOutline = async () => {
    //     if (!user?.primaryEmailAddress?.emailAddress) {
    //         alert("User email is missing.");
    //         return;
    //     }
    
    //     if (!formData.courseType || !formData.topic || !formData.difficultyLevel) {
    //         alert('Please fill out all fields.');
    //         return;
    //     }
    
    //     setIsLoading(true);
    
    //     try {
    //         const courseId = uuidv4();
    //         const payload = {
    //             courseId,
    //             ...formData,
    //             createdBy: user.primaryEmailAddress.emailAddress,
    //         };
    
    //         console.log('Payload:', payload);
    
    //         const result = await axios.post('/api/generate-course-outline', payload);
    //         console.log('API Response:', result.data);
    
    //         alert('Course outline generated successfully!');
    //     } catch (error) {
    //         console.error('Axios Error:', error);
    //         alert(`Error: ${error.response?.data?.error || 'An unexpected error occurred.'}`);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    


  return (
    <div className='flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20'>
        <h2 className='font-bold text-4xl text-primary'>Start creating course with using dilshad technology</h2>
        <p className='text-gray-500 text-lg'>Fill all details to generate the course</p>


        <div className='mt-10'>
            {step==0?
            <SelectOption selectedStudyType={(value)=>handleUserInput('courseType',value)} />
            :<TopicInput 
            setTopic={(value)=>handleUserInput('topic',value)}
            setDifficultyLevel={(value)=>handleUserInput('difficultyLevel',value)}
            
            />}
              
        </div>

        <div className='flex justify-between w-full mt-32'>

            {step!=0?  <Button variant="outline" onClick={()=>setStep(step-1)}>Previous</Button>:
            ' .'}
            {step==0?<Button onClick={()=>setStep(step+1)}>Next</Button>
            :
            <Button onClick={GenerateCourseOutline} disabled={loading} >
                {loading?<Loader className='animate-spin' />:'Generate'}
    
            </Button>}
        </div>



    </div>
  )
}

export default Create