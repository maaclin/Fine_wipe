import React from "react";
import { AuthCheck } from "../components/AuthCheck";
import { DisputeForm } from "../components/DisputeForm";

export function DashboardPage() {
  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit a Dispute</h1>
            <p className="text-gray-600 mb-8">
              Fill out the form below to generate your appeal letter. We'll help you craft a
              professional response to contest your ticket.
            </p>
            <DisputeForm />
          </div>
        </div>
      </div>
    </AuthCheck>
  );
}