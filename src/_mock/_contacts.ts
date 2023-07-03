import moment from "moment";
import _mock from "./_mock";

export const _contactList = [...Array(2)].map((_, idx) => ({
    _id: _mock.id(idx),
    type: 'contact',
    title: `Nome Teste X Nome Teste`,
    number: `2023-1239${idx}`,
    clientName: 'Nome Teste',
    folder: 'Nome da Pasta',
    action: 'Ação Teste',
    foro: 'Foro Teste',
    lastChange: new Date(),
    tags: [...Array(2)].map((_, idx) =>({
        _id: _mock.id(idx),
        title: `Teste ${idx+1}`,
        color: idx%2 === 0 ? 'error' : 'success'
    })),
    hasAtualization: _mock.boolean(idx)
}))

export const _processCompleteList = [...Array(20)].map((_, idx) =>({
    _id: _mock.id(idx),
    imported: _mock.boolean(idx),
    clientName: 'Nome Teste',
    clientQualify: 'reu',
    counterName: 'Nome Teste',
    counterQualify: 'autor',
    title: `Nome Teste X Nome Teste`,
    folder: 'Pasta',
    number: `2023-1239${idx}`,
    part: {
        value: '1',
        label: 'Orgão 1'
    },
    action: {
        value: '1',
        label: 'Ação 1'
    },
    matter: {
        value: '1',
        label: 'Matéria 1'
    },
    county: {
        value: '1',
        label: 'Comarca 1'
    },
    instance: {
        value: '1',
        label: 'Instância 1'
    },
    phase: {
        value: '1',
        label: 'Fase 1'
    },
    url: 'https://www.tjrs.jus.br/novo/busca/processos/394400532/processo-n-002XXX8',
    causeValue: _mock.number.price(idx),
    object: _mock.text.sentence(idx),
    strategy: _mock.text.sentence(idx),
    observations: _mock.text.sentence(idx),
    responsible: {
        value: '1',
        label: 'Responsável 1'
    },
    status: {
        value: '1',
        label: 'Status 1'
    },
    endDate: new Date(),
    endType: {
        value: '1',
        label: 'Tipo 1'
    },
    endValue: _mock.number.price(idx),
    endObject: _mock.text.sentence(idx),
    endObservations: _mock.text.sentence(idx),
    tags: [...Array(2)].map((_, idx) =>({
        _id: _mock.id(idx),
        title: `Teste ${idx+1}`,
        color: idx%2 === 0 ? 'error' : 'success'
    })),
    activities: [...Array(10)].map((_,idx2) =>({
        _id: _mock.id(idx2),
        name: `Atividade ${idx2}`,
        description: `Descricao ${idx2}`,
        processOrCase: `2023-1239${idx}`,
        type: idx2%2 === 0 ? 'event' : 'task',
        status: idx2%3 === 0 ? 'toDo' : idx2%2 === 0 ? 'onDoing' : 'finished',
        date: new Date(),
        hour: idx2%2 === 0 ? moment().format('HH:mm') : null,
        responsible: [{value: '1', label: 'Responsavel 1'}, {value: '2', label: 'Responsavel 2'}],
        tags: [...Array(2)].map((_, idx) =>({
            _id: _mock.id(idx),
            title: `Teste ${idx+1}`,
            color: idx%2 === 0 ? 'error' : 'success'
        })),
        visibility: idx2%2 === 0 ? 'public' : 'private'
    })),
    documents: [...Array(10)].map((_,idx) =>({
        _id: _mock.id(idx),
        name: `Documento ${idx}`,
        description: `Descricao do documento ${idx}`,
        createdAt: new Date(),
        category: {
            value: '1',
            label: 'Categoria 1'
        },
        url: 'https://www.tjrs.jus.br/novo/busca/processos/394400532/processo-n-002XXX8',
        from:{
            type: idx%2 === 0 ? 'process' : 'responsible',
            responsible: {
                _id: _mock.id(idx),
                name: 'Nome Teste'
            }
        }
    })),
    services: [...Array(10)].map((_,idx) =>({
        _id: _mock.id(idx),
        type: idx%3 === 0 ? idx%2 === 0 ? 'email' : 'calling' : 'service',
        description: _mock.text.description(idx),
        date: new Date(),
        hour: idx%2 === 0 ? moment().format('HH:mm') : null,
        responsible: {_id: _mock.id(1), name: 'Responsavel'}
    })),
    serviceLinkedActivities: [...Array(2)].map((_,idx) =>({
        _id: _mock.id(idx),
        name: `Atividade ${idx}`,
        date: new Date(),
        hour: idx%2 === 0 ? moment().format('HH:mm') : null,
        type: idx%2 === 0 ? 'event' : 'task',
        tags: [...Array(2)].map((_, idx) =>({
            _id: _mock.id(idx),
            title: `Teste ${idx+1}`,
            color: idx%2 === 0 ? 'error' : 'success'
        })),
    })),
    movimentations: [...Array(10)].map((_,idx) =>({
        _id: _mock.id(idx),
        type: idx%3 === 0 ? 'movimentation' : idx%2 === 0 ? 'document' : 'publication',
        description: _mock.text.description(idx),
        date: new Date(),
        status: idx%3 === 0 ? 'discarded' : idx%2 === 0 ? 'pending' : 'reviewed',
        documents: [...Array(5)].map((_,idx) =>({
            _id: _mock.id(idx),
            name: _mock.name.firstName(idx),
            url: 'https://www.tjrs.jus.br/novo/busca/processos/394400532/processo-n-002XXX8',
        })),
        tags: [...Array(1)].map((_, idx) =>({
            _id: _mock.id(idx),
            title: `Teste ${idx+1}`,
            color: 'info'
        })),
    })),
    movimentationLinkedActivities: [...Array(4)].map((_,idx) =>({
        _id: _mock.id(idx),
        name: `Atividade ${idx}`,
        date: new Date(),
        hour: idx%2 === 0 ? moment().format('HH:mm') : null,
        type: idx%2 === 0 ? 'event' : 'task',
        tags: [...Array(2)].map((_, idx) =>({
            _id: _mock.id(idx),
            title: `Teste ${idx+1}`,
            color: idx%2 === 0 ? 'error' : 'success'
        })),
    })),
}))

export const _findedUser = {
    name: 'Nome Teste',
    oabNumber: '123.456',
    sectional: 'RS',
    type: 'Advogado',
    tribunal: {
        value: '1',
        label: 'Tribunal 1'
    },
    county: {
        value: '1',
        label: 'Comarca 1'
    },
    situation: {
        value: '1',
        label: 'Situação 1'
    },
}

export const _processImportList = [...Array(20)].map((_, idx) =>({
    _id: _mock.id(idx),
    tribunal: 'Tribunal de Justiça do Estado do Rio Grande do Sul',
    county: 'Porto Alegre',
    lawyerName: 'Nome Teste',
    oabNumber: '128.642',
    sectional: 'RS',
    searchDate: new Date(),
    processTotal: idx%2 === 0 ? '23' : '0',
    status: idx%2 === 0 ? 'concluded' : 'searching'
}))

export const _processImportListDetail = [...Array(20)].map((_, idx) =>({
    _id: _mock.id(idx),
    tribunal: 'Tribunal de Justiça do Estado do Rio Grande do Sul',
    county: 'Porto Alegre',
    lawyerName: 'Nome Teste',
    oabNumber: '128.642',
    sectional: 'RS',
    searchDate: new Date(),
    processList: [...Array(4)].map((_, idx) =>({
        _id: _mock.id(idx),
        processNumber: `2023-1239${idx}`,
        clientName: 'Nome do Cliente',
        counterName: 'Nome da Parte',
        matter: 'Cível',
        action: 'Despejo'
    }))
}))

export const _caseList = [...Array(2)].map((_, idx) =>({
    _id: _mock.id(idx+20),
    type: 'case',
    title: `Nome Teste`,
    number: `CA0023${idx}`,
    clientName: 'Nome Teste',
    folder: 'Nome da Pasta',
    lastChange: new Date(),
    tags: [...Array(2)].map((_, idx) =>({
        _id: _mock.id(idx),
        title: `Teste ${idx+1}`,
        color: idx%2 === 0 ? 'error' : 'success'
    })),
    hasAtualization: _mock.boolean(idx),
}))

export const _caseCompleteList = [...Array(20)].map((_, idx) =>({
    _id: _mock.id(idx+20),
    clientName: 'Nome Teste',
    title: `Nome Teste`,
    folder: 'Nome da Pasta',
    number: `CA0023${idx}`,
    observations: _mock.text.sentence(idx),
    responsible: {
        value: '1',
        label: 'Responsável 1'
    },
    matter: {
        value: '1',
        label: 'Matéria 1'
    },
    tags: [...Array(2)].map((_, idx) =>({
        _id: _mock.id(idx),
        title: `Teste ${idx+1}`,
        color: idx%2 === 0 ? 'error' : 'success'
    })),
    activities: [...Array(10)].map((_,idx2) =>({
        _id: _mock.id(idx2),
        name: `Atividade ${idx2}`,
        description: `Descricao ${idx2}`,
        processOrCase: `CA0023${idx}`,
        type: idx2%2 === 0 ? 'event' : 'task',
        status: idx2%3 === 0 ? 'toDo' : idx2%2 === 0 ? 'onDoing' : 'finished',
        date: new Date(),
        hour: idx2%2 === 0 ? moment().format('HH:mm') : null,
        responsible: [{value: '1', label: 'Responsavel 1'}, {value: '2', label: 'Responsavel 2'}],
        tags: [...Array(2)].map((_, idx) =>({
            _id: _mock.id(idx),
            title: `Teste ${idx+1}`,
            color: idx%2 === 0 ? 'error' : 'success'
        })),
        visibility: idx2%2 === 0 ? 'public' : 'private'
    })),
    documents: [...Array(10)].map((_,idx) =>({
        _id: _mock.id(idx),
        name: `Documento ${idx}`,
        description: `Descricao ${idx}`,
        createdAt: new Date(),
        category: {
            value: '1',
            label: 'Categoria 1'
        },
        url: 'https://www.tjrs.jus.br/novo/busca/processos/394400532/processo-n-002XXX8',
        from:{
            type: idx%2 === 0 ? 'process' : 'responsible',
            responsible: {
                _id: _mock.id(idx),
                name: `Responsavel ${idx}`
            }
        }
    })),
    services: [...Array(10)].map((_,idx) =>({
        _id: _mock.id(idx),
        type: idx%3 === 0 ? idx%2 === 0 ? 'email' : 'calling' : 'service',
        description: _mock.text.description(idx),
        date: new Date(),
        hour: idx%2 === 0 ? moment().format('HH:mm') : null,
        responsible: {_id: _mock.id(1), name: 'Responsavel'}
    })),
    serviceLinkedActivities: [...Array(2)].map((_,idx) =>({
        _id: _mock.id(idx),
        name: `Atividade ${idx}`,
        date: new Date(),
        hour: idx%2 === 0 ? moment().format('HH:mm') : null,
        type: idx%2 === 0 ? 'event' : 'task',
        tags: [...Array(2)].map((_, idx) =>({
            _id: _mock.id(idx),
            title: `Teste ${idx+1}`,
            color: idx%2 === 0 ? 'error' : 'success'
        })),
    })),
}))