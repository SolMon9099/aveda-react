export type callType = {
    _id: string,
    title: string,
    client: string,
    processOrCase: string,
    status: string,
    answer: number,
    date: string,
    // responsible: {_id: string, name: string}[],
    tags: tags[],
    futuredValues: string,
    sub_name: string,
}

export type newCallType = {
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
    calls: processCall[],
    callLinkedActivities: processActivity[],
    callGrouped: any,
    movimentationsPendindgAll: number,
    movimentationsPendindgToday: number,
}

export type newCallTypeSchema = {
    _id: string,
    processOrCase: string,
    client: string,
    title: string,
    tags: tags[],
    type: string,
    message: string,
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

export type callSchema = {
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
    callLinked: boolean,
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

export type newCallImportType = {
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

export type processCall = {
    _id: string,
    type: string,
    description: string,
    date: string,
    hour: string,
    responsible: {_id: string, name: string}
}

export type processCallSchema = {
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
    calls: processCall[],
    callLinkedActivities: processActivity[],
    callGrouped: any
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
    calls: processCall[],
    callLinkedActivities: processActivity[],
    callGrouped: any
}