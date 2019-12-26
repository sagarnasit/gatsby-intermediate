require('dotenv').config({
    path: `env.${process.env.NODE_ENV}`
});

exports.default = {
    plugins: [
        'gatsby-plugin-theme-ui',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: 'src/images'
            }
        },
        {
            resolve: 'gatsby-trasform-cloudinary',
            options: {
                cloudName: process.env.CLOUDINARY_CLOUD_NAME,
                apiKey: process.env.CLOUDINARY_API_KEY,
                apiSecret: process.env.CLOUDINARY_API_SECRET,
                uploadFolder: 'fm-workshop'
            }
        }
    ]
}