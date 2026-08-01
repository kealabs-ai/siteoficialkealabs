import React, { useState } from 'react';
import { LayoutDashboard, FileText, Users, Bot, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeItem?: string;
  onNavigate?: (item: string) => void;
}

const menuItems = [
  { id: 'gestao',     label: 'Gestão',      icon: LayoutDashboard },
  { id: 'orcamentos', label: 'Orçamentos',  icon: FileText },
  { id: 'prospect',   label: 'Prospect',    icon: Users },
  { id: 'agent-kea',  label: 'Agent Kea',   icon: Bot },
];

const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'gestao', onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex flex-col h-screen bg-[#0A2540] transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-56'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-black text-sm">K</span>
        </div>
        {!collapsed && (
          <span className="text-white font-black text-lg tracking-tight">
            KEA<span className="font-light">LABS</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeItem === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate?.(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                ${isActive
                  ? 'bg-[#FF6B00] text-white shadow-lg shadow-orange-900/30'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
            >
              <Icon
                size={18}
                className={`flex-shrink-0 transition-colors ${
                  isActive ? 'text-white' : 'text-white/50 group-hover:text-[#00B4D8]'
                }`}
              />
              {!collapsed && <span>{label}</span>}

              {/* Magic UI: active indicator bar */}
              {isActive && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-[#0A2540] border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-[#00B4D8] transition-all"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Bottom glow accent — Magic UI touch */}
      <div className="h-px mx-4 mb-4 bg-gradient-to-r from-transparent via-[#00B4D8]/40 to-transparent" />
    </aside>
  );
};

export default Sidebar;
