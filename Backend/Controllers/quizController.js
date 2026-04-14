// const fetch = require('node-fetch');

// exports.submitQuiz = async (req, res) => {
//   try {
//     const response = await fetch('http://localhost:8000/predict', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(req.body),
//     });
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error('Error in submitQuiz:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
