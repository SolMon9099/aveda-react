// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_FORUM = '/forum';
const ROOTS_ERP = '/erp';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_FORUM = {
  root: '/forum',
  feed: path(ROOTS_FORUM, '/feed'),
  post: path(ROOTS_FORUM, '/post/'),
  live: path(ROOTS_FORUM, '/live/'),
  topicos: path(ROOTS_FORUM, '/topicos'),
  topico: path(ROOTS_FORUM, '/topico/'),
  meusPosts: path(ROOTS_FORUM, '/meus-posts'),
  salvos: path(ROOTS_FORUM, '/salvos'),
  descobrir: path(ROOTS_FORUM, '/descobrir'),
  comunidade: path(ROOTS_FORUM, '/comunidade/'),
  novoPost: path(ROOTS_FORUM, '/novo-post'),
};

export const PATH_ERP = {
  root: '/erp',
  people: path(ROOTS_ERP, '/pessoas'),
  scheduler: path(ROOTS_ERP, '/calendario'),
  tasks: path(ROOTS_ERP, '/tarefas'),
  process: path(ROOTS_ERP, '/processos'),
  case: path(ROOTS_ERP, '/caso'),
  handleCase: path(ROOTS_ERP, '/caso/manual'),
  handleProcess: path(ROOTS_ERP, '/processos/manual'),
  importProcess: path(ROOTS_ERP, '/processos/importar'),
  importListProcess: path(ROOTS_ERP, '/processos/lista-importacao'),
  processDocument: path(ROOTS_ERP, '/processos/documento'),
  caseDocument: path(ROOTS_ERP, '/caso/documento'),
  processMovimentation: path(ROOTS_ERP, '/processos/movimentacao'),
  finance: path(ROOTS_ERP, '/financeiro'),
  calls: path(ROOTS_ERP, '/atendimentos'),
  callHandle: path(ROOTS_ERP, '/atendimentos/manual'),
  HandleCallProcess: path(ROOTS_ERP, '/processos/atendimento/manual'),
  documents: path(ROOTS_ERP, '/documentos'),
  movimentatiosn: path(ROOTS_ERP, '/movimentacoes'),
  handleMoviSearch: path(ROOTS_ERP, '/movimentacoes/search/manual'),
  moviSearchTerms: path(ROOTS_ERP, '/movimentacoes/search/terms'),
};