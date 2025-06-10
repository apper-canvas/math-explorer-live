import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ApperIcon from './components/ApperIcon';
import { routeArray } from './config/routes';
import { SettingsProvider } from './contexts/SettingsContext';
function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

<SettingsProvider>
      <div className="h-screen flex flex-col overflow-hidden bg-lightBlue/10">
      {/* Header */}
      <header className="flex-shrink-0 h-16 bg-lightBlue/20 border-b border-surface-200 z-40">
        <div className="h-full flex items-center justify-between px-4 lg:px-6">
        <div className="h-full flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <ApperIcon name="Calculator" className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-display text-primary">Math Explorer</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {routeArray.map(route => {
              const isActive = location.pathname === route.path || 
                (route.path !== '/' && location.pathname.startsWith(route.path));
              
              return (
                <NavLink
                  key={route.id}
                  to={route.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'text-surface-600 hover:bg-surface-100 hover:text-primary'
                  }`}
                >
                  <ApperIcon name={route.icon} size={16} />
                  <span>{route.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
          >
            <ApperIcon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-surface-200 shadow-lg z-30">
            <nav className="px-4 py-2 space-y-1">
              {routeArray.map(route => {
                const isActive = location.pathname === route.path || 
                  (route.path !== '/' && location.pathname.startsWith(route.path));
                
                return (
                  <NavLink
                    key={route.id}
                    to={route.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : 'text-surface-600 hover:bg-surface-100 hover:text-primary'
                    }`}
                  >
                    <ApperIcon name={route.icon} size={20} />
                    <span>{route.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        )}
</header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
</div>
    </SettingsProvider>
  );
}

export default Layout;