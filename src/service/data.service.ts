import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    DeleteCommand,
    GetCommand,
    PutCommand,
    ScanCommand
} from "@aws-sdk/lib-dynamodb";

import * as config from '../config';
import { log } from '../utils/logger';
import { Contact } from 'model/contact.model';

const client = new DynamoDBClient({
    region: config.REGION,
    endpoint: config.DYNAMO_ENDPOINT
});
const docClient = DynamoDBDocumentClient.from(client);

export const getApplicationData = async () => {
    try {
        const command = new ScanCommand({ TableName: config.DYNAMO_TABLE_NAME });
        const response: any = await docClient.send(command);

        log.info(`Get All from ${config.DYNAMO_TABLE_NAME} table`);
        // log.info(`Response ${JSON.stringify(response.Items)}`);
        return response.Items;
    } catch (error) {
        log.error(JSON.stringify(error));
    }
};

export const setApplicationData = async (contact: any, id: string = "") => {
    try {
        log.info(`Submission ${id} successfully stored in ${config.DYNAMO_TABLE_NAME} table`);

        const params = {
            TableName: config.DYNAMO_TABLE_NAME,
            Item: {
                id, // override by contact if present
                ...contact
            }
        };

        const command = new PutCommand(params);
        const response = await docClient.send(command);

        log.info(`Document submitted/updated ${id} successfully in ${config.DYNAMO_TABLE_NAME} table`);
        // log.info(`Response ${JSON.stringify(response)}`);
    } catch (error) {
        log.error(JSON.stringify(error));
    }
};

export const getApplicationDataByID = async (id: string) => {
    try {
        const params = {
            TableName: config.DYNAMO_TABLE_NAME,
            Key: { id }
        };

        const command = new GetCommand(params);

        const response = await docClient.send(command);
        log.info(`Get ${id} from ${config.DYNAMO_TABLE_NAME} table`);
        // log.info(`Response ${JSON.stringify(response)}`);
        return response.Item;
    } catch (error) {
        log.error(JSON.stringify(error));
    }
};

export const removeApplicationDataByID = async (id: string) => {
    try {
        const params = {
            TableName: config.DYNAMO_TABLE_NAME,
            Key: { id }
        };

        const command = new DeleteCommand(params);
        const response = await docClient.send(command);

        log.info(`Deleted document ID ${id} successfully from ${config.DYNAMO_TABLE_NAME} table`);
        // log.info(`Response ${JSON.stringify(response)}`);
    } catch (error) {
        log.error(JSON.stringify(error));
    }
};