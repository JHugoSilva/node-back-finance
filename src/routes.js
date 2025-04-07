import { Router } from "express";
import jwt from './token.js'
import controllerUsers from "./controllers/controller.users.js";
import controllerLancing from "./controllers/controller.lancing.js";
import controllerCategory from "./controllers/controller.category.js";

const router = Router()

router.post("/users/login", controllerUsers.login)
router.post("/users/register", controllerUsers.register)
router.get("/users/profile", jwt.validateJWT, controllerUsers.profile)
router.put("/users/edit", jwt.validateJWT, controllerUsers.edit)
router.put("/users/password", jwt.validateJWT, controllerUsers.password)


router.get("/lancing/summary", jwt.validateJWT, controllerLancing.summary)
router.get("/lancing", jwt.validateJWT, controllerLancing.list)
router.get("/lancing/:id_lancing", jwt.validateJWT, controllerLancing.listId)
router.post("/lancing", jwt.validateJWT, controllerLancing.insert)
router.put("/lancing/:id_lancing", jwt.validateJWT, controllerLancing.edit)
router.delete("/lancing/:id_lancing", jwt.validateJWT, controllerLancing.exlude)

router.get("/categories", jwt.validateJWT, controllerCategory.list)
router.post("/categories", jwt.validateJWT, controllerCategory.insert)
router.get("/categories/icons", jwt.validateJWT, controllerCategory.listIcons)
router.get("/categories/:id_category", jwt.validateJWT, controllerCategory.listId)
router.put("/categories/:id_category", jwt.validateJWT, controllerCategory.edit)
router.delete("/categories/:id_category", jwt.validateJWT, controllerCategory.exlude)



export default router
