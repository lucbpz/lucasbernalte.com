export default async (req, res) => {  
    try {
      const API_KEY = process.env.REVUE_API_KEY;
      const response = await fetch('https://www.getrevue.co/api/v2/issues', {
        headers: {
          Authorization: `Token ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        method: 'GET',
      });

      if (response.status >= 400) {
        const text = await response.text();  
        return res.status(400).json({
          error: text
        });
      }

      const data = await response.json();
      return res.status(200).json({...data});
    } catch (error) {
      return res.status(500).json({ error: error.message || error.toString() });
    }
  };