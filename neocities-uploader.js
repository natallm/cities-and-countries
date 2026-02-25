import NeoCities from "neocities";
import fs from "fs"
import path from "path"

process.loadEnvFile("./development.env")

const files = fs.readdirSync("./src", { recursive: true, withFileTypes: true }).filter(path => !path.isDirectory())
const filesToUpload = files.map(file => ({ name: file.name, path: path.join(process.cwd(), file.parentPath, file.name) }))


const api = new NeoCities('cities-and-countries', process.env.NEOCITIES_PASSWORD)

api.upload(filesToUpload, function(resp) {
  console.log(resp)
})