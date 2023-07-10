import moment from "moment";
import _mock from "./_mock";
import { fullName } from "./name";
import { randomInArray, randomItemsInArray, randomNumberRange } from "./funcs";
import { futuredValues } from "./sentence";

const status = [
    { title: 'Pendente', value: 'pending', color: 'warning' },
    { title: 'Revisada', value: 'revised', color: 'opening' },
    { title: 'Atividade', value: 'activity', color: 'primary' },
    { title: 'Descartada', value: 'discarded', color: 'error' },
    { title: 'Bloqueada', value: 'blocked', color: 'grey_300' },
]

const personalFolders = [
    'Previdência Privada',
    'Clientes INSS',
]

const actions = [
    'Contestação de Aposentadoria Indeferida',
    'Aposentadoria por Invalidez',
]

const venue = [
    '4a Vara do Trabalho Porto Alegre',
    '1a Vara do Trabalho Viamão',
]

export const _transactionList = [...Array(25)].map((_,idx) =>({
    _id: _mock.id(idx),
    date: new Date(),
    process: '8010041-55.2022.8.05.0113',
    processTitle: randomInArray(fullName),
    daily: 'TJRS',
    stickOrCounty: 'Caderno IV - 1a Instância / Comarca de Porto Alegre',
    search: 'Flávia Vilaça',
    // status: randomInArray(status),
    status: randomItemsInArray(status, randomNumberRange(1, 2)),
    futuredValues: randomInArray(futuredValues),
}))

export const _proceduralList = [...Array(25)].map((_,idx) =>({
    _id: _mock.id(idx),
    date: new Date(),
    title: randomInArray(fullName),
    process: '8010041-55.2022.8.05.0113',
    client: randomInArray(fullName),
    folder: randomInArray(personalFolders),
    action: randomInArray(actions),
    venue: randomInArray(venue),
    status: randomItemsInArray(status, randomNumberRange(1, 2)),
    futuredValues: randomInArray(futuredValues),
}))
