const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide as: node mongo.js <password> "name" "number"')
    process.exit(1)
}

const password = process.argv[2]

const url = 'mongodb+srv://Charlie:' + password + '@cluster0.g59xjrz.mongodb.net/phoneBook?retryWrites=true&w=majority'

mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema)

if (process.argv.length == 3) {
    PhoneBook.find({}).then(result => {
        result.forEach(pb => {
            console.log(pb.name + ' ' + pb.number)
        })
        mongoose.connection.close()
    })
}
else {
    const pb = new PhoneBook({
        name: process.argv[3],
        number: process.argv[4],
    })
    pb.save().then(result => {
        console.log('added ' + pb.name + ' ' + pb.number + ' to phone book')
        mongoose.connection.close()
    })
}

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })