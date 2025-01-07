export const exampleGETController = (req, res) => {
  try {
    res.status(200).json("This is the example from the controller!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const examplePOSTController = (req, res) => {
  try {
    const { body } = req;
    res.status(200).json(body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
