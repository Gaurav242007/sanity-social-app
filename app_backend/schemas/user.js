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
            name: "bannerImage",
            title: 'BannerImage',
            type: 'image', 
            options: {
                hotspot: true
            }
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