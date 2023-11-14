import { atom } from 'recoil';

export const clubListState = atom({
    key: 'clubListState',
    default: [],
});

export const eventListState = atom({
    key: 'eventListState',
    default: [],
});