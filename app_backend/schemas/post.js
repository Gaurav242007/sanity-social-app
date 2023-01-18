export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title', 
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image', 
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'userId',
            title: 'UserID', 
            type: 'string'
        },
        {
            name: 'username',
            title: 'UserName', 
            type: 'string'
        },
        {
            name: 'userImage',
            title: 'UserImage',
            type: 'string'
        },
        {
            name: 'comments',
            title: 'Comments', 
            type: 'array',
            of: [{type: 'comment'}]
        },
        {
            name: 'likes',
            title: 'Likes', 
            type: 'array',
            of: [{type: 'like'}]
        },
    ]
}