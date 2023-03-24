import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

async function findUserById(req: Request, res: Response) {
  try {
    // Simply get the id from the params and find a user with the same one.
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function findAllUsers(req: Request, res: Response) {
  try {
    // Just a find in the users collection with no filter.
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // If the email already exists the user is not created.
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // When users are registered their password is stored securely with a hash function.
    const hashedPassword = await bcrypt.hash(password, 10);

    // It is good to remember to follow the schema when creating new objects.
    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

// The login function's main job is to send back a fresh JWT.
async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET!, { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export {
  findUserById,
  findAllUsers,
  register,
  login
};
