import React, { useState } from "react";
import axios from "axios";
import styles from "../assets/css/ReportUpload.module.css";

function ReportUpload() {
  const [nic, setNic] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [nicVerified, setNicVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNicVerify = async () => {
    if (!nic.trim()) {
      setMessage({ text: "Please enter NIC number", type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/reports/verify-nic/${nic}`
      );
      if (res.status === 200) {
        setMessage({ text: "NIC verified successfully", type: "success" });
        setNicVerified(true);
      }
    } catch (err) {
      setMessage({ text: "NIC not found in our system", type: "error" });
      setNicVerified(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nicVerified) {
      setMessage({ text: "Please verify NIC before uploading", type: "error" });
      return;
    }

    if (!file) {
      setMessage({ text: "Please select a report file", type: "error" });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("nic", nic);
    formData.append("date", date);
    formData.append("reportImage", file);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/reports/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage({
        text: res.data.message || "Upload successful!",
        type: "success",
      });
      // Reset form after successful upload
      setDate("");
      setFile(null);
      setFileName("No file chosen");
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Upload failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Upload Medical Report</h2>

        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="nic" className={styles.label}>
              Patient NIC Number
            </label>
            <div className={styles.inputGroup}>
              <input
                id="nic"
                type="text"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                className={styles.input}
                placeholder="Enter NIC number"
                disabled={nicVerified}
                required
              />
              <button
                type="button"
                onClick={handleNicVerify}
                className={styles.verifyButton}
                disabled={nicVerified || isLoading}
              >
                {isLoading
                  ? "Verifying..."
                  : nicVerified
                  ? "Verified"
                  : "Verify"}
              </button>
            </div>
          </div>

          {nicVerified && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="date" className={styles.label}>
                  Report Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="file" className={styles.label}>
                  Report File
                </label>
                <div className={styles.fileUpload}>
                  <label htmlFor="file" className={styles.fileLabel}>
                    Choose File
                    <input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      className={styles.fileInput}
                      required
                    />
                  </label>
                  <span className={styles.fileName}>{fileName}</span>
                </div>
                <small className={styles.hint}>
                  Supported formats: JPG, PNG, PDF (Max 5MB)
                </small>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload Report"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default ReportUpload;
