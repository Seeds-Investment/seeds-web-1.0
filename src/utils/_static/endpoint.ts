/* eslint-disable @typescript-eslint/no-extraneous-class */
export default class Endpoints {
  static chat = {
    list: '/chat/v1/contacts/:type',
    personalChat: '/chat/v1/message/list',
    createGroupChat: '/chat/v1/group/create',
    sendPersonalChat: '/chat/v1/message/create',
    groupDetail: '/chat/v1/group', // :id
    mutePersonalChat: '/chat/v1/message/mute/personal',
    deletePersonalChat: '/chat/v1/message/:id/personal',
    muteGroupChat: '/chat/v1/message/mute/group',
    deleteGroupChat: '/chat/v1/message/:id/group',
    leaveGroupChat: '/chat/v1/group/:id/leave',
    sendNoteChat: '/chat/v1/note/create',
    actionNoteChat: '/chat/v1/note/:id',
    ratingNoteChat: '/chat/v1/note/like',
    listNoteChat: '/chat/v1/personal/:id/notes',
    createCommentChat: '/chat/v1/comment/create',
    getAllCommentChat: '/chat/v1/note/:id/comments',
    rateCommenChat: '/chat/v1/comment/like',
    getChatSettings: '/chat/v1/settings',
    updateChatSettings: '/chat/v1/settings'
  };
}
