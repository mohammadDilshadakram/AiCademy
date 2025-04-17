import { courseOutlineAiModel } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";


 
export async function POST(req){
    const {courseId,topic,courseType,difficultyLevel,createdBy}=await req.json();

    const PROMPT='Generate a study material for '+topic+' for '+courseType+' and level of difficulty will be '+difficultyLevel+' with summary of course and emoji icon for each chapter,notes should be in raw html format list of chapters along with summary for each chapter topic list in each chapter, All result in JSON format'

    const aiResp=await courseOutlineAiModel.sendMessage(PROMPT);
    const aiResult=JSON.parse(aiResp.response.text()); 

    //save the result along with user input
    const dbResult=await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId:courseId,
        courseType:courseType,
        createdBy:createdBy,
        topic:topic,
        courseLayout:aiResult
    }).returning({resp:STUDY_MATERIAL_TABLE})


    const result=await inngest.send({
        name:'notes.generate',
        data:{
            course:dbResult[0].resp
        }
    })

    console.log(result);

    console.log(dbResult)

    return NextResponse.json({result:dbResult[0]})
}

 

// export async function POST(req) {
//     try {
//         const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();

//         if (!courseId || !topic || !courseType || !difficultyLevel || !createdBy) {
//             console.error("Validation Error: Missing required fields");
//             return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//         }

//         const PROMPT = `Generate a study material for ${topic} for ${courseType} and level of difficulty will be ${difficultyLevel} with summary of course, list of chapters along with summary for each chapter, topic list in each chapter. All result in JSON format`;

//         console.log("Generated Prompt:", PROMPT);

//         const aiResp = await courseOutlineAiModel.sendMessage(PROMPT);
//         console.log("AI Response:", aiResp);

//         let aiResult;
//         try {
//             aiResult = JSON.parse(aiResp.response.text());
//         } catch (error) {
//             console.error("Error parsing AI response:", error);
//             return NextResponse.json({ error: "Invalid AI response format" }, { status: 500 });
//         }

//         console.log("AI Result:", aiResult);

//         const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
//             courseId,
//             courseType,
//             createdBy,
//             topic,
//             courseLayout: aiResult,
//         }).returning("*");

//         console.log("Database Result:", dbResult);

//         return NextResponse.json({ result: dbResult[0] });
//     } catch (error) {
//         console.error("Server Error:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }
