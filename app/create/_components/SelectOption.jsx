import Image from 'next/image'
import React, { useState } from 'react'

function SelectOption({selectedStudyType}) {
    const Options=[
        {
            name:'Exam',
            icon:'/download.png'
        },
        {
            name:'Job Interview',
            icon:'/download (1).png'
        },
        {
            name:'Practice',
            icon:'/download (2).png'
        },
        {
            name:'Coding prep',
            icon:'/download (3).png'
        },
        {
            name:'Other',
            icon:'/download (4).png'
        },

    ]


    const [SelectedOption,setSelectedOption]=useState()

  return (
    <div>
        <h2 className='text-center mb-2 text-lg '>
            For which you want to create course
        </h2>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5'>
            {
                Options.map((option,index)=>(
                    <div key={index} className={`p-4 flex flex-col items-center justify-center border rounded-xl hover:border-primary cursor-pointer
                        ${option?.name==SelectedOption&&'border-primary'}
                        `} 
                    onClick={()=>{setSelectedOption(option.name);selectedStudyType(option.name)}}
                    >

                        <Image src={option.icon} alt={option.name} width={50} height={50}/>
                        <h2 className='text-sm mt-2'>

                            {option.name}

                        </h2>

                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default SelectOption