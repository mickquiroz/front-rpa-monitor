import { memo } from 'react';
import { Drawer, Badge } from './ui';
import type { RPALog } from '../types';
import { AlertTriangle, Clock, Server, Bot, User, FileCode, MonitorDot } from 'lucide-react';

interface IncidentDetailsDrawerProps {
  incident: RPALog | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Get severity level from log level
 */
function getSeverity(level: RPALog['level']): {
  label: string;
  variant: 'error' | 'warning' | 'info' | 'neutral';
} {
  switch (level) {
    case 'Fatal':
      return { label: 'Critical', variant: 'error' };
    case 'Error':
      return { label: 'High', variant: 'error' };
    case 'Warning':
      return { label: 'Medium', variant: 'warning' };
    case 'Trace':
    case 'Info':
    default:
      return { label: 'Low', variant: 'info' };
  }
}

/**
 * Get badge variant for log level
 */
function getLevelVariant(level: RPALog['level']): 'error' | 'warning' | 'info' | 'neutral' {
  switch (level) {
    case 'Fatal':
    case 'Error':
      return 'error';
    case 'Warning':
      return 'warning';
    case 'Info':
      return 'info';
    case 'Trace':
    default:
      return 'neutral';
  }
}

/**
 * IncidentDetailsDrawer - Displays detailed information about a selected incident
 *
 * Shows comprehensive incident metadata including:
 * - Severity level
 * - Timestamp
 * - Client and robot information
 * - Process and hostname details
 * - Full error message
 */
export const IncidentDetailsDrawer = memo(function IncidentDetailsDrawer({
  incident,
  isOpen,
  onClose,
}: IncidentDetailsDrawerProps) {
  if (!incident) return null;

  const severity = getSeverity(incident.level);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Incident Details">
      <div className="space-y-space-4">
        {/* Status Badges */}
        <div className="flex items-center gap-2">
          <Badge variant={severity.variant} size="lg" dot>
            {severity.label} Severity
          </Badge>
          <Badge variant={getLevelVariant(incident.level)} size="lg">
            {incident.level}
          </Badge>
        </div>

        {/* Message Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-md p-space-3">
          <div className="flex items-start gap-2 mb-2">
            <AlertTriangle
              size={18}
              className="text-error-dark mt-0.5 flex-shrink-0"
            />
            <h3 className="text-sm font-semibold text-slate-900">Error Message</h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-mono whitespace-pre-wrap break-words">
            {incident.message}
          </p>
        </div>

        {/* Incident Metadata */}
        <div className="space-y-space-3">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
            Incident Information
          </h3>

          <div className="space-y-space-2">
            {/* Timestamp */}
            <InfoRow
              icon={Clock}
              label="Timestamp"
              value={incident.time.toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'long',
              })}
            />

            {/* Client */}
            <InfoRow
              icon={User}
              label="Client"
              value={incident.client}
            />

            {/* Robot Name */}
            <InfoRow
              icon={Bot}
              label="Robot Name"
              value={incident.robotName}
            />

            {/* Process */}
            <InfoRow
              icon={FileCode}
              label="Process"
              value={incident.process}
            />

            {/* Software */}
            <InfoRow
              icon={MonitorDot}
              label="Software"
              value={incident.software}
            />

            {/* Hostname */}
            <InfoRow
              icon={Server}
              label="Hostname"
              value={incident.hostname}
            />

            {/* Host Identity */}
            <InfoRow
              icon={Server}
              label="Host Identity"
              value={incident.hostIdentity}
            />
          </div>
        </div>

        {/* Additional Details */}
        <div className="border-t border-slate-200 pt-space-3">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-space-2">
            Technical Details
          </h3>
          <dl className="space-y-2">
            <div className="flex justify-between text-sm">
              <dt className="text-slate-500 font-medium">Incident ID</dt>
              <dd className="text-slate-900 font-mono text-xs">{incident.id}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Drawer>
  );
});

/**
 * InfoRow - Displays a labeled information row with an icon
 */
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-2 px-3 rounded hover:bg-slate-50 transition-colors">
      <Icon size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">
          {label}
        </dt>
        <dd className="text-sm text-slate-900 break-words">{value}</dd>
      </div>
    </div>
  );
}
