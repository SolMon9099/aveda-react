export type taskType = {
    _id: string,
    name: string,
    description: string,
    processOrCase: string,
    type: string,
    status: string,
    date: string,
    hour: string,
    responsible: {_id: string, name: string}[],
    tags: tags[],
    visibility: string,
}

export type newProcessType = {
    _id: string,
    imported: boolean,
    clientName: string,
    clientQualify: string,
    counterName: string,
    counterQualify: string,
    title: string,
    folder: string,
    tags: tags[]
    number: string,
    part: {value: string, label: string},
    action: {value: string, label: string},
    matter: {value: string, label: string},
    county: {value: string, label: string},
    instance: {value: string, label: string},
    phase: {value: string, label: string},
    url: string,
    causeValue: number,
    object: string,
    strategy: string,
    observations: string,
    responsible: {value: string, label: string},
    status: {value: string, label: string},
    endDate: string,
    endType: {value: string, label: string},
    endValue: number,
    endObject: string,
    endObservations: string,
    activities: processActivity[],
    documents: processDocument[],
    movimentations: processMovimenation[],
    movimentationLinkedActivities: processActivity[],
    movimentationGrouped: any,
    services: processService[],
    serviceLinkedActivities: processActivity[],
    serviceGrouped: any,
    movimentationsPendindgAll: number,
    movimentationsPendindgToday: number,
}

export type newProcessTypeSchema = {
    _id: string,
    imported: boolean,
    type: string,
    clientName: string,
    clientQualify: string,
    counterName: string,
    counterQualify: string,
    title: string,
    folder: string,
    tags: tags[]
    number: string,
    part: string,
    action: string,
    matter: string,
    county: string,
    instance: string,
    phase: string,
    url: string,
    causeValue: number,
    object: string,
    strategy: string,
    observations: string,
    responsible: string,
    status: string,
    endDate: string,
    endType: string,
    endValue: number,
    endObject: string,
    endObservations: string,
    activities: processActivity[],
    documents: processDocument[],
    movimentations: processMovimenation[],
    movimentationLinkedActivities: processActivity[],
    movimentationGrouped: any,
    services: processService[],
    serviceLinkedActivities: processActivity[],
    serviceGrouped: any,
    movimentationsPendindgAll: number,
    movimentationsPendindgToday: number,
}

export type processActivity = {
    _id: string,
    name: string,
    description: string,
    processOrCase: string,
    type: string,
    status: string,
    date: string,
    hour: string,
    responsible: {_id: string, name: string}[],
    tags: tags[],
    visibility: string,
}

export type taskSchema = {
    _id: string,
    name: string,
    description: string,
    processOrCase: string,
    type: string,
    status: string,
    date: string,
    hour: string,
    responsible: string[],
    tags: string[],
    visibility: string,
    serviceLinked: boolean,
    movimentationLinked: boolean,
    process: string
}

export type processDocument = {
    _id: string,
    name: string,
    description: string,
    createdAt: string,
    category: {
        value: string,
        label: string
    },
    url: string,
}

export type processDocumentSchema = {
    _id: string,
    name: string,
    process: string,
    description: string,
    createdAt: string,
    category: string,
    url: string,
}

export type processMovimenation = {
    _id: string,
    type: string,
    date: string,
    documents: processDocument[],
    description: string,
    status: string,
    tags: tags[],
}

export type tags = {
    label: string, 
    value: string, 
    color: string, 
    title: string
}

export type newProcessImportType = {
    oabNumber: string,
    sectional: string,
    tribunal: string,
    county: string,
    situation: string,
}

export type findedUserType = {
    name: string,
    oabNumber: string,
    sectional: string,
    type: string,
    tribunal: {value: string, label: string},
    county: {value: string, label: string},
    situation: {value: string, label: string}
}

export type processImportListType = {
    _id: string,
    tribunal: string,
    county: string,
    lawyerName: string,
    oabNumber: string,
    sectional: string,
    lawyerDesc: string,
    searchDate: string,
    processTotal: string,
    status: string
}

export type processImportListDetailType = {
    _id: string,
    tribunal: string,
    county: string,
    lawyerName: string,
    oabNumber: string,
    sectional: string,
    lawyerDesc: string,
    searchDate: string,
    processTotal: string,
    status: string,
    processList:{
        processNumber: string,
        clientName: string,
        counterName: string,
        matter: string,
        action: string
    }[]
}

export type processService = {
    _id: string,
    type: string,
    description: string,
    date: string,
    hour: string,
    responsible: {_id: string, name: string}
}

export type processServiceSchema = {
    _id: string,
    type: string,
    description: string,
    date: string,
    hour: string,
    responsible: string,
    process: string
}

export type newCaseType = {
    _id: string,
    clientName: string,
    title: string,
    folder: string,
    number: string,
    tags: tags[],
    matter: {value: string, label: string},
    observations: string,
    responsible: {value: string, label: string},
    activities: processActivity[],
    documents: processDocument[],
    services: processService[],
    serviceLinkedActivities: processActivity[],
    serviceGrouped: any
}

export type newCaseTypeSchema = {
    _id: string,
    type: string,
    clientName: string,
    title: string,
    folder: string,
    number: string,
    tags: tags[],
    matter: string,
    observations: string,
    responsible: string,
    activities: processActivity[],
    documents: processDocument[],
    services: processService[],
    serviceLinkedActivities: processActivity[],
    serviceGrouped: any
}