const https = require('https');
const fs = require('fs');

const url = 'https://raw.githubusercontent.com/vedant127/fresh-picks-grocer/main/src/pages/Products.tsx';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        fs.writeFileSync('Products.tsx', data);
        console.log('Downloaded Products.tsx');
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
