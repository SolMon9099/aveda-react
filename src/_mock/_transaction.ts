import moment from "moment";
import _mock from "./_mock";
import { fullName } from "./name";
import { randomInArray } from "./funcs";
import { futuredValues } from "./sentence";

const status = [
    { title: 'Pendente', value: 'pending', color: 'warning' },
    { title: 'Revisada', value: 'revised', color: 'opening' },
    { title: 'Atividade', value: 'activity', color: 'primary' },
    { title: 'Descartada', value: 'discarded', color: 'error' },
    { title: 'Bloqueada', value: 'blocked', color: 'grey_300' },
]

export const _transactionList = [...Array(25)].map((_,idx) =>({
    _id: _mock.id(idx),
    date: new Date(),
    process: '8010041-55.2022.8.05.0113',
    processTitle: randomInArray(fullName),
    daily: 'TJRS',
    stickOrCounty: 'Caderno IV - 1a Instância / Comarca de Porto Alegre',
    search: 'Flávia Vilaça',
    status: randomInArray(status),
    futuredValues: randomInArray(futuredValues),
}))
