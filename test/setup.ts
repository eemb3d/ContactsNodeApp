export default () => {
    process.env.LOG_LEVEL = 'info';
    process.env.HUMAN = 'true';
    process.env.TEST_KEY = 'test';
    process.env.CDN_HOST = 'test';
    process.env.REGION = 'test';
    process.env.DYNAMO_ENDPOINT = 'test';
    process.env.DYNAMO_TABLE_NAME = 'test';
    process.env.UNSANITISED_TEST_KEY = '   test      ';
};
