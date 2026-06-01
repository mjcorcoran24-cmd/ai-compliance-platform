'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Framework {
  id: string;
  name: string;
}

export default function NewAuditPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [frameworkId, setFrameworkId] = useState('');
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/frameworks')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFrameworks(data);
          if (data.length > 0) setFrameworkId(data[0].id);
        }
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    const res = await fetch('/api/audits', {
      method: 'POST',
      body: JSON.stringify({
        name,
        frameworkId,
        auditorId: user.id,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const audit = await res.json();
      router.push(`/audits/${audit.id}`);
    } else {
      setIsSubmitting(false);
      alert('Failed to create audit');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Audit</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Audit Name
              </label>
              <input
                type="text"
                id="name"
                required
                placeholder="e.g., Q3 AI Program Review"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="framework" className="block text-sm font-medium text-gray-700">
                Compliance Framework
              </label>
              <select
                id="framework"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                value={frameworkId}
                onChange={(e) => setFrameworkId(e.target.value)}
              >
                {frameworks.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {isSubmitting ? 'Creating...' : 'Start Audit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
