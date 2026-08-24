import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Portfolio from './pages/Portfolio';

// The admin bundle is split out so visitors never download it.
const AdminPage = lazy(() => import('./admin/AdminPage'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-dvh items-center justify-center bg-primary-bg text-sm text-secondary-text">
                  Loading...
                </div>
              }
            >
              <AdminPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
