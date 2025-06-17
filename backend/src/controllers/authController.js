// backend/src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');
const { validateRegistration, validateLogin } = require('../middleware/validation');

class AuthController {
  static async register(req, res) {
    try {
      const { error } = validateRegistration(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
          errorMy: 'ဖြည့်စွက်သည့် အချက်အလက်များ မှားယွင်းနေပါသည်။'
        });
      }

      const { name, email, phone, password, role = 'passenger' } = req.body;

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          error: 'User already exists with this email',
          errorMy: 'ဤ email ဖြင့် အသုံးပြုသူ ရှိပြီးဖြစ်ပါသည်။'
        });
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        role
      });

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      logger.info(`New user registered: ${user.email}`);

      res.status(201).json({
        message: 'User registered successfully',
        messageMy: 'အသုံးပြုသူ မှတ်ပုံတင်ခြင်း အောင်မြင်ပါသည်။',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        }
      });

    } catch (error) {
      logger.error('Registration error:', error);
      res.status(500).json({
        error: 'Internal server error',
        errorMy: 'စနစ်တွင်း ချို့ယွင်းမှု ဖြစ်ပေါ်နေပါသည်။'
      });
    }
  }

  static async login(req, res) {
    try {
      const { error } = validateLogin(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
          errorMy: 'ဖြည့်စွက်သည့် အချက်အလက်များ မှားယွင်းနေပါသည်။'
        });
      }

      const { email, password } = req.body;

      // Find user
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          error: 'Invalid credentials',
          errorMy: 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်။'
        });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          error: 'Invalid credentials',
          errorMy: 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်။'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      logger.info(`User logged in: ${user.email}`);

      res.json({
        message: 'Login successful',
        messageMy: 'အကောင့်ဝင်ရောက်ခြင်း အောင်မြင်ပါသည်။',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        }
      });

    } catch (error) {
      logger.error('Login error:', error);
      res.status(500).json({
        error: 'Internal server error',
        errorMy: 'စနစ်တွင်း ချို့ယွင်းမှု ဖြစ်ပေါ်နေပါသည်။'
      });
    }
  }
}

module.exports = AuthController;
