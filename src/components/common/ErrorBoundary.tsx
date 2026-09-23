import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('RSGeeker ErrorBoundary caught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    try {
      // Clear localStorage keys that might be corrupt
      const keys = Object.keys(localStorage);
      for (const k of keys) {
        if (k.startsWith('rsgeeker_media_')) {
          localStorage.removeItem(k);
        }
      }
    } catch (e) {
      console.error(e);
    }
    window.location.hash = '/';
    window.location.reload();
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#06080e] text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Application Recovery Mode</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                A client-side initialization state conflict occurred. You can reload the application or reset stored preferences.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-left font-mono text-[11px] text-red-400 overflow-auto max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleReset}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset & Restore</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
