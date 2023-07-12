import moment from "moment";
import _mock from "./_mock";

export const _calendarList = [...Array(10)].map((_,idx) =>({
    _id: _mock.id(idx),
    name: `Atividade ${idx}`,
    description: idx%2 === 0 ? 'Somente última versão do contrato' : 'Ligar antes para Dra. Lívia e confirmar...',
    sub_name: idx%2 === 0 ? 'Fabrício Duarte' : 'Janete Freitas',
    processOrCase: `CA0023${idx}`,
    type: 'event',
    status: idx%3 === 0 ? 'toDo' : idx%2 === 0 ? 'onDoing' : 'Done',
    date: moment().add(idx, 'day').format(),
    hour: idx%2 === 0 ? moment().add(idx, 'hour').format('HH:mm') : null,
    responsible: [{value: '1', label: 'Flávia Vilaça'}, {value: '2', label: 'Júlio Vargas'}],
    tags: idx%3 === 0 ? 
        [
            {
                _id: _mock.id(idx),
                title: 'Urgente',
                color: 'error'
            },
            {
                _id: _mock.id(idx),
                title: `Prioritário`,
                color: 'success'
            }
        ] : (idx%3 === 1 ? 
            [
                {
                    _id: _mock.id(idx),
                    title: 'Análise',
                    color: 'primary'
                }
            ]: 
            [
                {
                    _id: _mock.id(idx),
                    title: 'Urgente',
                    color: 'error'
                }, 
                {
                    _id: _mock.id(idx),
                    title: 'Análise',
                    color: 'primary'
                }
            ]
        ),
    
    visibility: idx%2 === 0 ? 'public' : 'private'
}))
