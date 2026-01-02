import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatsCard from "@/components/admin/StatsCard";
import StatusBadge from "@/components/admin/StatusBadge";
import { useOrders } from "@/context/OrdersContext";
import { ChevronRight, Clock, User, Phone } from "lucide-react";

export default function AdminDashboard() {
  const { orders } = useOrders();
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate stats
  const totalOrdersToday = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const preparingOrders = orders.filter(
    (o) => o.status === "in_preparation",
  ).length;

  const avgPreparationTime =
    orders.length > 0
      ? Math.round(orders.reduce((sum) => sum + 15, 0) / orders.length)
      : 0;

  // Filter orders based on search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredOrders(orders.slice(0, 10)); // Show latest 10
      return;
    }

    const query = searchQuery.toLowerCase();
    setFilteredOrders(
      orders.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.fullName.toLowerCase().includes(query) ||
          order.phone.toLowerCase().includes(query),
      ),
    );
  }, [searchQuery, orders]);

  const formatRelativeTime = (date: string) => {
    const now = new Date();
    const orderDate = new Date(date);
    const diffMs = now.getTime() - orderDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "à l'instant";
    if (diffMins < 60) return `il y a ${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `il y a ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `il y a ${diffDays}j`;
  };

  return (
    <AdminLayout
      title="Dashboard"
      searchPlaceholder="Rechercher une commande, client..."
      onSearch={setSearchQuery}
    >
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Commandes du jour"
            value={totalOrdersToday}
            icon="📦"
            trend={{ percentage: 12, positive: true }}
            borderColor="#F58220"
          />
          <StatsCard
            title="En attente"
            value={pendingOrders}
            icon="⏳"
            trend={{ percentage: 5, positive: false }}
            borderColor="#F59E0B"
            actionButton={{
              label: "Voir",
              onClick: () => console.log("View pending orders"),
            }}
          />
          <StatsCard
            title="En préparation"
            value={preparingOrders}
            icon="👨‍🍳"
            trend={{ percentage: 8, positive: true }}
            borderColor="#F58220"
          />
          <StatsCard
            title="Temps moyen"
            value={`${avgPreparationTime}min`}
            icon="⏱️"
            trend={{ percentage: 3, positive: true }}
            borderColor="#3B82F6"
          />
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b border-[#D4AF37]">
            <div>
              <h2 className="text-xl font-playfair font-bold text-[#6B3E26]">
                Commandes en direct
              </h2>
              <p className="text-sm text-[#999999] font-lato mt-1">
                Auto-refresh 5s •
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mx-2 animate-pulse"></span>
                En ligne
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Toutes", "Nouvelles", "Urgent", "Livraison", "À emporter"].map(
                (filter, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1.5 rounded-full text-sm font-lato font-semibold transition-colors ${
                      idx === 0
                        ? "bg-[#F58220] text-white"
                        : "bg-[#F5F5F5] text-[#6B3E26] hover:bg-[#9C6B4A] hover:text-white"
                    }`}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Orders Table - Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F5F5F5] bg-[#F5F5F5]">
                  <th className="px-6 py-3 text-left text-xs font-playfair font-bold text-[#6B3E26]">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-playfair font-bold text-[#6B3E26]">
                    N° Commande
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-playfair font-bold text-[#6B3E26]">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-playfair font-bold text-[#6B3E26]">
                    Heure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-playfair font-bold text-[#6B3E26]">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-playfair font-bold text-[#6B3E26]">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-playfair font-bold text-[#6B3E26]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#F5F5F5] hover:bg-[#F5F5F5] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-playfair font-bold text-[#6B3E26]">
                        {order.id}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-lato font-semibold text-[#6B3E26]">
                          {order.fullName}
                        </p>
                        <p className="text-sm text-[#999999] font-lato">
                          {order.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-lato text-[#999999]">
                        {formatRelativeTime(order.createdAt)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-lato">
                        {order.deliveryType === "delivery" ? "🚚" : "🏠"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-playfair font-bold text-[#F58220]">
                        {order.total.toLocaleString()} F
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-[#F58220] hover:text-[#E06E10] transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Orders Cards - Mobile */}
          <div className="md:hidden space-y-3 p-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="border border-[#D4AF37] rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-playfair font-bold text-[#6B3E26]">
                      {order.id}
                    </p>
                    <StatusBadge status={order.status} size="sm" />
                  </div>
                  <p className="font-playfair font-bold text-[#F58220]">
                    {order.total.toLocaleString()} F
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-[#999999]" />
                    <span className="font-lato text-[#6B3E26]">
                      {order.fullName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-[#999999]" />
                    <span className="font-lato text-[#6B3E26]">
                      {order.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#999999]" />
                    <span className="font-lato text-[#999999]">
                      {formatRelativeTime(order.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#999999] font-lato">
                Aucune commande trouvée
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
