'use client';

import Link from 'next/link';
import { 
  ShieldCheck, 
  BarChart3, 
  Users, 
  FileText, 
  ChevronRight, 
  Lock,
  Globe,
  Zap
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                AI Auditor
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-indigo-600">
                Sign in
              </Link>
              <Link 
                href="/login" 
                className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-8">
            <Zap className="h-4 w-4" />
            <span>Introducing NIST & ISO 42001 Readiness</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
            Master AI Compliance <br />
            <span className="text-indigo-600">Without the Chaos</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            The enterprise-ready platform for auditors and consultants to review AI programs against global standards like NIST AI RMF and ISO 42001.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/login" 
              className="rounded-lg bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:bg-indigo-500 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Start Your First Audit
              <ChevronRight className="h-5 w-5" />
            </Link>
            <button className="rounded-lg bg-white px-8 py-4 text-lg font-bold text-gray-900 border border-gray-200 shadow-sm hover:bg-gray-50 transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 blur-3xl opacity-20">
          <div className="h-96 w-96 rounded-full bg-indigo-500" />
        </div>
        <div className="absolute bottom-0 right-0 -z-10 blur-3xl opacity-20">
          <div className="h-96 w-96 rounded-full bg-violet-500" />
        </div>
      </section>

      {/* Stats/Proof */}
      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900">2+</div>
              <div className="text-sm text-gray-500 font-medium">Global Frameworks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-500 font-medium">Compliance Mapping</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-500 font-medium">Spreadsheets Needed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900">PDF</div>
              <div className="text-sm text-gray-500 font-medium">Board-Ready Export</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Everything you need for AI Governance</h2>
          <p className="text-lg text-gray-600">Designed by auditors, for auditors. Fast, secure, and precise.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow bg-white">
            <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-6">
              <Globe className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Global Standards</h3>
            <p className="text-gray-600 leading-relaxed">
              Full hierarchical structures of NIST AI RMF and ISO/IEC 42001:2023 pre-loaded and ready for use.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow bg-white">
            <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Role-Based Access</h3>
            <p className="text-gray-600 leading-relaxed">
              Separate portals for Admins, Auditors, and Clients to collaborate securely on sensitive compliance data.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow bg-white">
            <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-6">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Gap Analysis</h3>
            <p className="text-gray-600 leading-relaxed">
              Instant visual reports and compliance scoring to identify vulnerabilities in your AI program.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow bg-white">
            <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-6">
              <FileText className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Evidence Vault</h3>
            <p className="text-gray-600 leading-relaxed">
              Link internal artifacts directly to controls. Maintain a robust, audit-ready evidence trail.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow bg-white">
            <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-6">
              <Lock className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Local Control</h3>
            <p className="text-gray-600 leading-relaxed">
              Maintain data sovereignty with local storage options. Perfect for high-privacy AI audits.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow bg-white text-center flex flex-col items-center justify-center border-dashed border-2 border-indigo-100">
            <p className="text-indigo-600 font-bold mb-2">Coming Soon</p>
            <h3 className="text-xl font-bold text-gray-900">EU AI Act Readiness</h3>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-indigo-400" />
              <span className="text-2xl font-bold text-white">AI Auditor</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2026 AI Auditor Platform. Empowering trustworthy AI.
            </div>
            <div className="flex gap-6">
              <Link href="/login" className="hover:text-indigo-400 transition-colors">Platform</Link>
              <button className="hover:text-indigo-400 transition-colors">Resources</button>
              <button className="hover:text-indigo-400 transition-colors">Legal</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
