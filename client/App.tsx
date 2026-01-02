import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductsManagement from "./pages/admin/ProductsManagement";
import ManagerDashboardOverview from "./pages/manager/ManagerDashboardOverview";
import ManagerDashboardProducts from "./pages/manager/ManagerDashboardProducts";
import ManagerDashboardAnalytics from "./pages/manager/ManagerDashboardAnalytics";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";
import { CartProvider } from "@/context/CartContext";
import { OrdersProvider } from "@/context/OrdersContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <OrdersProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Home />
                    </Layout>
                  }
                />
                <Route
                  path="/menu"
                  element={
                    <Layout>
                      <Menu />
                    </Layout>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <Layout>
                      <Cart />
                    </Layout>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <Layout>
                      <Orders />
                    </Layout>
                  }
                />
                <Route
                  path="/account"
                  element={
                    <Layout>
                      <Placeholder
                        title="Espace Client"
                        description="Gérez votre profil et vos préférences."
                        icon="👤"
                      />
                    </Layout>
                  }
                />
                <Route
                  path="/payment"
                  element={
                    <Layout>
                      <Payment />
                    </Layout>
                  }
                />

                {/* ADMIN & MANAGER ROUTES */}
                <Route path="/login" element={<Login />} />

                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute requiredRoles={["admin", "manager"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/manager/dashboard-overview"
                  element={
                    <ProtectedRoute requiredRoles="manager">
                      <ManagerDashboardOverview />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/manager/dashboard-products"
                  element={
                    <ProtectedRoute requiredRoles="manager">
                      <ManagerDashboardProducts />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/manager/dashboard-analytics"
                  element={
                    <ProtectedRoute requiredRoles="manager">
                      <ManagerDashboardAnalytics />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute requiredRoles={["admin", "manager"]}>
                      <ProductsManagement />
                    </ProtectedRoute>
                  }
                />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route
                  path="*"
                  element={
                    <Layout>
                      <NotFound />
                    </Layout>
                  }
                />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </OrdersProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
