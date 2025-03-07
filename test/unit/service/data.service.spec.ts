jest.mock('../../../src/utils/logger');
jest.mock('@aws-sdk/lib-dynamodb');

// TODO: Improve Mock and fix implementation
const mockDynamoDbClientSend = jest.fn().mockImplementation(() => ({} as ScanCommandInput));
jest.mock('@aws-sdk/client-dynamodb', () => ({
    DynamoDBClient: jest.fn(() => ({ send: mockDynamoDbClientSend }))
}));

const mockDynamoDBDocumentClientFrom = jest.fn();
const mockedDeleteCommand = jest.fn();
const mockedGetCommand = jest.fn();
const mockedPutCommand = jest.fn();
const mockedScanCommand = jest.fn();
jest.mock('@aws-sdk/lib-dynamodb', () => ({
    DynamoDBDocumentClient: { from: mockDynamoDBDocumentClientFrom },
    DeleteCommand: mockedDeleteCommand,
    GetCommand: mockedGetCommand,
    PutCommand: mockedPutCommand,
    ScanCommand: mockedScanCommand
}));

import { describe, expect, jest, test, afterEach } from '@jest/globals';
import {
    ScanCommandInput
} from "@aws-sdk/lib-dynamodb";
import {
    getApplicationData,
    getApplicationDataByID,
    removeApplicationDataByID,
    setApplicationData
} from '../../../src/service/data.service';

import { log } from '../../../src/utils/logger';
import { MOCK_CONTACT, MOCK_ID, TABLE_NAME_MOCK } from '../../mock/data';

const mockLogErrorRequest = log.error as jest.Mock;

describe('Dynamo CRUD service unit test suites', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Test getApplicationData Service call', () => {
        test('should call ScanCommand method', async () => {
            await getApplicationData();

            expect(mockedScanCommand).toHaveBeenCalledTimes(1);
            expect(mockedScanCommand).toHaveBeenCalledWith(TABLE_NAME_MOCK);
        });
        test('should handle the reject and log error', async () => {
            mockDynamoDbClientSend.mockRejectedValueOnce({} as never);
            await getApplicationData();
            expect(mockLogErrorRequest).toHaveBeenCalledTimes(1);
        });
    });

    describe('Test setApplicationData Service call', () => {
        test('should call PutCommand method', async () => {
            await setApplicationData(MOCK_CONTACT);

            expect(mockedPutCommand).toHaveBeenCalledTimes(1);
            expect(mockedPutCommand).toHaveBeenCalledWith({
                ...TABLE_NAME_MOCK,
                Item: {
                    ...MOCK_CONTACT
                }
            });
        });
        test('should handle the reject and log error', async () => {
            mockDynamoDbClientSend.mockRejectedValueOnce({} as never);
            await setApplicationData(MOCK_CONTACT);
            expect(mockLogErrorRequest).toHaveBeenCalledTimes(1);
        });
    });

    describe('Test getApplicationDataByID Service call', () => {
        test('should call GetCommand method', async () => {
            await getApplicationDataByID(MOCK_ID);

            expect(mockedGetCommand).toHaveBeenCalledTimes(1);
            expect(mockedGetCommand).toHaveBeenCalledWith({...TABLE_NAME_MOCK, Key: { id: MOCK_ID }});
        });
        test('should handle the reject and log error', async () => {
            mockDynamoDbClientSend.mockRejectedValueOnce({} as never);
            await getApplicationDataByID(MOCK_ID);
            expect(mockLogErrorRequest).toHaveBeenCalledTimes(1);
        });
    });

    describe('Test removeApplicationDataByID Service call', () => {
        test('should call DeleteCommand method', async () => {
            await removeApplicationDataByID(MOCK_ID);

            expect(mockedDeleteCommand).toHaveBeenCalledTimes(1);
            expect(mockedDeleteCommand).toHaveBeenCalledWith({...TABLE_NAME_MOCK, Key: { id: MOCK_ID }});
        });
        test('should handle the reject and log error', async () => {
            mockDynamoDbClientSend.mockRejectedValueOnce({} as never);
            await removeApplicationDataByID(MOCK_ID);
            expect(mockLogErrorRequest).toHaveBeenCalledTimes(1);
        });
    });
});
