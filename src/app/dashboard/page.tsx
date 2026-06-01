'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Plus, ClipboardList, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

interface Audit {
  id: string;
  name: string;
  framework: { name: string };
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [audits, setAudits] = useState<Audit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/audits')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAudits(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <ClipboardList className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI Auditor</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user?.name} ({user?.role})
              </span>
              <button
                onClick={logout}
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Audits</h1>
          <Link
            href="/audits/new"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" />
            New Audit
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading audits...</div>
        ) : audits.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No audits</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new AI program audit.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {audits.map((audit) => (
              <Link
                key={audit.id}
                href={`/audits/${audit.id}`}
                className="block bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{audit.name}</h3>
                  {audit.status === 'COMPLETED' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-amber-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{audit.framework.name}</p>
                <p className="text-xs text-gray-400">
                  Created on {new Date(audit.createdAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
