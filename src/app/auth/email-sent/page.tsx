"use client";

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

export default function EmailSentPage() {
    const router = useRouter();
    const query = useSearchParams();
    const emailParam = query.get("email");
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Get the email from query parameter
        if (emailParam) {
        setEmail(emailParam as string);
        }
    }, [emailParam]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Check Your Email</h2>
            <p className="text-gray-700 text-center">
            A sign-in link has been sent to your email address:
            </p>
            <p className="text-blue-600 font-medium text-center my-2">{email}</p>
            <p className="text-gray-600 text-center">
            Please check your inbox and click the link to sign in.
            </p>
            <button
            onClick={() => router.push("/")}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
            >
            Go Back to Home
            </button>
        </div>
        </div>
    );
};

