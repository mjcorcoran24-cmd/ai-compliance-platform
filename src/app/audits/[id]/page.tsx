'use client';

import { useState, useEffect, use } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  MinusCircle,
  FileText,
  MessageSquare,
  BarChart3,
  ClipboardList
} from 'lucide-react';
import Link from 'next/link';

interface Control {
  id: string;
  code: string;
  title: string;
  description: string;
  parentId: string | null;
}

interface Evidence {
  id: string;
  content: string;
  type: string;
}

interface Entry {
  id: string;
  controlId: string;
  status: string;
  comments: string;
  evidence: Evidence[];
}

interface Audit {
  id: string;
  name: string;
  framework: {
    name: string;
    controls: Control[];
  };
  entries: Entry[];
  status: string;
}

export default function AuditDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const [audit, setAudit] = useState<Audit | null>(null);
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);
  const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [status, setStatus] = useState('NOT_STARTED');
  const [comments, setComments] = useState('');
  const [newEvidence, setNewEvidence] = useState('');

  useEffect(() => {
    fetch(`/api/audits/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAudit(data);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (selectedControl && audit) {
      const entry = audit.entries.find((e) => e.controlId === selectedControl.id);
      setStatus(entry?.status || 'NOT_STARTED');
      setComments(entry?.comments || '');
      setNewEvidence('');
    }
  }, [selectedControl, audit]);

  const toggleParent = (parentId: string) => {
    setExpandedParents((prev) => ({ ...prev, [parentId]: !prev[parentId] }));
  };

  const handleUpdateEntry = async () => {
    if (!selectedControl || !audit) return;

    const res = await fetch('/api/entries', {
      method: 'POST',
      body: JSON.stringify({
        auditId: audit.id,
        controlId: selectedControl.id,
        status,
        comments,
        evidence: newEvidence ? { content: newEvidence, type: 'LINK' } : null,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      // Refresh audit data
      const updatedAudit = await (await fetch(`/api/audits/${id}`)).json();
      setAudit(updatedAudit);
      setNewEvidence('');
      alert('Updated successfully');
    }
  };

  if (isLoading) return <div className="p-8">Loading audit...</div>;
  if (!audit) return <div className="p-8">Audit not found</div>;

  const parentControls = audit.framework.controls.filter((c) => !c.parentId);
  const getChildren = (parentId: string) => audit.framework.controls.filter((c) => c.parentId === parentId);
  const getEntry = (controlId: string) => audit.entries.find((e) => e.controlId === controlId);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLIANT': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'NON_COMPLIANT': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'PARTIAL': return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'NOT_APPLICABLE': return <MinusCircle className="h-4 w-4 text-gray-400" />;
      default: return <div className="h-4 w-4 rounded-full border border-gray-300" />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{audit.name}</h1>
            <p className="text-sm text-gray-500">{audit.framework.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
           <Link 
            href={`/audits/${id}/report`}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50"
           >
            <BarChart3 className="h-4 w-4" />
            View Report
           </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Control List */}
        <aside className="w-1/3 bg-white border-r overflow-y-auto">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Controls</h2>
          </div>
          <div className="divide-y">
            {parentControls.map((parent) => (
              <div key={parent.id}>
                <button
                  onClick={() => toggleParent(parent.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 text-left"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(getEntry(parent.id)?.status || 'NOT_STARTED')}
                    <span className="font-medium text-gray-900">{parent.code}: {parent.title}</span>
                  </div>
                  {getChildren(parent.id).length > 0 && (
                    expandedParents[parent.id] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {expandedParents[parent.id] && (
                  <div className="bg-gray-50 pl-8 divide-y">
                    {getChildren(parent.id).map((child) => (
                      <button
                        key={child.id}
                        onClick={() => setSelectedControl(child)}
                        className={`w-full flex items-center gap-3 p-3 text-sm text-left hover:bg-gray-100 ${selectedControl?.id === child.id ? 'bg-indigo-50 border-r-4 border-indigo-500' : ''}`}
                      >
                        {getStatusIcon(getEntry(child.id)?.status || 'NOT_STARTED')}
                        <span>{child.code}: {child.title}</span>
                      </button>
                    ))}
                  </div>
                )}
                
                {getChildren(parent.id).length === 0 && (
                  <button
                    onClick={() => setSelectedControl(parent)}
                    className="hidden" // Just for mapping consistency, handled by the main button above if no children
                  />
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content - Control Details & Form */}
        <main className="flex-1 overflow-y-auto p-8">
          {selectedControl ? (
            <div className="max-w-3xl mx-auto space-y-8">
              <section>
                <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-2 uppercase">
                  <span>{selectedControl.code}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedControl.title}</h2>
                <div className="bg-white p-6 rounded-lg border shadow-sm text-gray-700">
                  {selectedControl.description || "No detailed description provided for this control."}
                </div>
              </section>

              <hr />

              <section className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Compliance Status</label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {['NOT_STARTED', 'COMPLIANT', 'PARTIAL', 'NON_COMPLIANT', 'NOT_APPLICABLE'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`px-4 py-2 text-sm font-medium rounded-md border ${
                          status === s 
                            ? 'bg-indigo-600 text-white border-indigo-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {s.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Auditor Comments
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-md border-gray-300 shadow-sm border p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your observations and findings..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Evidence & Links
                  </label>
                  <div className="space-y-4">
                    {getEntry(selectedControl.id)?.evidence.map((ev) => (
                      <div key={ev.id} className="flex items-center gap-2 text-sm text-indigo-600 bg-indigo-50 p-2 rounded">
                        <FileText className="h-4 w-4" />
                        <a href={ev.content} target="_blank" rel="noopener noreferrer">{ev.content}</a>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 rounded-md border-gray-300 shadow-sm border p-2 text-sm"
                        placeholder="Paste link to evidence (SharePoint, Jira, etc.)"
                        value={newEvidence}
                        onChange={(e) => setNewEvidence(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleUpdateEntry}
                    className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                  >
                    Save Progress
                  </button>
                </div>
              </section>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 flex-col gap-4">
              <ClipboardList className="h-16 w-16 text-gray-200" />
              <p className="text-lg">Select a control from the sidebar to begin auditing.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
