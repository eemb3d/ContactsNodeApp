import { describe, expect, test } from '@jest/globals';

import {
    getApplicationData,
    getApplicationDataByID,
    removeApplicationDataByID,
    setApplicationDataByID,
    setApplicationDataKey
} from '../../../src/service/data.service';
import { MOCK_CONTACT } from '../../mock/data';

describe('Service Data', () => {

    test('should test getApplicationData', () => {
        expect(getApplicationData()).toEqual([]);
    })

    test('should test setApplicationDataKey', () => {
        setApplicationDataKey(MOCK_CONTACT);
        expect(getApplicationData()).toEqual([ MOCK_CONTACT ]);
    })

    test('should test getApplicationDataByID', () => {
        expect(getApplicationDataByID("0")).toEqual(MOCK_CONTACT);
    })

    test('should test getApplicationDataByID when Id blank', () => {
        expect(getApplicationDataByID("")).toEqual({});
    })

    test('should test setApplicationDataByID', () => {
        setApplicationDataByID({...MOCK_CONTACT, id: 987}, "0")
        expect(getApplicationDataByID("0")).toEqual({...MOCK_CONTACT, id: 987});
    })

    test('should test removeApplicationDataByID', () => {
        removeApplicationDataByID("0")
        expect(getApplicationDataByID("0")).toEqual({});
        expect(getApplicationData()).toEqual([]);
    })
});
