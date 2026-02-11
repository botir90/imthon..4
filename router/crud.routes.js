const { Router } = require("express");
const { getAllcruds,  addcrud, updatecrud, deletecrud, chek, deleteChecked, getMe, getOnecrud } = require("../controller/crud.controller");
const authorization = require("../middleware/authorization");


const crudRouter = Router();
crudRouter.get("/get_all_crud",authorization,getAllcruds)
crudRouter.post("/add_crud",authorization,addcrud)
crudRouter.put("/update_crud/:id",authorization,updatecrud)
crudRouter.delete("/delete_crud/:id",authorization,deletecrud)
crudRouter.patch("/:id",authorization,chek)
crudRouter.delete("/chaked",authorization,deleteChecked)
crudRouter.get("/me",authorization, getMe)
module.exports = crudRouter
