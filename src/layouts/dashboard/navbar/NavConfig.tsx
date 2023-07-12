// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  //Forum
  feed: getIcon('ic_feed'),
  topic: getIcon('ic_topic'),
  posts: getIcon('ic_posts'),
  saves: getIcon('ic_saves'),
  safari: getIcon('ic_safari'),
  //ERP
  people: getIcon('ic_people'),
  scheduler: getIcon('ic_scheduler'),
  tasks: getIcon('ic_tasks'),
  process: getIcon('ic_process'),
  finance: getIcon('ic_finance'),
  calls: getIcon('ic_calls'),
  documents: getIcon('ic_documents'),
  movimentations: getIcon('ic_movimentations'),
};

export const navConfigForum = [
  {
    items: [
      { title: 'Feed', path: '/forum/feed', icon: ICONS.feed },
      { title: 'Tópicos', path: '/forum/topicos', icon: ICONS.topic },
      { title: 'Meus Posts', path: '/forum/meus-posts', icon: ICONS.posts, needAuth: true },
      { title: 'Salvos', path: '/forum/salvos', icon: ICONS.saves, needAuth: true },
    ],
  },

  {
    subheader: 'Comunidades',
    items: [
      { title: 'Descobrir', path: '/forum/descobrir', icon: ICONS.safari },
    ],
  },
];

export const navConfigERP = [
  {
    items: [
      { title: 'Contatos', path: '/erp/pessoas', icon: ICONS.people },
      { title: 'Calendário', path: '/erp/calendario', icon: ICONS.scheduler },
      { title: 'Atividades', path: '/erp/tarefas', icon: ICONS.tasks },
      { title: 'Atendimentos', path: '/erp/atendimentos', icon: ICONS.calls },
      { title: 'Processos e Casos', path: '/erp/processos', activeOn: '/erp/caso', icon: ICONS.process },
      { title: 'Movimentações', path: '/erp/movimentacoes', icon: ICONS.movimentations },
      { title: 'Documentos', path: '/erp/documentos', icon: ICONS.documents },
      { title: 'Financeiro', path: '/erp/financeiro', icon: ICONS.finance },
    ],
  },
];
