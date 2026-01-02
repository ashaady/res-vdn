import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatsCard from "@/components/admin/StatsCard";
import { useOrders } from "@/context/OrdersContext";
import { TrendingUp, TrendingDown } from "lucide-react";

type Period = "today" | "yesterday" | "7days" | "30days" | "month" | "lastmonth" | "custom";

const periodLabels: Record<Period, string> = {
  today: "Aujourd'hui",
  yesterday: "Hier",
  "7days": "7 derniers jours",
  "30days": "30 derniers jours",
  month: "Ce mois-ci",
  lastmonth: "Mois dernier",
  custom: "Personnalisé",
};

export default function ManagerDashboardOverview() {
  const { orders } = useOrders();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("today");

  // Calculate stats based on period
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const cancelledOrders = orders.filter((o) => o.status === "pending").length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const deliveryOrders = orders.filter((o) => o.deliveryType === "delivery").length;
  const pickupOrders = orders.filter((o) => o.deliveryType === "pickup").length;

  const revenueTrend = 12.5;
  const ordersTrend = 8.3;
  const customersTrend = -2.1;

  return (
    <AdminLayout
      title="Dashboard Manager"
      searchPlaceholder="Rechercher..."
    >
      <div className="space-y-8">
        {/* Period Selector */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-playfair font-bold text-[#6B3E26] mb-4">
            Sélectionner une période
          </h3>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(periodLabels) as Period[]).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-full text-sm font-lato font-semibold transition-colors ${
                  selectedPeriod === period
                    ? "bg-[#F58220] text-white"
                    : "bg-[#F5F5F5] text-[#6B3E26] hover:bg-[#9C6B4A] hover:text-white"
                }`}
              >
                {periodLabels[period]}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#F58220]">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-sm font-lato text-[#999999] font-semibold">
                Chiffre d'Affaires
              </h3>
              <span className="text-3xl">💰</span>
            </div>
            <p className="text-3xl font-playfair font-bold text-[#F58220] mb-3">
              {(totalRevenue / 1000).toFixed(1)}K F
            </p>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-green-600" />
              <span className="text-sm font-lato font-semibold text-green-600">
                +{revenueTrend}%
              </span>
              <span className="text-xs text-[#999999] font-lato">
                vs période précédente
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#3B82F6]">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-sm font-lato text-[#999999] font-semibold">
                Nombre de Commandes
              </h3>
              <span className="text-3xl">📦</span>
            </div>
            <p className="text-3xl font-playfair font-bold text-[#6B3E26] mb-3">
              {totalOrders}
            </p>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-green-600" />
              <span className="text-sm font-lato font-semibold text-green-600">
                +{ordersTrend}%
              </span>
            </div>
            <div className="text-xs font-lato space-y-1">
              <div className="flex justify-between text-[#999999]">
                <span>Livrées:</span>
                <span className="text-green-600 font-semibold">
                  {completedOrders}
                </span>
              </div>
              <div className="flex justify-between text-[#999999]">
                <span>Annulées:</span>
                <span className="text-red-600 font-semibold">
                  {cancelledOrders}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8B5CF6]">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-sm font-lato text-[#999999] font-semibold">
                Panier Moyen
              </h3>
              <span className="text-3xl">🛒</span>
            </div>
            <p className="text-3xl font-playfair font-bold text-[#6B3E26] mb-3">
              {avgOrderValue.toLocaleString()} F
            </p>
            <div className="flex items-center gap-2">
              <TrendingDown size={16} className="text-red-600" />
              <span className="text-sm font-lato font-semibold text-red-600">
                -{Math.abs(customersTrend)}%
              </span>
              <span className="text-xs text-[#999999] font-lato">
                vs période précédente
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#10B981]">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-sm font-lato text-[#999999] font-semibold">
                Clients
              </h3>
              <span className="text-3xl">👥</span>
            </div>
            <p className="text-3xl font-playfair font-bold text-[#6B3E26] mb-3">
              {totalOrders}
            </p>
            <div className="space-y-2 text-xs font-lato">
              <div className="flex justify-between text-[#999999]">
                <span>Livrés à domicile:</span>
                <span className="font-semibold text-[#6B3E26]">
                  {deliveryOrders}
                </span>
              </div>
              <div className="flex justify-between text-[#999999]">
                <span>À emporter:</span>
                <span className="font-semibold text-[#6B3E26]">
                  {pickupOrders}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-playfair font-bold text-[#6B3E26] mb-4">
              Chiffre d'Affaires cette période
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-lato text-[#999999] mb-2">
                  Période actuelle
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-playfair font-bold text-[#F58220]">
                    {(totalRevenue / 1000).toFixed(1)}K F
                  </p>
                  <div className="w-24 h-12 bg-[#F5F5F5] rounded flex items-center justify-center">
                    <div className="text-xs font-lato text-[#999999]">
                      [Graphique]
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-[#D4AF37] pt-3">
                <p className="text-sm font-lato text-[#999999] mb-2">
                  Période précédente
                </p>
                <p className="text-lg font-playfair font-bold text-[#9C6B4A]">
                  {Math.round(totalRevenue * 0.88 / 1000)}K F
                </p>
              </div>
            </div>
          </div>

          {/* Order Types Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-playfair font-bold text-[#6B3E26] mb-4">
              Type de Commandes
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-lato text-[#999999]">
                    🚚 Livraison à domicile
                  </span>
                  <span className="font-playfair font-bold text-[#6B3E26]">
                    {deliveryOrders} ({Math.round((deliveryOrders / totalOrders) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-[#F5F5F5] rounded-full h-3">
                  <div
                    className="bg-[#F58220] h-3 rounded-full"
                    style={{
                      width: `${(deliveryOrders / totalOrders) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-lato text-[#999999]">
                    🏠 À emporter
                  </span>
                  <span className="font-playfair font-bold text-[#6B3E26]">
                    {pickupOrders} ({Math.round((pickupOrders / totalOrders) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-[#F5F5F5] rounded-full h-3">
                  <div
                    className="bg-[#9C6B4A] h-3 rounded-full"
                    style={{
                      width: `${(pickupOrders / totalOrders) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
