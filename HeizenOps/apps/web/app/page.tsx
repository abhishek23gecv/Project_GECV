import Link from 'next/link';
import { Building2, Users, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">HeizenOps</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/login" className="btn btn-secondary">
                Sign In
              </Link>
              <Link href="/register" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Enterprise SaaS Platform
            <span className="block text-primary-600">Built for Scale</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            HeizenOps provides a comprehensive multi-tenant SaaS solution with enterprise-grade 
            security, role-based access control, and seamless scalability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn btn-primary text-lg px-8 py-3">
              Start Free Trial
            </Link>
            <Link href="/demo" className="btn btn-secondary text-lg px-8 py-3">
              View Demo
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multi-Tenant Architecture</h3>
            <p className="text-gray-600">
              Secure tenant isolation with flexible role-based access control and 
              customizable permissions.
            </p>
          </div>
          
          <div className="card text-center">
            <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
            <p className="text-gray-600">
              JWT authentication, encrypted data storage, and comprehensive audit 
              logging for compliance.
            </p>
          </div>
          
          <div className="card text-center">
            <Zap className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">High Performance</h3>
            <p className="text-gray-600">
              Built with Next.js and NestJS for optimal performance, SEO, and 
              developer experience.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of companies using HeizenOps to power their SaaS applications.
          </p>
          <Link href="/register" className="btn btn-primary text-lg px-8 py-3">
            Create Your Account
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary-400" />
            <span className="ml-2 text-lg font-semibold">HeizenOps</span>
          </div>
          <p className="text-center text-gray-400 mt-4">
            © 2024 HeizenOps. Built with Next.js and NestJS.
          </p>
        </div>
      </footer>
    </div>
  );
}