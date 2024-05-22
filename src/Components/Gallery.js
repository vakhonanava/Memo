// src/Components/Gallery.js
import React, { useEffect, useState } from "react";
import { auth, firestore } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";
import QRCode from "qrcode.react";
import "./Gallery.css";
import FileUpload from "./FileUpload";

function Gallery() {
  const [user, loading, error] = useAuthState(auth);
  const [files, setFiles] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (!loading && user) {
      const fetchFiles = async () => {
        try {
          const userFilesRef = collection(
            firestore,
            `userFiles/${user.uid}/files`
          );
          const snapshot = await getDocs(userFilesRef);
          const fetchedFiles = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFiles(fetchedFiles);
        } catch (err) {
          setFetchError(
            "Failed to connect to Firestore. Please check your network connection."
          );
        }
      };

      fetchFiles();
    }
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>Please log in to see your gallery.</div>;

  return (
    <div className="gallery-container">
      <div className="user-info">
        <h2>
          {user ? `${user.displayName || "User"}'s Gallery` : "User's Gallery"}
        </h2>
        {user && (
          <QRCode
            value={`https://yourapp.com/gallery/${user.uid}`}
            size={128}
          />
        )}
      </div>
      {fetchError && <div className="error">{fetchError}</div>}
      <FileUpload onFileUploaded={(newFile) => setFiles([...files, newFile])} />
      <div className="gallery-grid">
        {files.map((file) => (
          <div key={file.id} className="gallery-item">
            {file.type.startsWith("video") ? (
              <video controls src={file.url} className="media-content" />
            ) : (
              <img
                src={file.url}
                alt="Uploaded content"
                className="media-content"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
