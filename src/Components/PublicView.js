// src/Components/PublicView.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function PublicView() {
  const { id } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      const fileRef = doc(firestore, "files", id);
      const fileSnap = await getDoc(fileRef);

      if (fileSnap.exists()) {
        setFile(fileSnap.data());
      } else {
        // Handle non-existent document
      }
    };

    fetchFile();
  }, [id]);

  return <div>{file && <img src={file.url} alt="Uploaded Content" />}</div>;
}

export default PublicView;
