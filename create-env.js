// Node.js script to create .env file
const fs = require('fs');
const path = require('path');

const envContent = `MONGODB_URI=mongodb+srv://dileepsengar5141:dileepsengar5141@cluster0.vuko71c.mongodb.net/secure-vault?retryWrites=true&w=majority&appName=Cluster0

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=xK8vN2pQ7mR4sT6uW9yZ1aB3cD5eF7gH9iJ0kL2mN4oP6qR8sT0uV2wX4yZ6aB8cD0eF2gH4iJ6k
`;

const envPath = path.join(__dirname, '.env');

try {
  fs.writeFileSync(envPath, envContent, 'utf8');
  
  console.log('\n✅ SUCCESS! .env file created!\n');
  console.log('📁 Location:', envPath);
  console.log('\n📄 File contents:');
  console.log('─────────────────────────────────────────');
  console.log(envContent);
  console.log('─────────────────────────────────────────');
  console.log('\n🔄 NEXT STEPS:');
  console.log('1. Go to your terminal running "npm run dev"');
  console.log('2. Press Ctrl+C to stop the server');
  console.log('3. Run: npm run dev');
  console.log('4. Go to http://localhost:3000');
  console.log('5. Try signup again - it will work! 🎉\n');
  
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  console.log('\n📝 Manual alternative:');
  console.log('1. Create a file named .env in the project folder');
  console.log('2. Copy the content from COPY_THIS_TO_ENV.txt');
  console.log('3. Save and restart the server\n');
}
