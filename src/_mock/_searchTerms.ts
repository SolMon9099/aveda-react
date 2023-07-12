import moment from "moment";
import _mock from "./_mock";
import { fullName } from "./name";
import { randomInArray, randomItemsInArray, randomNumberRange } from "./funcs";
import { futuredValues } from "./sentence";

const status = [
    { title: 'Activo', value: 'active', color: 'opening' },
    { title: 'Inactivo', value: 'inactive', color: 'error' },
]

const types = [
    'PF', 'PJ'
]

const CPFOrCNPJ = [
    '045.774.962-85',
    '325.900.748-01',
    '40.388.191/0001-25',
    '15.552.094/0001-89'
]

const coverages = [
    'RS, SC, PR',
    'Todos Estados',
    'RJ, SP'
]

const recipients = [
    'Flávia Vilaça',
    'Todos',
    'Júlio Vargas'
]

const lastUpdates = [
    '06/03/23 - 15:13',
    '09/03/23 - 16:51',
    '19/01/23 - 12:59',
    '05/03/23 - 19:09',
]


export const _searchTermList = [...Array(4)].map((_,idx) =>({
    _id: _mock.id(idx),
    type: randomInArray(types),
    name: randomInArray(fullName),
    CPFOrCNPJ: randomInArray(CPFOrCNPJ),
    coverage: randomInArray(coverages),
    recipient: randomInArray(recipients),
    lastUpdate: randomInArray(lastUpdates),
    status: randomItemsInArray(status, 1),
}))


