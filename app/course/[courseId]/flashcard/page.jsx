'use client'

import axios from 'axios'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Flashcarditem from './_components/Flashcarditem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"



function Flashcards() {

  const { courseId } = useParams();
  const [flashCards, setFlashCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState()
  const [api,setApi]=useState();

  useEffect(() => {
    GetFlashCards();
  }, [])

  useEffect(()=>{
    if (!api) {
      return ;
      
    }
    api.on('select',()=>{
      setIsFlipped(false);
    })
  },[api])

  const GetFlashCards = async () => {
    const result = await axios.post('/api/study-type', {
      courseId: courseId,
      studyType: 'FlashCard'
    });

    setFlashCards(result?.data)
    console.log('FlashCard', result.data)
  
  }


  const handleClick = (index) => {
    setIsFlipped(!isFlipped)
  }




  return (
    <div>


      <h2 className='font-bold text-3xl'>FlashCards</h2>
      <p>The Ultimate tool to check concepts</p>


      <div>
        <Carousel setApi={setApi}>
          <CarouselContent>

            {flashCards?.content&&flashCards.content?.map((flashcard, index) => (
              <CarouselItem key={index} className='flex items-center justify-center my-10'>
                <Flashcarditem handleClick={handleClick}
                  isFlipped={isFlipped}
                  flashcard={flashcard} />
              </CarouselItem>
            )

            )}

          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>


      </div>



    </div>
  )
}

export default Flashcards