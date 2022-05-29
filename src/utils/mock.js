export default async function ({ sequelize }) {
    // mock user data
    const user = await sequelize.models.User.bulkCreate([
        { user_name: 'admin', user_password: '25f43b1486ad95a1398e3eeb3d83bc4010015fcc9bedb35b432e00298d5021f7', user_is_admin: true},
        { user_name: 'javohir', user_password: '88352a08f28e611a4780fc24f5f5216b9c5aa633eb1ea422f251a70b2ec7c7bf', user_is_admin: false},
        { user_name: 'hikmat', user_password: '7271e4b327a019c04ff53c67d466574f9a51cda6b38f6d8a51c4a3c2157d937a', user_is_admin: false},
    ])

    const category = await sequelize.models.Category.bulkCreate([
        { category_name: 'diniy kitoblar', category_img: 'diniykitoblar.jpg'},
        { category_name: 'ertak kitoblar', category_img: 'ertakkitoblar.jpg'},
    ])

    const products = await sequelize.models.Product.bulkCreate([
        {
            category_id: 1,
            product_name: 'Jannatga oshiq qalb',
            product_img: 'jannatgaoshiqqalb.jpg',
            product_price: 50000,
            short_description: 'Jannatga oshiq qalb yangi kitob',
            long_description: 'Jannatga oshiq qalb juda ajoyib kitob sotib olishga arziydi'
        },
        {
            category_id: 2,
            product_name: 'Harsang tosh',
            product_img: 'harsangtosh.jpg',
            product_price: 25000,
            short_description: 'yosh bolalar uchun yaxshi ertak kitob',
            long_description: 'Yosh bolalar uchun juda ajoyib kitob ekan bolalarni uxlashidan avval oqib berish uchun ham juda yaxshi'
        }
    ])
    const orders = await sequelize.models.Order.bulkCreate([
        { user_id: 2, product_id: 1, product_price: 50000, order_count: 1, order_is_paid: false},
        { user_id: 3, product_id: 2, product_price: 50000, order_count: 2, order_is_paid: false},
    ])

} 