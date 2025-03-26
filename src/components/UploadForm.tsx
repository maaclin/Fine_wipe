import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { storage, db } from "../lib/firebase";

function UploadForm({ onUploadComplete }: { onUploadComplete: () => void }) {
  const [file, setFile] = useState<File | null>(null);

  async function handleUpload() {
    if (!file) return;

    const fileRef = ref(storage, `tickets/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    const dispute = { ticketImage: url, status: "pending", appealLetter: "" };
    await addDoc(collection(db, "disputes"), dispute);

    onUploadComplete();
  }

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 mt-2">Upload Ticket</button>
    </div>
  );
}

export default UploadForm;