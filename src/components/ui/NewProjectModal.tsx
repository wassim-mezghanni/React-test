import { useState } from 'react';
import { Modal } from './Modal.tsx';
import { Button } from './Button.tsx';

const PROJECT_ICONS = [
  { icon: 'analytics', label: 'Financial Analysis' },
  { icon: 'payments', label: 'Budget & Cost' },
  { icon: 'trending_up', label: 'Revenue' },
  { icon: 'gavel', label: 'Risk & Compliance' },
  { icon: 'shopping_cart', label: 'Procurement' },
  { icon: 'groups', label: 'HR & Payroll' },
  { icon: 'settings_applications', label: 'Operations' },
  { icon: 'database', label: 'Customer Data' },
  { icon: 'description', label: 'Reporting' },
  { icon: 'folder', label: 'General' },
];

export interface NewProjectData {
  name: string;
  icon: string;
}

export interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (project: NewProjectData) => void;
}

export function NewProjectModal({ open, onClose, onCreate }: NewProjectModalProps) {
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('analytics');

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate({ name: name.trim(), icon: selectedIcon });
    setName('');
    setSelectedIcon('analytics');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setSelectedIcon('analytics');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="New Project"
      footer={
        <>
          <button
            onClick={handleClose}
            className="px-6 py-2.5 rounded-lg font-label font-semibold text-on-surface border border-outline-variant hover:bg-surface-container-high transition-all"
          >
            Cancel
          </button>
          <Button onClick={handleCreate} disabled={!name.trim()}>
            Create Project
          </Button>
        </>
      }
    >
      <div className="space-y-10">
        {/* Project Name */}
        <div className="space-y-3">
          <label className="block font-label text-xs font-bold tracking-widest text-on-surface-variant uppercase">
            Project Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3.5 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
            placeholder="e.g. Q1 Financial Review"
          />
        </div>

        {/* Icon Grid */}
        <div className="space-y-5">
          <label className="block font-label text-xs font-bold tracking-widest text-on-surface-variant uppercase">
            Choose an Icon
          </label>
          <div className="grid grid-cols-5 gap-4">
            {PROJECT_ICONS.map(({ icon, label }) => {
              const isSelected = selectedIcon === icon;
              return (
                <button
                  key={icon}
                  title={label}
                  onClick={() => setSelectedIcon(icon)}
                  className={`relative w-22 h-22 flex items-center justify-center rounded-xl transition-colors ${isSelected
                    ? 'border-2 border-primary-container bg-primary-container/5 text-primary-container'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                    }`}
                >
                  <span
                    className="icon text-4xl"
                    style={isSelected ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {icon}
                  </span>
                  {isSelected && (
                    <span
                      className="absolute top-1.5 right-1.5 icon text-base bg-primary-container text-white rounded-full p-0.5"
                      style={{ fontVariationSettings: "'wght' 700" }}
                    >
                      check
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview */}
        {name.trim() && (
          <div className="p-6 border-2 border-dashed border-outline-variant/30 rounded-xl bg-surface/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-primary-container text-on-primary rounded-xl shadow-sm">
                <span
                  className="icon text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {selectedIcon}
                </span>
              </div>
              <div>
                <p className="font-headline font-bold text-lg text-on-surface tracking-tight">{name}</p>
                <p className="text-on-surface-variant text-sm">Preview of your new project</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
