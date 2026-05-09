import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Instagram, 
  Send, 
  Calendar, 
  Image as ImageIcon, 
  Settings, 
  LayoutDashboard, 
  History,
  Plus,
  ArrowRight,
  Sparkles
} from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <Instagram size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight gradient-text">InstaAuto</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-2 transition-colors ${activeTab === 'dashboard' ? 'text-[hsl(var(--primary))] font-medium' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'}`}>
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button onClick={() => setActiveTab('schedule')} className={`flex items-center gap-2 transition-colors ${activeTab === 'schedule' ? 'text-[hsl(var(--primary))] font-medium' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'}`}>
              <Calendar size={18} /> Schedule
            </button>
            <button onClick={() => setActiveTab('history')} className={`flex items-center gap-2 transition-colors ${activeTab === 'history' ? 'text-[hsl(var(--primary))] font-medium' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'}`}>
              <History size={18} /> History
            </button>
          </div>

          <button className="btn-primary flex items-center gap-2">
            <Plus size={18} /> New Post
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-purple-500 font-semibold mb-2"
          >
            <Sparkles size={18} />
            AI-Powered Automation
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black mb-4 tracking-tight"
          >
            Manage Your <br />
            <span className="gradient-text">Instagram Presence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl"
          >
            Automate your posting schedule, optimize engagement with AI, and track your growth all from one beautiful dashboard.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { label: 'Followers', value: '12.5k', growth: '+2.4%', icon: Instagram },
              { label: 'Posts Scheduled', value: '24', growth: 'Next at 5pm', icon: Calendar },
              { label: 'Avg Engagement', value: '4.8%', growth: '+0.8%', icon: Sparkles },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-3xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] group hover:border-[hsl(var(--primary))] transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl bg-white/50 dark:bg-black/20 text-[hsl(var(--primary))]">
                    <stat.icon size={24} />
                  </div>
                  <span className="text-xs font-bold text-green-500">{stat.growth}</span>
                </div>
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))] font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Connect Account */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/10 to-pink-500/10 border border-purple-500/20 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Connect Instagram</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
                Link your business account to start automating your workflow.
              </p>
              <button className="w-full py-4 rounded-2xl bg-white dark:bg-black text-[hsl(var(--foreground))] font-bold flex items-center justify-center gap-2 hover:bg-[hsl(var(--muted))] transition-colors shadow-xl">
                Connect Now <ArrowRight size={18} />
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 text-purple-500/10 group-hover:scale-110 transition-transform duration-500">
              <Instagram size={160} />
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-3 p-8 rounded-3xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))]"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Scheduled Posts</h3>
              <button className="text-sm text-[hsl(var(--primary))] font-semibold hover:underline">View All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-2xl overflow-hidden group hover:shadow-2xl transition-all">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
                    <ImageIcon size={40} className="text-[hsl(var(--muted-foreground))] opacity-20" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform"><Settings size={20} /></button>
                      <button className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform"><Send size={20} /></button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))] mb-2">
                      <Calendar size={14} />
                      May {10 + i}, 2024 at 10:00 AM
                    </div>
                    <p className="text-sm font-medium line-clamp-1">New collection dropping soon! 🚀 #fashion #style</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-[hsl(var(--border))]">
        <div className="max-w-7xl mx-auto px-6 text-center text-[hsl(var(--muted-foreground))] text-sm">
          © 2024 InstaAuto Publisher. Made with ❤️ for creators.
        </div>
      </footer>
    </div>
  )
}

export default App
