import { useState } from 'react';
const Logout = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  const handleLogout = () => {
    localStorage.removeItem();
    sessionStorage.clear();
    
    // Redirect to login
    navigate('/');
  };

  return (
    <>
      {/* Logout Button in Sidebar */}
      <li 
        className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer transition-colors"
        onClick={() => setShowLogoutModal(true)}
      >
        Logout
      </li>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure want to logout?
            </h3>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                No
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;