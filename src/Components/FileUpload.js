// src/Components/FileUpload.js
import React, { useState } from "react";
import { auth, storage, firestore } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function FileUpload({ onFileUploaded }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !auth.currentUser) {
      setError("No file selected or user not logged in");
      return;
    }

    const fileRef = ref(
      storage,
      `userFiles/${auth.currentUser.uid}/${file.name}`
    );
    setUploading(true);

    try {
      const uploadResult = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(uploadResult.ref);

      await addDoc(
        collection(firestore, `userFiles/${auth.currentUser.uid}/files`),
        {
          name: file.name,
          url: url,
          type: file.type,
          createdAt: new Date(),
        }
      );

      onFileUploaded({ url, name: file.name, type: file.type });
      setUploading(false);
      setFile(null);
    } catch (uploadError) {
      setError("Failed to upload file: " + uploadError.message);
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} disabled={uploading} />
      <button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default FileUpload;
