import User from '../../Modules/User/Models/userSchema.mjs';
import bcrypt from 'bcrypt';
import db from '../DB/Connection.mjs'

// Seed function to create the initial admin user
async function seedAdmin() {
  try {
    const adminExists = await User.findOne({ role: 'admin' });

    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('adminpassword', 10);

    const adminUser = new User({
        name: 'Admin User',          
        email: 'admin@example.com',
        password: hashedPassword,
        phone: '1234567890', 
        role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
}

export default seedAdmin;
