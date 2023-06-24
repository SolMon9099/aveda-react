// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  feed: getIcon('ic_feed'),
  topic: getIcon('ic_topic'),
  posts: getIcon('ic_posts'),
  saves: getIcon('ic_saves'),
  safari: getIcon('ic_safari'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'Feed', path: '/forum/feed', icon: ICONS.feed },
      { title: 'Tópicos', path: '/forum/topicos', icon: ICONS.topic },
      { title: 'Meus Posts', path: '/forum/meus-posts', icon: ICONS.posts, needAuth: true },
      { title: 'Salvos', path: '/forum/salvos', icon: ICONS.saves, needAuth: true },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Comunidades',
    items: [
      { title: 'Descobrir', path: '/forum/descobrir', icon: ICONS.safari },
    ],
  },
];

export default navConfig;
