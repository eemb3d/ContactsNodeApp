import { Contact } from "../model/contact.model";

const CONTACT_DATA = [] as any;

export const getApplicationData = (): Contact[] => {
    return CONTACT_DATA;
};

export const setApplicationDataKey = (data: Contact): void => {
    CONTACT_DATA.push(data);
};


export const getApplicationDataByID = (id: string = ""): Contact => {
    return CONTACT_DATA[id] || {};
};

export const setApplicationDataByID = (data: any, id: string = ""): void => {
    if (id) {
        CONTACT_DATA[id] = { ...data };
    }
};

export const removeApplicationDataByID = (id: string = ""): void => {
    if (id) {
        CONTACT_DATA.splice(id, 1);
    }
};
