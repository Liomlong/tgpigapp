const fetch = require('node-fetch');

const botToken = "7247154710:AAGcYdYqeeBG4mvhgXVhYAvme-UkhjO_VCw";

const sendMessage = async (chatId, text) => {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: text,
  };
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

module.exports = async (req, res) => {
  console.log('Request received:', req.method, req.body);
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const data = req.body;
  console.log('Received data:', data);
  if (data.message) {
    const chatId = data.message.chat.id;
    const text = data.message.text;
    if (text === '/start') {
      await sendMessage(chatId, 'Welcome to PIG.TG Bot!');
    } else {
      await sendMessage(chatId, `You said: ${text}`);
    }
  }
  res.status(200).send('OK');
};
