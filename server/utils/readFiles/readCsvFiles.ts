import * as fs from 'fs'
import * as path from 'path'

export function readCardCollection(fileName: string, callback: (arg0: string[]) => { [key: string]: string[]}) {
    try {
        const filePath = path.join(__dirname, 'csv', fileName)
        const getData = fs.readFileSync(filePath, 'utf-8')
    
        let lines = getData.split('\n').slice(1)
        return callback(lines)
    } catch (error) {
        console.error(`Error occurred: ${error}`)
    }
}