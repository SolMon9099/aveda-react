import moment from "moment";
import _mock from "./_mock";
import { randomInArray } from "./funcs";
import { futuredValues } from "./sentence";

const titles = [
    'Ação previdenciária',
    'Ação previdenciária - análise',
    'Indenização Trabalhista'
]

const status = [
    'Em Andamento',
    'Encerrado'
]

export const _serviceList = [...Array(25)].map((_,idx) =>({
    _id: _mock.id(idx),
    title: titles[idx % 3],
    client: _mock.name.fullName(idx % 20),
    sub_name: idx%2 === 0 ? 'Fabrício Duarte' : 'Janete Freitas',
    processOrCase: `20201125-0000547`,
    status: randomInArray(status),
    answer: _mock.number.count(idx % 20),
    date: new Date(),
    // responsible: [{value: '1', label: 'Flávia Vilaça'}, {value: '2', label: 'Júlio Vargas'}],
    tags: idx%3 === 0 ? 
        [
            {
                _id: _mock.id(idx),
                title: 'Pendente',
                color: 'waiting'
            },
            {
                _id: _mock.id(idx),
                title: `Prioritário`,
                color: 'default'
            }
        ] : (idx%3 === 1 ? 
            [
                {
                    _id: _mock.id(idx),
                    title: `Prioritário`,
                    color: 'default'
                }
            ]: 
            [
                {
                    _id: _mock.id(idx),
                    title: 'Fase Inicial',
                    color: 'analysing'
                }, 
            ]
        ),
    
    // visibility: idx%2 === 0 ? 'public' : 'private'
    futuredValues: randomInArray(futuredValues),
}))
