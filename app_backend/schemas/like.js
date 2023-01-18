export default {
    name: 'like',
    title: 'Like',
    type: 'document',
    fields: [
        {
            name: 'postedBy',
            title: 'Posted By',
            type:'postedBy',
        },
        {
            name: 'like',
            title: 'Like', 
            type: 'boolean'
        },
    ]
}