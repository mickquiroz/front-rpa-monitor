/**
 * DESIGN TOKENS USAGE EXAMPLES
 *
 * This file demonstrates how to use the design tokens in real components.
 * Copy and adapt these patterns for your RPA monitoring dashboard.
 */

// ============================================
// DASHBOARD METRICS CARD
// ============================================
export const MetricsCard = ({ title, value, change, status }) => {
  return (
    <div className="card space-y-space-2">
      <h3 className="text-sm font-medium text-slate-600">{title}</h3>
      <div className="metric-large">{value}</div>
      {change && (
        <div className="flex items-center gap-space-1">
          <span className={`badge-${status}`}>{change}</span>
          <span className="text-xs text-slate-500">vs last period</span>
        </div>
      )}
    </div>
  );
};

// Usage:
// <MetricsCard
//   title="Active Robots"
//   value="24"
//   change="+3"
//   status="success"
// />


// ============================================
// STATUS TABLE
// ============================================
export const StatusTable = ({ data }) => {
  return (
    <div className="card overflow-hidden p-0">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-space-2 py-2 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Robot Name
              </th>
              <th className="px-space-2 py-2 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-space-2 py-2 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                Tasks Completed
              </th>
              <th className="px-space-2 py-2 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                Uptime
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors duration-fast">
                <td className="px-space-2 py-space-2 text-sm font-medium text-slate-900">
                  {row.name}
                </td>
                <td className="px-space-2 py-space-2">
                  <span className={`badge-${row.statusColor}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-space-2 py-space-2 text-sm text-right tabular-nums">
                  {row.tasksCompleted.toLocaleString()}
                </td>
                <td className="px-space-2 py-space-2 text-sm text-right tabular-nums">
                  {row.uptime}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Usage:
// <StatusTable data={[
//   { id: 1, name: 'Robot-01', status: 'Running', statusColor: 'success', tasksCompleted: 1234, uptime: 99.8 },
//   { id: 2, name: 'Robot-02', status: 'Failed', statusColor: 'error', tasksCompleted: 567, uptime: 87.3 },
// ]} />


// ============================================
// FORM WITH VALIDATION
// ============================================
export const RobotConfigForm = ({ onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-space-4">
      <div className="space-y-space-3">
        <div>
          <label
            htmlFor="robot-name"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Robot Name
          </label>
          <input
            id="robot-name"
            type="text"
            className="input"
            placeholder="e.g., Robot-01"
          />
        </div>

        <div>
          <label
            htmlFor="robot-type"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Robot Type
          </label>
          <select id="robot-type" className="input">
            <option>Select type...</option>
            <option>Data Entry</option>
            <option>Report Generator</option>
            <option>Email Processor</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="max-concurrent"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Max Concurrent Tasks
          </label>
          <input
            id="max-concurrent"
            type="number"
            className="input tabular-nums"
            placeholder="5"
          />
        </div>
      </div>

      <div className="flex gap-space-2 pt-space-2 border-t border-slate-200">
        <button type="submit" className="btn-primary">
          Save Configuration
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="button" className="btn-ghost ml-auto">
          Reset to Defaults
        </button>
      </div>
    </form>
  );
};


// ============================================
// ALERT BANNER
// ============================================
export const AlertBanner = ({ type = 'info', title, message, onDismiss }) => {
  const styles = {
    success: 'bg-success-light border-success text-success-dark',
    warning: 'bg-warning-light border-warning text-warning-dark',
    error: 'bg-error-light border-error text-error-dark',
    info: 'bg-info-light border-info text-info-dark',
  };

  return (
    <div className={`rounded-md border-l-4 p-space-3 ${styles[type]}`}>
      <div className="flex items-start gap-space-2">
        <div className="flex-1">
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-sm mt-1 opacity-90">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-sm font-medium hover:opacity-70 transition-opacity"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
};

// Usage:
// <AlertBanner
//   type="warning"
//   title="Robot Offline"
//   message="Robot-03 has been offline for 15 minutes."
//   onDismiss={() => console.log('dismissed')}
// />


// ============================================
// STAT GRID LAYOUT
// ============================================
export const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-3">
      {stats.map((stat, index) => (
        <MetricsCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          status={stat.status}
        />
      ))}
    </div>
  );
};

// Usage:
// <StatsGrid stats={[
//   { title: 'Active Robots', value: '24', change: '+3', status: 'success' },
//   { title: 'Tasks Today', value: '1,847', change: '+127', status: 'success' },
//   { title: 'Failed Tasks', value: '3', change: '-2', status: 'error' },
//   { title: 'Avg Response Time', value: '1.2s', change: '-0.3s', status: 'success' },
// ]} />


// ============================================
// PAGE HEADER
// ============================================
export const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="flex items-center justify-between pb-space-4 border-b border-slate-200">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
        )}
      </div>
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
};

// Usage:
// <PageHeader
//   title="Robot Dashboard"
//   subtitle="Monitor and manage your RPA fleet"
//   action={<button className="btn-primary">Add Robot</button>}
// />


// ============================================
// LOADING SKELETON
// ============================================
export const LoadingSkeleton = () => {
  return (
    <div className="card space-y-space-3 animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      <div className="h-8 bg-slate-200 rounded w-1/2"></div>
      <div className="h-3 bg-slate-200 rounded w-3/4"></div>
    </div>
  );
};


// ============================================
// MODAL DIALOG
// ============================================
export const ModalDialog = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-space-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-space-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex gap-space-2 p-space-4 border-t border-slate-200 bg-slate-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Usage:
// <ModalDialog
//   isOpen={isOpen}
//   onClose={() => setIsOpen(false)}
//   title="Confirm Action"
//   footer={
//     <>
//       <button className="btn-primary">Confirm</button>
//       <button className="btn-secondary">Cancel</button>
//     </>
//   }
// >
//   <p className="text-sm text-slate-600">
//     Are you sure you want to restart Robot-01?
//   </p>
// </ModalDialog>


// ============================================
// TABS NAVIGATION
// ============================================
export const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="border-b border-slate-200">
      <nav className="flex gap-space-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              px-space-2 py-2 text-sm font-medium border-b-2 transition-colors duration-fast
              ${activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }
            `}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 badge-neutral tabular-nums">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

// Usage:
// <Tabs
//   tabs={[
//     { id: 'all', label: 'All Robots', count: 24 },
//     { id: 'active', label: 'Active', count: 18 },
//     { id: 'failed', label: 'Failed', count: 3 },
//   ]}
//   activeTab={activeTab}
//   onChange={setActiveTab}
// />
