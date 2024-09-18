import {PrismaClient} from "@prisma/client"
import { Kafka } from "kafkajs";//import library of kafka queue
const client=new PrismaClient();
const TOPIC_NAME="quickstart-events"//TOPIC_NAME: Defines the Kafka topic name to which messages will be sent.


const kafka=new Kafka({//kafka: Creates an instance of Kafka with configuration:
                       // clientId: Identifies the Kafka client.
                       // brokers: Specifies the Kafka brokers to connect to (localhost:9092 in this case).
    clientId: 'outbox-processor',
    brokers:['localhost:9092']
})
async function main(){

    const producer=kafka.producer();//maked instance of kafka
    await producer.connect();
    while(1){
        const pendingRows=await client.zapRunOutbOx.findMany({
            where:{},
            take:10
        })
        // It fetches the latest entries but can be customized based on specific criteria.
        //iska matlab jo bhi req zapier kai database mai hit hogi yeah store krlega uss info ko
        producer.send({
            topic:TOPIC_NAME,
            messages:pendingRows.map(r=>({
                value:r.zapRunId
            }))
        })
        //then the pending information will send to the kafa queue by this producer

        await client.zapRunOutbOx.deleteMany({
            where:{
                id:{
                    in:pendingRows.map(x=>x.id)
                }
            }
        })
    }
}
main();






//Receiving Data: When a request comes into your Zapier application, 
//it might involve creating or updating records in your database. 
//For example, a Zap could trigger an action that stores information in the zapRunOutbOx table.


// Storing Data in the Database: The data from the request is saved in your database. 
//This could be an event, a record, or some other type of information relevant to your Zapier workflow.


// Processing and Forwarding to Kafka:

// The code you provided is a background process (or service) that continually monitors the zapRunOutbOx table for new or pending records.
// It uses Prisma to query the database and retrieve up to 10 records at a time.
// The zapRunId values from these records are then sent as messages to a Kafka topic (zap-events).
// Kafka Integration:

// By sending the data to Kafka, you can achieve several things:
// Event Streaming: The data can be streamed to other systems or services that consume Kafka topics.


// Decoupling: It decouples the process of receiving data from the process of further handling or processing it. 
//Other services or consumers can independently read from the Kafka topic and act on the data.


// Real-time Processing: Kafka allows for real-time processing of events, 
//making it suitable for use cases like real-time analytics, notifications, or triggering other workflows.