import { generateNotesAiModel, GenerateQuizAiModel, GenerateStudyTypeContentAiModel } from "@/configs/AiModel";
import { inngest } from "./client";
import { db } from '@/configs/db';


import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import { eq } from 'drizzle-orm';

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { event,body:"Hello,World" };
  },
);



export const CreateNewUser = inngest.createFunction(
  { id: 'create-user' },
  { event: 'user.create' },
  async ({ event, step }) => {

    const {user}=event.data;

    //get event data
    const result = await step.run('check user and create now if not in db', async () => {

      // check is user already exist

      const result = await db.select().from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))

      console.log(result)

      if (result?.length == 0) {
        //if not,then add to db
        const userResp = await db.insert(USER_TABLE).values({
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress
        }).returning({ id: USER_TABLE.id })

        return userResp 

       
      }

      return result;

      
    })

    return 'Success';
  }) 


 export const GenerateNotes=inngest.createFunction(
  {id:'generate-course'},
  {event:'notes.generate'},
  async({event,step})=>{
    const {course}=event.data;

    //genertae notes for each chaptere using ai

    const notesResult=await step.run('Generate Chapter Notes',async()=>{
      const Chapters=course?.courseLayout?.chapters;
      let index=0;
      Chapters.forEach(async(chapter)=>{
        const PROMPT='generate exam material detail content for each chapter, make sure to include all topics point in the content,make sure to give content in html format (Do not include htmlkl,head ,body,title tag) the chapters:'+JSON.stringify(chapter);

        const result=await generateNotesAiModel.sendMessage(PROMPT);

        const aiResp=result.response.text(); 

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId:index,
          courseId:course?.courseId,
          notes:aiResp 
        })

        index=index+1;
      })
      return 'Completed'
    })


    //update staus to ready
    const updateCourseStatusResult=await step.run('Update course status to ready',async()=>{
      const result=await db.update(STUDY_MATERIAL_TABLE).set({
        status:'Ready'

      }).where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId))
      return 'Success'
    });


  }
)



// used to generate flash card .quiz , question and answer
export const GenerateStudyTypeContent=inngest.createFunction(
  {id:'Generate Study Type Content'},
  {event:'studyType.content'},

  async({event,step})=>{
    const {studyType,prompt,courseId,recordId}=event.data;

    const AiResult=await step.run('Generating FlashCard using Ai',async()=>{

      const result=
      studyType=='FlashCard'?
      await GenerateStudyTypeContentAiModel.sendMessage(prompt):
      await GenerateQuizAiModel.sendMessage(prompt)
      const AIResult=JSON.parse(result.response.text());

      return AIResult

    })

    const DbResult=await step.run('Save Result to Db',async()=>{
      const result=await db.update(STUDY_TYPE_CONTENT_TABLE)
      .set({
        content:AiResult,
        status:'Ready'
      }).where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))
      


      return 'Data inserted'
    })
  }
)