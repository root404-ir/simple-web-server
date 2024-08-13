const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
    let filePath = path.join(
        __dirname,
        "public",
        req.url === "/" ? "index.html" : req.url
    )
    let extname = path.extname(filePath)
    let contentType = "text/html"
    switch (contentType) {
        case ".js":

            contentType = "text/javascript"
            break
        case ".css":

            contentType = "text/css"
            break

        case ".json":

            contentType = "application/json"
            break

        case ".jpg":

            contentType = "image/jpg"
            break

        case ".png":

            contentType = "image/png"
            break
    }
    if (contentType === "text/html" && extname === "") {
        filePath += ".html"
    }
    fs.readFile(filePath,
        (err, data) => {
            if (err) {
                if (err.code == "ENOENT") {
                    fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
                        res.writeHead(404, { "Content-Type": "text/html" })
                        res.end(data)
                    })
                } else {
                    res.writeHead(500)
                    res.end(`Server Error : ${err.code}`)
                }
            } else {
                res.writeHead(200, { "Content-Type": contentType })
                res.end(data)
            }
        }
    )
})

server.listen(3000, () => console.log('you are server running on port 3000'))