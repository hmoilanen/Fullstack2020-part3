const mongoose = require('mongoose')

const password = process.argv[2]
const contactName = process.argv[3]
const contactNumber = process.argv[4]
const dbName = 'phonebook-app'
const url = `mongodb+srv://Fullstack2020:${password}@cluster0.jfyg6.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
  important: Boolean
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
  name: contactName,
  number: contactNumber,
  date: new Date(),
  important: false
})

if (!password) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (password && (contactName && !contactNumber)) {
  console.log('Please provide both contact\'s name and number as arguments: node mongo.js <password> <contactName> <contactNumber>');
  process.exit(1)
} else if (contactName && contactNumber) {
  contact.save().then(result => {
    console.log(`Added name: ${contactName} and number: ${contactNumber} to ${dbName}`);
    mongoose.connection.close()
  })
} else { // If only password is provided
  console.log('Phonebook:');
  Contact.find({}).then(result => {
    result.forEach(note => {
      console.log(note.name, note.number)
    })
    mongoose.connection.close()
  })
}