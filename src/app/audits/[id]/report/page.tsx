'use client';

import { useState, useEffect, use } from 'react';
import { 
  ArrowLeft, 
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  MinusCircle,
  Circle
} from 'lucide-react';
import Link from 'next/link';

interface Control {
  id: string;
  code: string;
  title: string;
}

interface Entry {
  id: string;
  controlId: string;
  status: string;
  comments: string;
}

interface Audit {
  id: string;
  name: string;
  framework: {
    name: string;
    controls: Control[];
  };
  entries: Entry[];
}

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [audit, setAudit] = useState<Audit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/audits/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAudit(data);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <div className="p-8">Generating report...</div>;
  if (!audit) return <div className="p-8">Audit not found</div>;

  const totalControls = audit.framework.controls.length;
  const statusCounts = audit.entries.reduce((acc: Record<string, number>, entry) => {
    acc[entry.status] = (acc[entry.status] || 0) + 1;
    return acc;
  }, {});

  const compliantCount = statusCounts['COMPLIANT'] || 0;
  const complianceScore = totalControls > 0 ? Math.round((compliantCount / totalControls) * 100) : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLIANT': return 'text-green-600 bg-green-50 border-green-200';
      case 'NON_COMPLIANT': return 'text-red-600 bg-red-50 border-red-200';
      case 'PARTIAL': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'NOT_APPLICABLE': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-400 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLIANT': return <CheckCircle className="h-4 w-4" />;
      case 'NON_COMPLIANT': return <XCircle className="h-4 w-4" />;
      case 'PARTIAL': return <AlertCircle className="h-4 w-4" />;
      case 'NOT_APPLICABLE': return <MinusCircle className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center mb-8">
          <Link href={`/audits/${id}`} className="flex items-center text-gray-500 hover:text-gray-700">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Audit
          </Link>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-sm transition-colors"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </button>
        </header>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden print:shadow-none print:border-0">
          {/* Report Header */}
          <div className="bg-indigo-900 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Audit Report: {audit.name}</h1>
            <p className="text-indigo-200 flex items-center gap-2">
              Framework: {audit.framework.name} • Generated on {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8 bg-gray-50 border-b">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-semibold">Compliance Score</p>
              <p className="text-3xl font-bold text-indigo-600">{complianceScore}%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-semibold">Compliant</p>
              <p className="text-3xl font-bold text-green-600">{compliantCount}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-semibold">Non-Compliant</p>
              <p className="text-3xl font-bold text-red-600">{statusCounts['NON_COMPLIANT'] || 0}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase font-semibold">Pending Review</p>
              <p className="text-3xl font-bold text-amber-600">{totalControls - (audit.entries.length)}</p>
            </div>
          </div>

          {/* Gap Analysis Table */}
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Gap Analysis & Findings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-4 px-2 font-bold text-gray-700 w-1/4">Control</th>
                    <th className="py-4 px-2 font-bold text-gray-700 w-1/6">Status</th>
                    <th className="py-4 px-2 font-bold text-gray-700">Findings & Recommendations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {audit.framework.controls.map((ctrl) => {
                    const entry = audit.entries.find((e) => e.controlId === ctrl.id);
                    const status = entry?.status || 'NOT_STARTED';
                    
                    return (
                      <tr key={ctrl.id} className="hover:bg-gray-50">
                        <td className="py-4 px-2">
                          <div className="font-semibold text-gray-900">{ctrl.code}</div>
                          <div className="text-sm text-gray-500">{ctrl.title}</div>
                        </td>
                        <td className="py-4 px-2">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(status)}`}>
                            {getStatusIcon(status)}
                            {status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-sm text-gray-600 italic">
                          {entry?.comments || 'No comments provided.'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
