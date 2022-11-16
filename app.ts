import express , { Response , Request } from 'express'
const app = express()
const PORT = 3000

const getroute = require('./src/routes/example/get')
const postroute = require('./src/routes/example/post')
const patctroute = require('./src/routes/example/patch')
const deleteroute = require('./src/routes/example/delete')
const getweblinkcate = require('./src/routes/weblinkcategories/getweblinkcate')
const postweblinkcate = require('./src/routes/weblinkcategories/postweblinkcate')
const deleteweblinkcate = require('./src/routes/weblinkcategories/deleteweblinkcate')
const patchweblinkcate = require('./src/routes/weblinkcategories/patchweblinkcate')
const deleteallweblinkcate = require('./src/routes/weblinkcategories/deleteallweblinkcate')
const getannouncepagination = require('./src/routes/announcement/getannouncepagination')
const postannounce = require('./src/routes/announcement/postannounce')
const getannounce = require('./src/routes/announcement/getannounce')
const deleteannounce = require('./src/routes/announcement/deleteannounce')
const deleteall = require('./src/routes/announcement/deleteall')
const patchannounce = require('./src/routes/announcement/patchannounce')
const getweblink = require('./src/routes/weblink/getweblink')
const postweblink = require('./src/routes/weblink/postweblink')
const patchweblink = require('./src/routes/weblink/patchweblink')
const deleteweblink = require('./src/routes/weblink/deleteweblink')





app.use(getroute)
app.use(postroute)
app.use(patctroute)
app.use(deleteroute)
app.use(getweblinkcate)
app.use(postweblinkcate)
app.use(deleteweblinkcate)
app.use(patchweblinkcate)
app.use(deleteallweblinkcate)
app.use(postannounce)
app.use(getannounce)
app.use(deleteannounce)
app.use(deleteall)
app.use(patchannounce)
app.use(getweblink)
app.use(postweblink)
app.use(patchweblink)
app.use(deleteweblink)
app.use(getannouncepagination)

app.get('/', ( req:Request, res:Response) => {
    res.send("OK")
})

app.listen(PORT, () => {
    console.log(`Server is running on Port : ${PORT}`)
})