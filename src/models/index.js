import fs from 'fs';
import path from 'path';
export default async function ({sequelize}) {
    // console.log(sequelize);
    let modelsPath = path.join(process.cwd(), 'src', 'models')
    const dir = fs.readdirSync(modelsPath)

    for await (let file of dir) {
        if(file == 'index.js') continue;
        if(file == 'relationship.js') continue;
        if (file.endsWith('.js')) {
            const {default: Model} = await import('file://' + path.join(modelsPath, file));
            Model({sequelize});
        }
    } 

    const { default: Model } = await import('file://' + path.join(modelsPath, 'relationship.js'))
    await Model({ sequelize })
}