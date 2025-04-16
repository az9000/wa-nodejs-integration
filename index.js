require('dotenv').config();
const axios = require('axios');

const formData = require('form-data');
const fs = require('fs');

async function sendTemplateMessage() {
    const response = await axios({
        url: process.env.WHATSAPP_URL,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'content-Type': "application/json"
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: '19725239909',
            type: 'template',
            template: {
                name: 'hello_world',
                language: {
                    code: 'en_US'
                }
            }
        })
    })

    console.log(response.data)
}

async function sendTextMessage() {
    const response = await axios({
        url: process.env.WHATSAPP_URL,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'content-Type': "application/json"
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: '19725239909',
            type: 'text',
            text: {
                body: 'This is a text message'
            }
        })
    })

    console.log(response.data)
}

async function sendMediaMessage(id) {
    const response = await axios({
        url: process.env.WHATSAPP_URL,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'content-Type': "application/json"
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: '19725239909',
            type: 'image',
            image: {
                // link: 'https://www.actseats.com/site-data/images/uploaded/dial-m-for-murder.jpeg',
                id: id,
                caption: 'Coming June 2025'
            }
        })
    })

    console.log(response.data)
}

async function uploadImage(file_name) {
    const data = new formData();
    data.append('messaging_product', 'whatsapp');
    data.append('file', fs.createReadStream(process.cwd() + '/' + file_name), { contentType: 'image/jpeg'});
    data.append('type', 'image/jpeg');

    const response = await axios({
        url: 'https://graph.facebook.com/v22.0/657581887429828/media',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,            
        },
        data: data
    });

    console.log(response.data)
}

// sendTemplateMessage();
// sendTextMessage();
// sendMediaMessage('9762262047165834');
// uploadImage('dial-m-for-murder.jpeg');