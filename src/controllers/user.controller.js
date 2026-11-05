import { userService } from '../services/user.service.js';

class UserController {
  async getAll(req, res) {
    const users = await userService.getAll();
    res.status(200).json({ payload: users });
  }

  async getById(req, res) {
    const user = await userService.getById(req.params.id);
    res.status(200).json({ payload: user });
  }

  async create(req, res) {
    const user = await userService.create(req.body);
    res.status(201).json({ payload: user });
  }

  async update(req, res) {
    const user = await userService.update(req.params.id, req.body);
    res.status(200).json({ payload: user });
  }

  async delete(req, res) {
    await userService.delete(req.params.id);
    res.status(204).send();
  }
}

export const userController = new UserController();