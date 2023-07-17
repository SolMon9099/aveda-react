export type contactListType = {
    _id: string,
    name: string,
    subName: string,
    classification: {
        title: string,
        color: string
    },
    status: {
        title: string,
        color: string
    },
    hasAtualization: boolean
}

export type newContactSchema = {
    _id: string,
    type: string,
    classification: string,
    name: string,
    office: string,
    companyName: string,
    companyFantasyName: string,
    birthDate: string,
    gender: string,
    observations: string,
    // --- DOCUMENTOS ---
        // Fisica
        documentsCPF: string,
        documentsRG: string,
        documentsCTPS: string,
        documentsPIS: string,
        documentsVoterRegistration: string,
        documentsCNH: string,
        documentsPassport: string,
        documentsReservistCertificate: string,
        // Juridica
        documentsCNPJ: string,
        documentsStateRegistration: string,
    // --- CONTATOS ---
    contactCellPhone: string,
    contactPhone: string,
    contactEmail: string,
    contactSite: string,
    // --- ENDEREÇO ---
    addressType: string,
    addressCEP: string,
    addressStreet: string,
    addressNumber: string,
    addressComplement: string,
    addressNeighborhood: string,
    addressCity: string,
    addressState: string,
    // --- COMPLEMENTO ---
        // Fisica
        nationality: string,
        nationalityCity: string,
        maritalStatus: string,
        motherName: string,
        fatherName: string,
    // --- DADOS BANCÁRIOS ---
    bank: string,
    agency: string,
    account: string,
    pixType: string,
    pixKey: string,
}