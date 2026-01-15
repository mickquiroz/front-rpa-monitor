import { useState, Suspense, lazy } from 'react';
import { LogProvider, useLogs } from './context/LogContext';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/Layout';
// import { Dashboard } from './pages/Dashboard';
// import { LogsPage } from './pages/LogsPage';
// import { ClientDetail } from './pages/ClientDetail';
import type { NavigationParams } from './types';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const LogsPage = lazy(() => import('./pages/LogsPage').then(module => ({ default: module.LogsPage })));
const ClientDetail = lazy(() => import('./pages/ClientDetail').then(module => ({ default: module.ClientDetail })));

// Loading fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin text-blue-600"></div>
        <p className="text-slate-400 text-sm">Loading module...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const { loading, error } = useLogs();
  const [activePage, setActivePage] = useState('dashboard');
  const [pageParams, setPageParams] = useState<NavigationParams>({});

  const handleNavigate = (page: string, params: NavigationParams = {}) => {
    setActivePage(page);
    setPageParams(params);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin text-blue-600"></div>
          <p className="text-slate-500 font-medium">Loading RPA Logs Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="p-6 bg-white rounded-lg shadow-lg border-l-4 border-red-500 max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Layout activeTab={activePage} onNavigate={(page) => handleNavigate(page)}>
      <Suspense fallback={<PageLoader />}>
        {activePage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
        {activePage === 'logs' && <LogsPage initialFilters={pageParams} />}
        {activePage === 'client-detail' && <ClientDetail clientName={pageParams.client || ''} onBack={() => handleNavigate('dashboard')} />}
      </Suspense>
      {activePage === 'analytics' && <div className="p-10 text-center text-slate-500">Analytics Module Coming Soon</div>}
      {activePage === 'config' && <div className="p-10 text-center text-slate-500">Configuration Module Coming Soon</div>}
    </Layout>
  );
}

function App() {
  return (
    <ToastProvider>
      <LogProvider>
        <AppContent />
      </LogProvider>
    </ToastProvider>
  );
}

export default App;
