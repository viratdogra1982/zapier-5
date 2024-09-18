import express from 'express';
const app=express();
app.use(express.json());
import {PrismaClient} from "@prisma/client"
const client=new PrismaClient();

app.post("/hooks/catch/:userId/:zapId",async(req,res)=>{
    const userId=req.params.userId;
    const zapId=req.params.zapId;
    const body=req.body;

    await client.$transaction(async tx =>{
        const run=await client.zapRun.create({
            data:{
                ZapId:zapId,//ZapId: This is the ID of the Zap that is being executed. 
                           //It links the ZapRun to a specific Zap configuration or workflow.
                metadata:body// This field stores additional data related to the Zap run, 
                            //which is passed in the request body (body). This data could include information from the webhook that triggered the Zap, such as payload details or any relevant context.
            }
        });
        //Purpose: This line of code creates a new entry in the zapRun table of your database. 
        //This record represents a specific instance of a Zap being triggered.

        await client.zapRunOutbOx.create({
            data:{
                zapRunId:run.id
            }
        })

    res.json({
        message:"webhook recived"
    })
    })
})


app.listen(3008);








//Zap: This is an automated workflow that connects two or more apps. 
//It consists of a Trigger and one or more Actions. When a specific event (Trigger) occurs in one app, 
//it initiates a series of actions in other apps.

// Trigger: A Trigger is an event that starts a Zap.
// For example, if you want a Zap to start when a new email arrives in Gmail, the email arrival is the Trigger. 
//Triggers are essentially the starting points of a Zap.

// Action: An Action is an event that happens as a result of the Trigger. 
//It’s what the Zap does after the Trigger event occurs. 
//For example, if the Trigger is a new email, the Action could be creating a new task in a project management tool like Trello.