export default async (req, res) => {
    const { email, first_name } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
  
    try {
      // const API_KEY = process.env.BUTTONDOWN_API_KEY;
      // const response = await fetch(
      //   `https://api.buttondown.email/v1/subscribers`,
      //   {
      //     body: JSON.stringify({
      //       email,
      //       tags: ['lucasbernalte.com']
      //     }),
      //     headers: {
      //       Authorization: `Token ${API_KEY}`,
      //       'Content-Type': 'application/json'
      //     },
      //     method: 'POST'
      //   }
      // );
      const API_KEY = process.env.REVUE_API_KEY;
      const response = await fetch('https://www.getrevue.co/api/v2/subscribers', {
        body: JSON.stringify({
          email,
          first_name,
        }),
        headers: {
          Authorization: `Token ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
      });

  
      if (response.status >= 400) {
        const text = await response.text();
        
        if (text.includes('already subscribed')) {
          return res.status(400).json({
            error: `Ya estás suscrito a mi newsletter.`
          });
        }
  
        return res.status(400).json({
          error: text
        });
      }
  
      return res.status(201).json({ error: '' });
    } catch (error) {
      return res.status(500).json({ error: error.message || error.toString() });
    }
  };