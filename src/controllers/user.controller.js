import UserModel from '../models/user.model.js';
import MessageModel from '../models/message.js';
import bcrypt from "bcrypt";

function showFirstData(req, res) {

  const student = {
    "Nombre": "Carlo",
    "Apellido": "Negroni"
  }

  res.send(student)

}

async function createUser(req, res) {
  var mensaje = 'Error: faltan los siguientes campos:\n';
  var error = false
  try {
    const name = req.body.name;
    const email = req.body.email;
    const dni = req.body.dni;
    const password = req.body.password;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    if (!name) {
      mensaje += "name\n"
      error = true
    }
    if (!email) {

      mensaje += "email\n"
      error = true
    }
    if (!dni) {
      mensaje += "dni\n"
      error = true
    }
    if (!password) {

      mensaje += "password\n"
      error = true
    }
    if (error) {
      return res.status(400).send(mensaje)
    }

    const userCreated = await UserModel.create({ name: name, email: email, dni: dni, password: encryptedPassword });

    res.send(userCreated);
  } catch (err) {
    res.status(500).send(err);
  }
}


async function getUsers(req, res) {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function login(req, res) {
  var error = false
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await UserModel.findOne({ email });

    if (!email || !user) {
      return res.status(400).send("Error, falta un campo o las contraseñas no coinciden")
    }

    const passwordUser = user.password
    const isMatch = await bcrypt.compare(password, passwordUser);

    if (!password || !isMatch) {
      return res.status(400).send("Error, falta un campo o las contraseñas no coinciden")
    }

    if (isMatch) {
      return res.send("Se ha logeado Correctamente")
    }

  } catch (err) {
    res.status(500).send(err)
  }
}

async function crearMensajes(req, res) {
  try {
    const userId = req.body.userId
    const text = req.body.text
    var user

    if(!userId || !text){
      return res.status(400).send("Error: falta un dato o ingreso incorrecto de dato")
    }

    try{
      var user = await UserModel.findById(userId)
    }catch(err){
      return res.status(404).send("Error: Usuario no encontrado")
    }
  
    const message = await MessageModel.create({userId:userId, text:text})

    res.send(message);

  } catch (err) {
    res.status(500).send(err)
  }

}

async function getMessages(req, res) {
  const userId=req.params.userId
  try {
    const messages = await MessageModel.find({userId});
    res.send(messages);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function deleteMessages(req, res) {
  const messages_id=req.params.messages_id
  try {
    const message = await MessageModel.deleteOne({_id:messages_id});
    res.send(message);
  } catch (err) {
    res.status(500).send(err);
  }
}



export {
  showFirstData,
  getUsers,
  createUser,
  login,
  crearMensajes,
  getMessages,
  deleteMessages
};
