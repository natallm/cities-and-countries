import NeoCities from "neocities";
import fs from "fs"
import path from "path"
import readline from "readline";

process.loadEnvFile("./development.env")

const files = fs.readdirSync("./src", { recursive: true, withFileTypes: true }).filter(path => !path.isDirectory())
const filesToUpload = files.map(file => ({ name: path.join(file.parentPath, file.name).replace("src/", ""), path: path.join(process.cwd(), file.parentPath, file.name) }))

console.log("FILES TO UPLOAD")
console.log(filesToUpload)

process.stdin.setRawMode(true);
process.stdin.setEncoding("utf8")
process.stdin.resume()

console.log("Upload to neocities? Y/[N]")

process.stdin.on("data", (input, a, b, c, d) => {
  process.stdin.setRawMode(false)
  process.stdin.pause()

  if (input !== "y") return

  const api = new NeoCities('cities-and-countries', process.env.NEOCITIES_PASSWORD)

  api.upload(filesToUpload, function(resp) {
    console.log(resp)
  })
})