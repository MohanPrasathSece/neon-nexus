import { ReactNode } from "react";

interface MacBrowserTabProps {
  id?: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function MacBrowserTab({ id, title, icon, children }: MacBrowserTabProps) {
  return (
    <div id={id} className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-md overflow-hidden shadow-2xl transition-all duration-300 hover:border-border hover:shadow-neon-blue/10">
      {/* Mac-style title bar */}
      <div className="bg-background/80 border-b border-border/50 px-4 py-3 flex items-center gap-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        
        <div className="flex-1 flex justify-center">
          <div className="bg-background/50 border border-border/50 rounded-md px-4 py-1 text-xs font-rajdhani text-muted-foreground flex items-center gap-2 max-w-sm w-full">
            {icon}
            <span className="truncate">{title}</span>
          </div>
        </div>
        
        <div className="w-12"></div> {/* Spacer for balance */}
      </div>
      
      {/* Content area */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        {children}
      </div>
    </div>
  );
}
