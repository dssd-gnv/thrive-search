import React from 'react';

interface InfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Modal popup displaying project information and partner logos
// Opens when user clicks the info button in the header
export const InfoPopup: React.FC<InfoPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
      />

      {/* Centered modal dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header with close button */}
          <div className="bg-blue-600 dark:bg-blue-800 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">About This Project</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-1"
              aria-label="Close dialog"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content sections */}
          <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
            {/* Partner logos section */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <p className="text-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                In Partnership With:
              </p>
              <div className="flex items-center justify-center gap-8 flex-wrap">
                {/* Central Florida Foundation logo */}
                <div className="text-center">
                  <img
                    src="/logo_cff.png"
                    alt="Central Florida Foundation"
                    className="w-20 h-20 object-contain mb-2 mx-auto"
                    onClick={() => window.open('https://cffound.org/', '_blank')}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                {/* Florida Community Innovation logo */}
                <div className="text-center">
                  <img
                    src="/logo_fci.svg"
                    alt="Florida Community Innovation"
                    className="w-20 h-20 object-contain mb-2 mx-auto"
                    onClick={() => window.open('https://floridainnovation.org/', '_blank')}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                {/* Data Science for Sustainable Development logo */}
                <div className="text-center">
                  <img
                    src="/logo_dssd.svg"
                    alt="Data Science for Sustainable Development"
                    className="w-20 h-20 object-contain mb-2 mx-auto"
                    onClick={() => window.open('https://dssdglobal.org/', '_blank')}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>

            {/* About THRIVE Central Florida */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                About Thrive Central Florida
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A collaboration with the <b className="font-bold text-blue-600">Central Florida Foundation</b> that seeks to bring 
                nonprofits, policymakers, business leaders, educators, community members, and experts together to 
                make real change.
              </p>
            </div>

            {/* Research background */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                About the Database
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <b className="font-bold text-blue-600">Florida Community Innovation's</b> policy team reviewed hundreds of in-depth policy papers, case studies, 
                and documents to summarize the best tactics with which to equip our changemaking partners across 
                Central Florida.
                <br />
                <b className="font-bold text-blue-600">Data Science for Sustainable Development's</b> team built this searchable database to make it easy for 
                anyone to find the information they need to create positive change in Central Florida.
              </p>
            </div>

            {/* Call to action */}
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <span className="font-semibold">Explore our research:</span> Search this database 
                to discover research papers, policy recommendations, and best practices for creating positive change 
                in Central Florida.
              </p>
            </div>
          </div>

          {/* Footer with close button */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
