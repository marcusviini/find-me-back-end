import fs from 'fs'
import path from 'path'
import 'dotenv/config'

export class AvatarAdapter {
    async upload(avatar_path, nome) {
        const file = fs.readFileSync(
            path.resolve(__dirname, `../../../uploads/${avatar_path}`, {
                encoding: 'utf8',
                flag: 'r',
            })
        )

        return file
    }
}
