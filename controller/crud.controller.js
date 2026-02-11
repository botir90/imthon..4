const { v4 } = require("uuid");
const { read_file, write_file } = require("../api/file-system");

const getAllcruds = async (req, res) => {
  try {
   const crud = read_file("crud.json");
    const myCruds = crud.filter(item => item.added_by === req.user.id) 
    res.status(200).json(myCruds);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const addcrud = async (req, res) => {
  try {
    const { title , time} = req.body;

    const crud = read_file("crud.json");
console.log(req.user);

    crud.push({
      id: v4(),
      title,
      time,
      added_by : req.user.id
    });

    write_file("crud.json", crud);
    res.status(200).json({
      message: "Added new crud",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatecrud = async (req, res) => {
  try {
    const { id } = req.params;
    const { title,time} = req.body;
    const crud = read_file("crud.json");

    const foundedcrud = crud.find((item) => item.id === id);

    if (!foundedcrud) {
      return res.json({
        message: "Not found",
      });
    }
    if (foundedcrud.added_by !== req.user.id) {
        return res.json({
            message : "forbidden"
        })
    }

 

crud.forEach(item => {
 if(item.id === id){
   item.title = title || item.title
   item.time = time || item.time
 }
})


    write_file("crud.json", crud);

    res.status(200).json({
      message: "Updated crud",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletecrud = async (req, res) => {
  try {
    const { id } = req.params;
    const crud = read_file("crud.json");

    const foundedcrud = crud.find((item) => item.id === id);

    if (!foundedcrud) {
      return res.json({
        message: "Not found",
      });
    }
    /////////////
 if (foundedcrud.added_by !== req.user.id) {
        return res.json({
            message : "forbidden"
        })
    }
    ///////////////
    crud.forEach((item, idx) => {
      if (item.id === id) {
        crud.splice(idx, 1);
      }
    });

    write_file("crud.json", crud);

    res.status(200).json({
      message: "Deleted crud",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const chek = (req,res)=>{
 const { id } = req.params

 let crud = read_file("crud.json")

 const founded = crud.find(item=>item.id===id)

 if(!founded){
   return res.status(404).json({message: "not found"})
 }

 if(founded.added_by !== req.user.id){
   return res.status(403).json({message: "forbidden"})
 }

 founded.completed =  !founded.completed

 write_file("crud.json",crud)

 res.json({
   message: "status changed",
   founded
 })
}
const deleteChecked = (req,res)=>{
 let crud = read_file("crud.json")

 const filtered = crud.filter(item=>{
   return !(item.completed === true && item.added_by === req.user.id)
 })

 write_file("crud.json", filtered)

 res.json({
   message: "checked todos removed"
 })
}
const getMe = (req,res)=>{
 res.json({
   id: req.user.id,
   email:req.user.email
 })
}

module.exports = {
  getAllcruds,
  addcrud,
  updatecrud,
  deletecrud,
  chek,
  deleteChecked,
getMe
};
