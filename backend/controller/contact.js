const Contact = require('../models/contact');

const userMessage = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ msg: 'Please fill all fields' });
    }

    
    const newContact = new Contact({
      name,
      email,
      phone,  
      message
    });

    
    await newContact.save();

  
    res.status(201).json({ msg: 'Message sent successfully' });
  } catch (err) {

    console.error(err);
    res.status(500).json({ msg: 'There was an issue with your submission, please try again later.' });
  }
};

module.exports = {
  userMessage
};

