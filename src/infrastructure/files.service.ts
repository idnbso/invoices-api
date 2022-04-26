import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import { promisify } from 'util';

@Injectable()
export class FilesService {
    public async createFile(path: string, fileName: string, data: string): Promise<void> {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }

        const writeFile = promisify(fs.writeFile);

        return await writeFile(`${path}/${fileName}`, data, 'utf8');
    }
}
