import { useState, useRef, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { doc, getDoc } from 'firebase/firestore';
import { 
  Calendar, 
  MapPin, 
  FileText, 
  Upload, 
  X, 
  Loader2, 
  Copy, 
  Download,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { DisputeFormData, TicketType, DisputeResponse } from '../types/dispute';
import { useAuth } from '../hooks/useAuthState';
import { db } from '../lib/firebase';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_NOTES_LENGTH = 300;

export function DisputeForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<DisputeFormData>({
    id: uuidv4(),
    location: '',
    dateOfViolation: new Date().toISOString().split('T')[0],
    ticketType: 'Parking Ticket (Council)',
    additionalNotes: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState<DisputeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);

    if (!selectedFile) return;

    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      setError('Please upload a JPG, PNG, or PDF file');
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);

    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setUploading(true);
    setUploadProgress(0);

    try {
      if (!user?.email) {
        throw new Error('User email not found');
      }

      // Fetch user document to get userId
      const userDocRef = doc(db, 'users', user.email);
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        throw new Error('User document not found');
      }

      const userData = userDocSnap.data();
      
      const formDataToSend = new FormData();
      // Add dispute ID first to ensure it's included
      formDataToSend.append('disputeId', formData.id);
      formDataToSend.append('userId', userData.userId);
      
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'id') {
          formDataToSend.append(key, value);
        }
      });
      
      // Add user's full name if available
      if (user?.displayName) {
        formDataToSend.append('fullName', user.displayName);
      }

      // Add user's first and last name separately
      formDataToSend.append('firstName', userData.firstName || '');
      formDataToSend.append('lastName', userData.lastName || '');
      
      if (file) {
        formDataToSend.append('ticketImage', file);
        formDataToSend.append('fileName', file.name);
        formDataToSend.append('fileType', file.type);
        formDataToSend.append('fileSize', file.size.toString());
      }

      const response = await fetch('https://hook.eu2.make.com/d4qdynieqhe6i3wx7vcim0ydly3jreyi', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to submit dispute');

      const data = await response.json();
      setResponse({ ...data, id: formData.id });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const copyToClipboard = async () => {
    if (response?.appealLetter) {
      await navigator.clipboard.writeText(response.appealLetter);
    }
  };

  const downloadPDF = () => {
    // PDF generation logic would go here
    console.log('Downloading PDF...');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Submit Dispute</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter violation location"
            />
          </div>
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Violation
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={formData.dateOfViolation}
              onChange={(e) => setFormData({ ...formData, dateOfViolation: e.target.value })}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Ticket Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type of Issue
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={formData.ticketType}
              onChange={(e) => setFormData({ ...formData, ticketType: e.target.value as TicketType })}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="Parking Ticket (Council)">Parking Ticket (Council)</option>
              <option value="Parking Ticket (Private)">Parking Ticket (Private)</option>
              <option value="Subscription Cancellation">Subscription Cancellation</option>
              <option value="Accidental Charge">Accidental Charge</option>
              <option value="Chargeback/Refund">Chargeback/Refund</option>
              <option value="Council Property Issue">Council Property Issue</option>
              <option value="Embassy/Consulate Matter">Embassy/Consulate Matter</option>
              <option value="Credit Card Dispute">Credit Card Dispute</option>
              <option value="Credit Score Dispute">Credit Score Dispute</option>
              <option value="Police Report">Police Report</option>
              <option value="Airport Dispute">Airport Dispute</option>
              <option value="Late Delivery Refund">Late Delivery Refund</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
            <span className="text-gray-400 text-xs ml-1">
              ({formData.additionalNotes.length}/{MAX_NOTES_LENGTH})
            </span>
          </label>
          <textarea
            value={formData.additionalNotes}
            onChange={(e) => {
              if (e.target.value.length <= MAX_NOTES_LENGTH) {
                setFormData({ ...formData, additionalNotes: e.target.value });
              }
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Provide any additional context or circumstances..."
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Document
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="sr-only"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, PDF up to 10MB
              </p>
            </div>
          </div>

          {/* File Preview */}
          {preview && (
            <div className="mt-4 relative">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 rounded-lg mx-auto"
              />
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="absolute top-2 right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Processing...
            </>
          ) : (
            'Submit Dispute'
          )}
        </button>
      </form>

      {/* Response Section */}
      {response?.appealLetter && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Generated Appeal Letter</h3>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-200"
                title="Copy to clipboard"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={downloadPDF}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-200"
                title="Download PDF"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
              {response.appealLetter}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}