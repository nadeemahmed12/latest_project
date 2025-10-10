import React, { useState, useEffect } from "react";

const Banner = () => {
  const [superDistributors, setSuperDistributors] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [dealers, setDealers] = useState([]);

  const [selectedSuper, setSelectedSuper] = useState("");
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [selectedDealer, setSelectedDealer] = useState("");

  const [loading, setLoading] = useState(false);

  // Fetch all super distributors on mount
  useEffect(() => {
    setLoading(true);
    fetch("/api/super-distributors")
      .then((res) => res.json())
      .then((data) => {
        setSuperDistributors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch distributors based on super distributor
  useEffect(() => {
    if (!selectedSuper) {
      setDistributors([]);
      setSelectedDistributor("");
      setDealers([]);
      setSelectedDealer("");
      return;
    }

    setLoading(true);
    fetch(`/api/distributors?superId=${selectedSuper}`)
      .then((res) => res.json())
      .then((data) => {
        setDistributors(data);
        setLoading(false);
        setSelectedDistributor("");
        setDealers([]);
        setSelectedDealer("");
      })
      .catch(() => setLoading(false));
  }, [selectedSuper]);

  // Fetch dealers based on distributor
  useEffect(() => {
    if (!selectedDistributor) {
      setDealers([]);
      setSelectedDealer("");
      return;
    }

    setLoading(true);
    fetch(`/api/dealers?distributorId=${selectedDistributor}`)
      .then((res) => res.json())
      .then((data) => {
        setDealers(data);
        setLoading(false);
        setSelectedDealer("");
      })
      .catch(() => setLoading(false));
  }, [selectedDistributor]);

  // Upload logic (same as before)
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Select a file first!");

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("banner", selectedFile);
      formData.append("superId", selectedSuper);
      formData.append("distributorId", selectedDistributor);
      formData.append("dealerId", selectedDealer);

      // Example API call
      // await fetch('/api/upload-banner', { method: 'POST', body: formData });

      await new Promise((r) => setTimeout(r, 1500));
      alert("Banner uploaded successfully!");
      setSelectedFile(null);
      setPreviewUrl("");
    } catch (err) {
      alert("Failed to upload banner!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Dropdowns */}
      <div className="mb-6 space-y-4">
        {/* Super Distributor */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select Super Distributor:
          </label>
          <select
            value={selectedSuper}
            onChange={(e) => setSelectedSuper(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select Super Distributor --</option>
            {superDistributors.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Distributor */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select Distributor:
          </label>
          <select
            value={selectedDistributor}
            onChange={(e) => setSelectedDistributor(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={!selectedSuper || loading}
          >
            <option value="">-- Select Distributor --</option>
            {distributors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Dealer */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select Dealer:
          </label>
          <select
            value={selectedDealer}
            onChange={(e) => setSelectedDealer(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={!selectedDistributor || loading}
          >
            <option value="">-- Select Dealer --</option>
            {dealers.map((dl) => (
              <option key={dl.id} value={dl.id}>
                {dl.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Upload Section (same as before) */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Banner Upload
        </h2>
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600 mb-4">
            Recommended image size: 1920x1080
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            {previewUrl ? (
              <div className="space-y-4">
                <img
                  src={previewUrl}
                  alt="Banner preview"
                  className="w-full h-40 object-contain rounded-lg"
                />
                <div className="text-sm text-gray-600">
                  <p>Selected file: {selectedFile?.name}</p>
                  <p>
                    Size: {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl("");
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Remove
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    {isUploading ? "Uploading..." : "Upload Banner"}
                  </button>
                </div>
              </div>
            ) : (
              <label htmlFor="banner-upload" className="cursor-pointer">
                <span className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                  SELECT IMAGE
                </span>
                <input
                  id="banner-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
