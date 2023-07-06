import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LiveLayout from '../layouts/live';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import AuthGuard from 'src/guards/AuthGuard';
import ResetLayout from 'src/layouts/reset'
import AdevaLoading from 'src/components/AdevaLoading';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <Suspense fallback={<AdevaLoading/>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/forum" replace />,
    },
    {
      path: '/forum',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/forum/feed" replace />, index: true },
        { path: 'feed', element: <Feed/> },
        { path: 'post/:postId', element: <Post/> },
        { path: 'topicos', element: <Topics/> },
        { path: 'topico/:topicId', element: <Topic/> },
        { path: 'meus-posts', element: <AuthGuard><MyPosts/></AuthGuard> },
        { path: 'salvos', element: <AuthGuard><Saved/></AuthGuard> },
        { path: 'descobrir', element: <Discover/> },
        { path: 'novo-post', element: <AuthGuard><NewPost/></AuthGuard> },
        { path: 'comunidade/:communityId', element: <AuthGuard><Community/></AuthGuard> },
      ],
    },
    {
      path: '/forum',
      element: <AuthGuard><LiveLayout /></AuthGuard>,
      children: [
        { path: 'live/:postId', element: <LivePost/> },
      ]
    },
    {
      path: '/erp',
      element: <AuthGuard><DashboardLayout /></AuthGuard>,
      children: [
        { element: <Navigate to="/erp/processos" replace />, index: true },
        { path: 'pessoas', element: <Contacts/> },
        { path: 'pessoas/:contactId', element: <ContactDetail/> },
        { path: 'agendas', element: <WIP/> },
        { path: 'tarefas', element: <Tasks/> },
        { path: 'processos', element: <Process/> },
        { path: 'processos/:processId', element: <ProcessDetail/> },
        { path: 'caso/:caseId', element: <CaseDetail/> },
        { path: 'caso/manual', element: <CaseHandle/> },
        { path: 'caso/manual/:caseManualId', element: <CaseHandle/> },
        { path: 'caso/documento/:caseDocumentId', element: <ProcessDocument/> },
        { path: 'processos/manual', element: <ProcessHandle/> },
        { path: 'processos/manual/:processManualId', element: <ProcessHandle/> },
        { path: 'processos/importar', element: <ProcessImport/> },
        { path: 'processos/importar/:listId', element: <ProcessImportDetail/> },
        { path: 'processos/documento/:processDocumentId', element: <ProcessDocument/> },
        { path: 'processos/movimentacao/:processMovimentationId', element: <ProcessMovimentation/> },
        { path: 'processos/lista-importacao', element: <ProcessImportList/> },
        { path: 'financeiro', element: <WIP/> },
        { path: 'atendimentos', element: <Calls/> },
        { path: 'atendimentos/manual', element: <CallHandle/> },
        { path: 'processos/atendimento/manual', element: <CallProcessHandle/> },
        { path: 'documentos', element: <WIP/> },
        { path: 'movimentacoes', element: <Movimentations/> },
      ],
    },
    {
      path: '/reset',
      element: <ResetLayout />,
      children: [
        { path: 'user/:hashUser', element: <ResetPassword/> },
      ]
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '*', element: <Navigate to="/forum" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/forum" replace /> },
  ]);
}

const WIP = Loadable(lazy(() => import('../pages/WIP')));

// Forum
const Feed = Loadable(lazy(() => import('../pages/feed/Feed')));
const Topics = Loadable(lazy(() => import('../pages/topics/Topics')));
const Topic = Loadable(lazy(() => import('../pages/topic/Topic')));
const Saved = Loadable(lazy(() => import('../pages/saved/Saved')));
const MyPosts = Loadable(lazy(() => import('../pages/my-posts/MyPosts')));
const Discover = Loadable(lazy(() => import('../pages/discover/Discover')));
const NewPost = Loadable(lazy(() => import('../pages/new-post/NewPost')));
const Community = Loadable(lazy(() => import('../pages/community/Community')));
const Post = Loadable(lazy(() => import('../pages/post/Post')));
const LivePost = Loadable(lazy(() => import('../pages/post/LivePost')));
const ResetPassword = Loadable(lazy(() => import('../pages/reset/ResetPassword')));

// ------ ERP ------

// Process/Case
const Process = Loadable(lazy(() => import('../pages/process/Process')));
const ProcessHandle = Loadable(lazy(() => import('../pages/process-handle/ProcessHandle')));
const ProcessImport = Loadable(lazy(() => import('../pages/process-import/ProcessImport')));
const ProcessImportList = Loadable(lazy(() => import('../pages/process-import-list/ProcessImportList')));
const ProcessImportDetail = Loadable(lazy(() => import('../pages/process-import-detail/ProcessImportDetail')));
const ProcessDetail = Loadable(lazy(() => import('../pages/process-detail/ProcessDetail')));
const ProcessDocument = Loadable(lazy(() => import('../pages/process-document/ProcessDocument')));
const ProcessMovimentation = Loadable(lazy(() => import('../pages/process-movimentation/ProcessMovimentation')));
const CaseHandle = Loadable(lazy(() => import('../pages/case-handle/CaseHandle')));
const CaseDetail = Loadable(lazy(() => import('../pages/case-detail/CaseDetail')));

// Movimentation
const Movimentations = Loadable(lazy(() => import('../pages/movimentations/Movimentations')));

//tasks

const Tasks = Loadable(lazy(() => import('../pages/tasks/Tasks')));

const Contacts = Loadable(lazy(() => import('../pages/contacts/Contacts')));
const ContactDetail = Loadable(lazy(() => import('../pages/contacts/ContactDetail')));

// calls(attendimentos)
const Calls = Loadable(lazy(() => import('../pages/calls/Calls')));
const CallHandle = Loadable(lazy(() => import('../pages/call-handle/CallHandle')));
const CallProcessHandle = Loadable(lazy(() => import('../pages/call-process-handle/CallHandle')));