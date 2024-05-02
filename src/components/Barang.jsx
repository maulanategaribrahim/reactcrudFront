import React, { useState } from 'react';

function Barang({ data, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);

  const handleUpdate = () => {
    onUpdate(editedData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(data.id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <tr key={data.id}>
      <td>{isEditing ? <input type="text" name="name" value={editedData.name} onChange={handleChange} /> : data.name}</td>
      <td>{isEditing ? <input type="number" name="quantity" value={editedData.quantity} onChange={handleChange} /> : data.quantity}</td>
      <td>{isEditing ? <input type="text" name="merk" value={editedData.merk} onChange={handleChange} /> : data.merk}</td>
      <td>{isEditing ? <input type="number" name="Stok" value={editedData.Stok} onChange={handleChange} /> : data.Stok}</td>
      <td>
  {isEditing ? (
    <>
      <button className="save-btn" onClick={handleUpdate}>Simpan</button>
      <button className="cancel-btn" onClick={() => setIsEditing(false)}>Batal</button>
    </>
  ) : (
    <>
      <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
      <button className="delete-btn" onClick={handleDelete}>Hapus</button>
    </>
  )}
</td>

    </tr>
  );
}

export default Barang;
