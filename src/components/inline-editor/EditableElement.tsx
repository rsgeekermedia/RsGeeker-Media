import React from 'react';
import { Pencil, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InlineFieldTarget } from '../../types';

interface EditableElementProps {
  target: InlineFieldTarget;
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'span' | 'section';
  inlineBadgePosition?: 'top-left' | 'top-right' | 'bottom-right' | 'center';
}

export const EditableElement: React.FC<EditableElementProps> = ({
  target,
  children,
  className = '',
  as: Component = 'div',
  inlineBadgePosition = 'top-right'
}) => {
  const { isInlineEditorActive, currentAdminUser, openInlineEditorForField } = useApp();

  // Only enable interactive editing if Inline Editor is active AND user is Super Admin
  const isSuperAdmin = currentAdminUser?.isSuperAdmin || currentAdminUser?.username?.toLowerCase() === 'admingeeker';
  const isEditingEnabled = isInlineEditorActive && isSuperAdmin;

  if (!isEditingEnabled) {
    return <Component className={className}>{children}</Component>;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openInlineEditorForField(target);
  };

  const getBadgePosition = () => {
    switch (inlineBadgePosition) {
      case 'top-left':
        return 'top-1 left-1';
      case 'bottom-right':
        return 'bottom-1 right-1';
      case 'center':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      case 'top-right':
      default:
        return 'top-1 right-1';
    }
  };

  return (
    <Component
      onClick={handleClick}
      className={`group/inline-edit relative cursor-pointer transition-all duration-200 rounded-lg hover:outline-2 hover:outline-dashed hover:outline-cyan-400 hover:outline-offset-2 hover:bg-cyan-500/10 ${className}`}
      title={`Click to edit ${target.label}`}
    >
      {children}

      {/* Floating Editable Indicator Badge on Hover */}
      <span
        className={`absolute z-30 opacity-0 group-hover/inline-edit:opacity-100 transition-opacity duration-200 pointer-events-none px-2 py-1 rounded-md text-[10px] font-bold text-slate-950 bg-cyan-400 shadow-lg shadow-cyan-500/40 flex items-center gap-1 border border-cyan-300 ${getBadgePosition()}`}
      >
        {target.type === 'image' ? (
          <ImageIcon className="w-3 h-3 text-slate-950" />
        ) : (
          <Pencil className="w-3 h-3 text-slate-950" />
        )}
        <span>Edit: {target.label}</span>
      </span>

      {/* Subtle corner indicator dot so the admin knows it is editable */}
      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 border border-slate-900 shadow-sm animate-pulse pointer-events-none" />
    </Component>
  );
};
