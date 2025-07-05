exports.getWelcomeMessage = (req, res) => {
  res.status(200).send({ message: 'Welcome to the chat API!' });
};
