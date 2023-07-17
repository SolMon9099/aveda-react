import { states } from "src/utils/state";
import _mock from "./_mock";
import { randomInArray } from "./funcs";

export const _contactList = [...Array(10)].map((_, idx) => ({
    _id: _mock.id(idx),
    name: _mock.name.fullName(idx),
    subName: _mock.company(idx),
    classification: {
        title: 'Cliente',
        color: 'default'
    },
    status: {
        title: 'Ativo',
        color: 'success'
    },
    hasAtualization: _mock.boolean(idx)
}))

const type = [
    'physical',
    'legal'
]

const classification = [
    'client',
    'part',
    'lead'
]

const gender = [
    'male',
    'female'
]

const addressType = [
    'home',
    'work'
]

const nationality = [
    'brazil',
    'foreigner'
]

const maritalStatus = [
    'maried',
    'single'
]

export const _contactListFull = [...Array(10)].map((_, idx) => ({
    _id: _mock.id(idx),
    type: randomInArray(type),
    classification: randomInArray(classification),
    name: _mock.name.fullName(idx),
    office: _mock.role(idx),
    companyName: _mock.company(idx),
    companyFantasyName: _mock.company(idx),
    birthDate: new Date(),
    gender: randomInArray(gender),
    observations: 'Observação show de bola',
    documentsCPF: '999.999.999-99',
    documentsRG: '9999999999 SSP RS',
    documentsCTPS: '999.99999.99-9',
    documentsPIS: '999.99999.99-9',
    documentsVoterRegistration: "9999 9999 9999",
    documentsCNH: "9999999999",
    documentsPassport: "BR999999",
    documentsReservistCertificate: "999999999999",
    documentsCNPJ: '99.999.999/9999-99',
    documentsStateRegistration: '999999999999',
    contactCellPhone: "(99) 99999-9999",
    contactPhone: "(99) 9999-9999",
    contactEmail: "show@bola.com",
    contactSite: "www.showdebola.com.br",
    addressType: randomInArray(addressType),
    addressCEP: '99999-999',
    addressStreet: 'Rua',
    addressNumber: '999',
    addressComplement: 'Complemento',
    addressNeighborhood: 'Bairro',
    addressCity: 'Cidade',
    addressState: randomInArray(states),
    nationality: randomInArray(nationality),
    nationalityCity: 'Cidade / RS',
    maritalStatus: randomInArray(maritalStatus),
    motherName: 'Nome da mãe',
    fatherName: 'Nome do pai',
    bank: 'itau',
    agency: '999',
    account: '999999',
    pixType: 'cpf',
    pixKey: '999.999.999-99',
}))