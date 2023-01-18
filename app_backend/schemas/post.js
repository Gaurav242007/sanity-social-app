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
            name: 'destination',
            title: 'Destination', 
            type: 'url'
        },
        {
            name: 'category',
            title: 'Category', 
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
            name: 'postedBy',
            title: 'PostedBy', 
            type: 'postedBy'
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