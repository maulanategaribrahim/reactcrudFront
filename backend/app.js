import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS'); // allow PUT and OPTIONS
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

// Endpoint untuk mendapatkan daftar barang dari file barang.json
app.get('/barang', async (req, res) => {
  try {
    const fileContent = await fs.readFile('./data/barang.json');
    const barangData = JSON.parse(fileContent);
    res.status(200).json({ barang: barangData });
  } catch (error) {
    console.error('Error reading barang data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint untuk mendapatkan daftar barang dari file user-barang.json
app.get('/user-barang', async (req, res) => {
  try {
    const fileContent = await fs.readFile('./data/user-barang.json');
    const userBarangData = JSON.parse(fileContent);
    res.status(200).json({ userBarang: userBarangData });
  } catch (error) {
    console.error('Error reading user-barang data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint untuk menambah barang ke dalam file user-barang.json
app.put('/barang', async (req, res) => {
  try {
    const barang = req.body.barang;

    // Membaca data barang yang ada dalam file user-barang.json
    const fileContent = await fs.readFile('./data/user-barang.json');
    const existingUserBarang = JSON.parse(fileContent);

    // Menambahkan barang baru ke dalam array existingUserBarang
    existingUserBarang.push(barang);

    // Menulis kembali data barang yang telah diperbarui ke dalam file JSON user-barang.json
    await fs.writeFile('./data/user-barang.json', JSON.stringify(existingUserBarang));

    res.status(200).json({ message: 'User barang updated!' });
  } catch (error) {
    console.error('Error updating user-barang data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// OPTIONS handler
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).send();
});

// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
