import React from 'react';
import { Link } from 'react-router-dom';

export const ClubStatusPage = ({ status }) => {
    const isPending = status === 'PENDING';
    const isRejected = status === 'REJECTED';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                <div className="mb-6">
                    <span className="text-6xl">{isPending ? '⏳' : '🚫'}</span>
                </div>

                {isPending && (
                    <>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Approval Pending</h1>
                        <p className="text-gray-600 mb-6">
                            Your club registration has been received and is currently under review by the SahwiGate Directorate.
                        </p>
                        <div className="bg-blue-50 text-blue-700 p-4 rounded-lg text-sm mb-6">
                            You will receive an email notification once your club has been approved.
                        </div>
                    </>
                )}

                {isRejected && (
                    <>
                        <h1 className="text-2xl font-bold text-red-900 mb-2">Registration Rejected</h1>
                        <p className="text-gray-600 mb-6">
                            Unfortunately, your club registration could not be approved at this time.
                        </p>
                        <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm mb-6">
                            Please contact support for more information regarding this decision.
                        </div>
                    </>
                )}

                <Link to="/" className="inline-block bg-secondary-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-black transition-colors">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};
