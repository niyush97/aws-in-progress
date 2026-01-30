import React, { useState } from 'react';

const API_ENDPOINT = "https://your-api-id.execute-api.us-east-1.amazonaws.com/get-upload-url";

function FileUpload() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setMessage('');
    };

    const uploadFile = async () => {
        if (!file) {
            setMessage('Please select a file first!');
            return;
        }

        setUploading(true);
        setProgress(0);

        try {
            // Step 1: Get pre-signed URL
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type
                })
            });

            const { uploadUrl, fileKey } = await response.json();

            // Step 2: Upload to S3
            await uploadToS3(uploadUrl, file);

            setMessage(`✅ Upload successful! File key: ${fileKey}`);
        } catch (error) {
            setMessage(`❌ Upload failed: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const uploadToS3 = (presignedUrl, file) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    setProgress(Math.round((e.loaded / e.total) * 100));
                }
            });

            xhr.addEventListener('load', () => {
                xhr.status < 300 ? resolve() : reject(new Error('Upload failed'));
            });

            xhr.addEventListener('error', () => reject(new Error('Network error')));

            xhr.open('PUT', presignedUrl);
            xhr.setRequestHeader('Content-Type', file.type);
            xhr.send(file);
        });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2>S3 File Upload</h2>
            
            <input 
                type="file" 
                onChange={handleFileChange} 
                disabled={uploading}
            />
            
            <button 
                onClick={uploadFile} 
                disabled={uploading || !file}
                style={{ marginLeft: '10px', padding: '10px 20px' }}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>

            {uploading && (
                <div style={{ marginTop: '20px' }}>
                    <progress value={progress} max="100" style={{ width: '100%' }} />
                    <span>{progress}%</span>
                </div>
            )}

            {message && (
                <p style={{ 
                    marginTop: '20px', 
                    padding: '10px', 
                    backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
                    borderRadius: '5px'
                }}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default FileUpload;
