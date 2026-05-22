exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    console.log('Received data:', JSON.stringify(data));

    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer pit-6fd3a930-6ad8-4faa-b5b0-9bbbd1e35e21',
        'Version': '2021-07-28'
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        locationId: 'pYWomhmw8fRV6k5XnTfI',
        source: 'StretchLab Landing Page',
        tags: ['StretchLab Lead']
      })
    });

    const text = await response.text();
    console.log('GHL status:', response.status);
    console.log('GHL response:', text);

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: text
    };

  } catch (err) {
    console.log('Error:', err.message);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
