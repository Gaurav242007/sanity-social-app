export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: "username",
            title: 'UserName',
            type: 'string'
        },
        {
            name: "email",
            title: 'Email',
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

    ]
}