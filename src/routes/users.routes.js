import { Router } from 'express';
import {
  createUser,
  getUsers,
  showFirstData,
  login,
  crearMensajes,
  getMessages,
  deleteMessages


} from '../controllers/user.controller.js';


const router = Router();

router.get('/', showFirstData)
router.post('/auth/register', createUser);
router.get('/users', getUsers);
router.post('/auth/login', login);
router.post('/messages', crearMensajes );
router.get('/users/:userId/messages', getMessages );
router.delete('/messages/:messages_id', deleteMessages );

export default router;
