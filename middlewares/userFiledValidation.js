const fieldValidation = (req, res, next) => {
  const { gender, name, contact, address, photoUrl } = req.body;
  if (!gender) {
    res.json({ message: "gender is required" });
  } else if (!name) {
    res.json({ message: "name is required" });
  } else if (!contact) {
    res.json({ message: "contact is required" });
  } else if (!address) {
    res.json({ message: "address is required" });
  } else if (!photoUrl) {
    res.json({ message: "photoUrl is required" });
  } else {
    next();
  }
};

module.exports = fieldValidation;
