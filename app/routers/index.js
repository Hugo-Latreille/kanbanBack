const { Router } = require("express")
const router = new Router()
const listRouter = require("./listRouter")
const cardRouter = require("./cardRouter")
const tagRouter = require("./tagRouter")
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../documentation/swagger.json");
const notFoundMiddleware = require("./../middlewares/notFoundMiddleware")


router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router.use(listRouter)
router.use(cardRouter)
router.use(tagRouter)


router.use(notFoundMiddleware)

module.exports = router
