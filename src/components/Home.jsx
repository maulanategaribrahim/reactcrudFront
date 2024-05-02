import React, { useState } from 'react';
import barangData from "../../backend/data/barang.json";
import Barang from './Barang';

function Home() {
  const [availableBarang, setAvailableBarang] = useState(barangData);
  const [isAddingNewBarang, setIsAddingNewBarang] = useState(false);
  const [newBarangInput, setNewBarangInput] = useState({
    name: '',
    quantity: 0,
    merk: '',
    stok: 0
  });

  const handleUpdateBarang = async (updatedBarang) => {
    try {
      const updatedData = availableBarang.map((barang) => {
        if (barang.id === updatedBarang.id) {
          return updatedBarang;
        }
        return barang;
      });
      setAvailableBarang(updatedData);
  
      // Kirim permintaan ke backend untuk memperbarui data user-barang
      await fetch('http://localhost:3000/barang', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ barang: updatedData }) // Menggunakan properti 'barang'
      });
    } catch (error) {
      console.error('Error updating barang:', error);
    }
  };
  
  const handleDeleteBarang = async (id) => {
    try {
      const updatedData = availableBarang.filter((barang) => barang.id !== id);
      setAvailableBarang(updatedData);
  
      // Kirim permintaan ke backend untuk memperbarui data user-barang
      await fetch('http://localhost:3000/barang', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ barang: updatedData }) // Menggunakan properti 'barang'
      });
    } catch (error) {
      console.error('Error deleting barang:', error);
    }
  };

  const handleTambahBarangClick = () => {
    setIsAddingNewBarang(true);
  };

  const handleTambahBarangSubmit = () => {
    // Tambahkan barang baru ke dalam daftar
    const id = availableBarang.length + 1; // Menggunakan panjang array untuk id
    const newBarang = { ...newBarangInput, id };
    setAvailableBarang([...availableBarang, newBarang]);
    setNewBarangInput({ name: '', quantity: 0, merk: '', stok: 0 }); // Mengosongkan input setelah ditambahkan
    setIsAddingNewBarang(false); // Sembunyikan form setelah tambah barang
  };

  const handleChangeNewBarangInput = (e) => {
    const { name, value } = e.target;
    setNewBarangInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded">
        {isAddingNewBarang ? (
          <div className="mb-3">
            <input type="text" name="name" value={newBarangInput.name} placeholder="Nama Barang" onChange={handleChangeNewBarangInput} />
            <input type="number" name="quantity" value={newBarangInput.quantity} placeholder="Jumlah" onChange={handleChangeNewBarangInput} />
            <input type="text" name="merk" value={newBarangInput.merk} placeholder="Merk" onChange={handleChangeNewBarangInput} />
            <input type="number" name="stok" value={newBarangInput.stok} placeholder="Stok" onChange={handleChangeNewBarangInput} />
            <button className="btn btn-success" onClick={handleTambahBarangSubmit}>Tambah Barang</button>
          </div>
        ) : (
          <button className="btn btn-primary mb-3" onClick={handleTambahBarangClick}>Tambah Barang</button>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Name Barang</th>
              <th>Jumlah</th>
              <th>Merk</th>
              <th>Stok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {availableBarang.map((barang) => (
              <Barang
                key={barang.id}
                data={barang}
                onUpdate={handleUpdateBarang}
                onDelete={handleDeleteBarang}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
