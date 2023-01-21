export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
      {
        name: 'message',
        title: 'Message',
        type: 'string',
      },
      {
        name: 'userId',
        title: 'UserID',
        type: 'string',
      },
      {
        name: 'username',
        title: 'UserName',
        type: 'string',
      },
      {
        name: 'userImage',
        title: 'UserImage',
        type: 'string',
      },
      {
        name: 'link',
        title: 'Link',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
       {
        name: 'timestamp',
        title: 'Timestamp',
        type: 'string'
      },
    ],
  }
  