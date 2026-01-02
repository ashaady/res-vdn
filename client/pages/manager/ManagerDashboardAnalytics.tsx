import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useOrders } from "@/context/OrdersContext";
import { Download, FileText } from "lucide-react";

export default function ManagerDashboardAnalytics() {
  const { orders } = useOrders();
  const [selectedTab, setSelectedTab] = useState<
    "overview" | "category" | "hourly" | "daily" | "performance"
  >("overview");

  // Calculate performance metrics
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const totalOrders = orders.length;
  const completionRate =
    totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;
  const cancelledOrders = orders.filter((o) => o.status === "pending").length;
  const cancellationRate =
    totalOrders > 0 ? Math.round((cancelledOrders / totalOrders) * 100) : 0;
  const avgPreparationTime = 18; // minutes
  const avgDeliveryTime = 25; // minutes

  const hourlyData = [
    { hour: "6h", orders: 0 },
    { hour: "9h", orders: 2 },
    { hour: "12h", orders: 8 },
    { hour: "13h", orders: 12 },
    { hour: "14h", orders: 6 },
    { hour: "18h", orders: 5 },
    { hour: "19h", orders: 10 },
    { hour: "20h", orders: 7 },
    { hour: "21h", orders: 3 },
  ];

  const dailyData = [
    { day: "Lun", orders: 32, revenue: 480000 },
    { day: "Mar", orders: 28, revenue: 420000 },
    { day: "Mer", orders: 35, revenue: 525000 },
    { day: "Jeu", orders: 30, revenue: 450000 },
    { day: "Ven", orders: 42, revenue: 630000 },
    { day: "Sam", orders: 48, revenue: 720000 },
    { day: "Dim", orders: 25, revenue: 375000 },
  ];

  const exportReport = (format: "pdf" | "excel" | "csv") => {
    console.log(`Exporting report as ${format}`);
    // Implementation would generate and download the file
  };

  return (
    <AdminLayout
      title="Dashboard Manager - Analytics"
      searchPlaceholder="Chercher une analyse..."
    >
      <div className="space-y-8">
        {/* Rapport Options */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-playfair font-bold text-[#6B3E26] mb-4">
            Exporter les Données
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#D4AF37] rounded-lg p-6">
              <h4 className="font-playfair font-bold text-[#6B3E26] mb-4">
                Rapport Complet
              </h4>
              <p className="text-sm text-[#999999] font-lato mb-4">
                Télécharger toutes les données de cette période
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => exportReport("pdf")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-lato font-semibold text-sm transition-colors"
                >
                  <FileText size={16} /> PDF
                </button>
                <button
                  onClick={() => exportReport("excel")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-lato font-semibold text-sm transition-colors"
                >
                  <FileText size={16} /> Excel
                </button>
                <button
                  onClick={() => exportReport("csv")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-lato font-semibold text-sm transition-colors"
                >
                  <FileText size={16} /> CSV
                </button>
              </div>
            </div>

            <div className="border border-[#D4AF37] rounded-lg p-6">
              <h4 className="font-playfair font-bold text-[#6B3E26] mb-4">
                Planifier un Rapport
              </h4>
              <p className="text-sm text-[#999999] font-lato mb-4">
                Recevoir les rapports automatiquement
              </p>
              <button className="w-full px-4 py-2 bg-[#F58220] hover:bg-[#E06E10] text-white rounded font-lato font-semibold text-sm transition-colors">
                Configurer l'automatisation
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex flex-wrap border-b border-[#D4AF37]">
            {[
              { id: "overview", label: "Vue d'ensemble" },
              { id: "category", label: "Par Catégorie" },
              { id: "hourly", label: "Par Heure" },
              { id: "daily", label: "Par Jour" },
              { id: "performance", label: "Performance" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setSelectedTab(
                    tab.id as
                      | "overview"
                      | "category"
                      | "hourly"
                      | "daily"
                      | "performance",
                  )
                }
                className={`px-6 py-3 font-lato font-semibold text-sm border-b-2 transition-colors ${
                  selectedTab === tab.id
                    ? "text-[#F58220] border-[#F58220]"
                    : "text-[#999999] border-transparent hover:text-[#6B3E26]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {selectedTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-[#D4AF37] rounded-lg p-4">
                    <p className="text-sm text-[#999999] font-lato mb-2">
                      Taux de Complétion
                    </p>
                    <p className="text-3xl font-playfair font-bold text-green-600 mb-3">
                      {completionRate}%
                    </p>
                    <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="border border-[#D4AF37] rounded-lg p-4">
                    <p className="text-sm text-[#999999] font-lato mb-2">
                      Taux d'Annulation
                    </p>
                    <p className="text-3xl font-playfair font-bold text-red-600 mb-3">
                      {cancellationRate}%
                    </p>
                    <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${cancellationRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="border border-[#D4AF37] rounded-lg p-4">
                    <p className="text-sm text-[#999999] font-lato mb-2">
                      Satisfaction Globale
                    </p>
                    <p className="text-3xl font-playfair font-bold text-blue-600 mb-3">
                      4.2/5
                    </p>
                    <p className="text-sm text-[#999999] font-lato">
                      ⭐⭐⭐⭐☆
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#D4AF37] pt-6">
                  <h4 className="font-playfair font-bold text-[#6B3E26] mb-4">
                    Résumé Statistique
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#D4AF37]">
                          <th className="text-left px-4 py-2 font-playfair font-bold text-[#6B3E26]">
                            Métrique
                          </th>
                          <th className="text-right px-4 py-2 font-playfair font-bold text-[#6B3E26]">
                            Valeur
                          </th>
                          <th className="text-right px-4 py-2 font-playfair font-bold text-[#6B3E26]">
                            Évolution
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#F5F5F5]">
                          <td className="px-4 py-2 text-[#999999] font-lato">
                            Total Commandes
                          </td>
                          <td className="text-right px-4 py-2 font-playfair font-bold text-[#6B3E26]">
                            {totalOrders}
                          </td>
                          <td className="text-right px-4 py-2 text-green-600 font-lato font-semibold">
                            ↑ 8%
                          </td>
                        </tr>
                        <tr className="border-b border-[#F5F5F5]">
                          <td className="px-4 py-2 text-[#999999] font-lato">
                            Commandes Livrées
                          </td>
                          <td className="text-right px-4 py-2 font-playfair font-bold text-[#6B3E26]">
                            {completedOrders}
                          </td>
                          <td className="text-right px-4 py-2 text-green-600 font-lato font-semibold">
                            ↑ 12%
                          </td>
                        </tr>
                        <tr className="border-b border-[#F5F5F5]">
                          <td className="px-4 py-2 text-[#999999] font-lato">
                            Temps Moyen Préparation
                          </td>
                          <td className="text-right px-4 py-2 font-playfair font-bold text-[#6B3E26]">
                            {avgPreparationTime} min
                          </td>
                          <td className="text-right px-4 py-2 text-green-600 font-lato font-semibold">
                            ↓ 3%
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-[#999999] font-lato">
                            Temps Moyen Livraison
                          </td>
                          <td className="text-right px-4 py-2 font-playfair font-bold text-[#6B3E26]">
                            {avgDeliveryTime} min
                          </td>
                          <td className="text-right px-4 py-2 text-red-600 font-lato font-semibold">
                            ↑ 5%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Category Tab */}
            {selectedTab === "category" && (
              <div>
                <h4 className="font-playfair font-bold text-[#6B3E26] mb-4">
                  Ventes par Catégorie
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#D4AF37]">
                        <th className="text-left px-4 py-2 font-playfair font-bold text-[#6B3E26]">
                          Catégorie
                        </th>
                        <th className="text-right px-4 py-2 font-playfair font-bold text-[#6B3E26]">
                          Ventes
                        </th>
                        <th className="text-right px-4 py-2 font-playfair font-bold text-[#6B3E26]">
                          Chiffre
                        </th>
                        <th className="text-right px-4 py-2 font-playfair font-bold text-[#6B3E26]">
                          % du Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { cat: "Plats Garnis", sales: 15, revenue: 450000 },
                        { cat: "Pizzas", sales: 12, revenue: 360000 },
                        { cat: "Grillades", sales: 10, revenue: 300000 },
                        { cat: "Fast-Food", sales: 8, revenue: 240000 },
                      ].map((row, idx) => (
                        <tr key={idx} className="border-b border-[#F5F5F5]">
                          <td className="px-4 py-2 text-[#999999] font-lato">
                            {row.cat}
                          </td>
                          <td className="text-right px-4 py-2 font-playfair font-bold text-[#6B3E26]">
                            {row.sales}
                          </td>
                          <td className="text-right px-4 py-2 font-playfair font-bold text-[#F58220]">
                            {(row.revenue / 1000).toFixed(0)}K F
                          </td>
                          <td className="text-right px-4 py-2 text-[#999999] font-lato">
                            {Math.round((row.revenue / 1350000) * 100)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Hourly Tab */}
            {selectedTab === "hourly" && (
              <div>
                <h4 className="font-playfair font-bold text-[#6B3E26] mb-4">
                  Heures de Pointe
                </h4>
                <div className="space-y-4">
                  {hourlyData.map((data) => (
                    <div key={data.hour}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-lato text-[#999999]">
                          {data.hour}
                        </span>
                        <span className="text-sm font-playfair font-bold text-[#6B3E26]">
                          {data.orders} commandes
                        </span>
                      </div>
                      <div className="w-full bg-[#F5F5F5] rounded-full h-3">
                        <div
                          className="bg-[#F58220] h-3 rounded-full"
                          style={{ width: `${(data.orders / 12) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Tab */}
            {selectedTab === "daily" && (
              <div>
                <h4 className="font-playfair font-bold text-[#6B3E26] mb-4">
                  Chiffre par Jour
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {dailyData.map((data) => (
                      <div key={data.day}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-lato font-semibold text-[#6B3E26]">
                            {data.day}
                          </span>
                          <span className="font-playfair font-bold text-[#F58220]">
                            {(data.revenue / 1000).toFixed(0)}K F
                          </span>
                        </div>
                        <div className="w-full bg-[#F5F5F5] rounded-full h-3">
                          <div
                            className="bg-[#F58220] h-3 rounded-full"
                            style={{
                              width: `${(data.revenue / 720000) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-[#999999] font-lato mt-1">
                          {data.orders} commandes
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="border border-[#D4AF37] rounded-lg p-4 bg-[#F5F5F5]">
                    <h5 className="font-playfair font-bold text-[#6B3E26] mb-3">
                      Insights
                    </h5>
                    <ul className="space-y-2 text-sm font-lato text-[#999999]">
                      <li>📈 Meilleur jour : Samedi (720K F)</li>
                      <li>📉 Jour plus faible : Dimanche (375K F)</li>
                      <li>📊 Moyenne : 500K F/jour</li>
                      <li>✅ Croissance hebdo : +8%</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {selectedTab === "performance" && (
              <div className="space-y-6">
                <h4 className="font-playfair font-bold text-[#6B3E26]">
                  Indicateurs de Performance
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Taux de Confirmation",
                      value: 95,
                      target: 98,
                      good: true,
                    },
                    {
                      label: "Temps Moyen (Confir.)",
                      value: 2,
                      target: 1,
                      unit: " min",
                      good: false,
                    },
                    {
                      label: "Taux d'On-Time",
                      value: 88,
                      target: 95,
                      good: false,
                    },
                    {
                      label: "Satisfaction Client",
                      value: 4.2,
                      target: 4.5,
                      good: true,
                    },
                  ].map((kpi, idx) => (
                    <div
                      key={idx}
                      className="border border-[#D4AF37] rounded-lg p-4"
                    >
                      <p className="text-sm text-[#999999] font-lato mb-3">
                        {kpi.label}
                      </p>
                      <div className="flex items-end justify-between mb-3">
                        <p className="text-3xl font-playfair font-bold text-[#6B3E26]">
                          {kpi.value}
                          {kpi.unit || ""}
                        </p>
                        <span
                          className={`text-xs font-lato font-semibold px-2 py-1 rounded ${
                            kpi.good
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {kpi.good ? "✓ Bon" : "⚠ À améliorer"}
                        </span>
                      </div>
                      <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            kpi.good ? "bg-green-600" : "bg-orange-600"
                          }`}
                          style={{
                            width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-[#999999] font-lato mt-2">
                        Objectif: {kpi.target}
                        {kpi.unit || ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
