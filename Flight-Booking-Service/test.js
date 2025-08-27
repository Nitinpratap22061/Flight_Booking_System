const axios = require('axios');

async function testBooking() {
    try {
        console.log('Sending request to create booking...');
        const response = await axios.post('http://localhost:5000/api/v1/bookings', {
            flightId: 1,
            userId: 1,
            noofSeats: 2
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            response: error.response ? {
                status: error.response.status,
                data: error.response.data
            } : null,
            config: error.config ? {
                url: error.config.url,
                method: error.config.method,
                data: error.config.data
            } : null
        });
    }
}

testBooking();
