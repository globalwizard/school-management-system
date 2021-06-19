const app = require('./server')

const db = require('./config/database')
const cloudinary = require('./config/coudinary')
const { PORT } = require('./config/env')

db.init()
cloudinary.init()

app.listen(PORT, () => console.log(`[ OK ] http://localhost:${PORT}`))
