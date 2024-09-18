"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
app.post("/hooks/catch/:userId/:zapId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    yield client.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const run = yield client.zapRun.create({
            data: {
                ZapId: zapId, //ZapId: This is the ID of the Zap that is being executed. 
                //It links the ZapRun to a specific Zap configuration or workflow.
                metadata: body // This field stores additional data related to the Zap run, 
                //which is passed in the request body (body). This data could include information from the webhook that triggered the Zap, such as payload details or any relevant context.
            }
        });
        //Purpose: This line of code creates a new entry in the zapRun table of your database. 
        //This record represents a specific instance of a Zap being triggered.
        yield client.zapRunOutbOx.create({
            data: {
                zapRunId: run.id
            }
        });
        res.json({
            message: "webhook recived"
        });
    }));
}));
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
