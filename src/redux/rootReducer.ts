import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import feedReducer from './slices/feed'
import topicReducer from './slices/topic'
import savedReducer from './slices/saved';
import myPostsReducer from './slices/myPosts'
import communityReducer from './slices/community';
import postReducer from './slices/post';
import newPostReducer from './slices/new-post';
import authReducer from './slices/auth';
import liveReducer from './slices/live';
import resetReducer from './slices/reset'
import processReducer from './slices/process';
import taskReducer from './slices/task';
import callReducer from './slices/call';
import callHandleReducer from './slices/callHandle';
import callDetailReducer from './slices/callDetail';
import contactReducer from './slices/contact';
import processImportReducer from './slices/processImport';
import processImportListReducer from './slices/processImportList';
import processDetailReducer from './slices/processDetail';
import processHandleReducer from './slices/processHandle';
import profileReducer from './slices/profile';
import caseHandleReducer from './slices/caseHandle';
import caseDetailReducer from './slices/caseDetail';
import transactionReducer from './slices/transaction';
import proceduralReducer from './slices/procedural';
import searchTermReducer from './slices/searchTerms';
import calendarReducer from './slices/calendar';
import contactsHandleReducer from './slices/contactsHandle';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  feed: feedReducer,
  topic: topicReducer,
  saved: savedReducer,
  myPosts: myPostsReducer,
  community: communityReducer,
  post: postReducer,
  newPost: newPostReducer,
  auth: authReducer,
  live: liveReducer,
  reset: resetReducer,
  process: processReducer,
  task:taskReducer,
  call:callReducer,
  callHandle:callHandleReducer,
  callDetail: callDetailReducer,
  contact: contactReducer,
  processImport: processImportReducer,
  processImportList: processImportListReducer,
  processDetail: processDetailReducer,
  processHandle: processHandleReducer,
  profile: profileReducer,
  caseHandle: caseHandleReducer,
  caseDetail: caseDetailReducer,
  transaction: transactionReducer,
  procedural: proceduralReducer,
  searchTerm: searchTermReducer,
  calendar: calendarReducer,
  contactsHandle: contactsHandleReducer
});

export { rootPersistConfig, rootReducer };
