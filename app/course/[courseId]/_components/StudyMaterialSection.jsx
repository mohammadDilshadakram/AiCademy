import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem'
import Link from 'next/link'

function StudyMaterialSection({courseId,course}) {


    const MaterialList=[
        {
            name:'Notes/chapters',
            desc:'"Your ultimate study guide, one note at a time!"',
            icon:'/download5.png',
            path:'/notes',
            type:'notes'
        },
        {
            name:'FlashCard',
            desc:'"Learn faster, one flip at a time!"    ',
            icon:'/download5.png',
            path:'/flashcard',
            type:'FlashCard'
        },
        {
            name:'Quiz',
            desc:'"Test your knowledge, ace your goals!"                                       ',
            icon:'/download5.png',
            path:'/quiz',
            type:'Quiz'
        },
        {
            name:'Question/Answer',
            desc:'Read notes to prepare it',
            icon:'/download5.png',
            path:'/qa',
            type:'QA'
        }
    ]


    const [studyTypeContent,setStudyTypeContent]=useState()

    useEffect(()=>{
        GetStudyMaterial();

    },[])


    const GetStudyMaterial=async()=>{
        const result=await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'ALL'
        })

        console.log(result?.data);
        setStudyTypeContent(result.data)
    }

  return (
    <div className='mt-3'>
        <h2 className='font-medium text-xl'>Study Material</h2>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>

            
            {MaterialList.map((item,index)=>(
                // <Link key={index} href={'/course/'+courseId+item.path}>
                 <MaterialCardItem key={index} item={item} 
                 studyTypeContent={studyTypeContent}
                 course={course}
                 refreshData={GetStudyMaterial}
                 />
                //  </Link>
            ))}
            
            
           
        </div>
    </div>
  )
}

export default StudyMaterialSection