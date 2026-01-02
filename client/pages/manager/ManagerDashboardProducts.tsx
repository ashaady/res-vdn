import AdminLayout from "@/components/admin/AdminLayout";
import StatsCard from "@/components/admin/StatsCard";
import { useOrders } from "@/context/OrdersContext";

export default function ManagerDashboardProducts() {
  const { orders } = useOrders();

  // Analyze product sales
  const productSales: Record<string, { count: number; revenue: number }> = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!productSales[item.name]) {
        productSales[item.name] = { count: 0, revenue: 0 };
      }
      productSales[item.name].count += item.quantity;
      productSales[item.name].revenue += item.price * item.quantity;
    });
  });

  const topProducts = Object.entries(productSales)
    .map(([name, { count, revenue }]) => ({
      name,
      count,
      revenue,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const totalProductsSold = Object.values(productSales).reduce(
    (sum, { count }) => sum + count,
    0,
  );
  const totalProductRevenue = Object.values(productSales).reduce(
    (sum, { revenue }) => sum + revenue,
    0,
  );
  const averageProductPrice =
    totalProductsSold > 0
      ? Math.round(totalProductRevenue / totalProductsSold)
      : 0;

  return (
    <AdminLayout
      title="Dashboard Manager - Produits"
      searchPlaceholder="Rechercher un produit..."
    >
      <div className="space-y-8">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Produits Vendus"
            value={totalProductsSold}
            icon="🛍️"
            trend={{ percentage: 15, positive: true }}
            borderColor="#F58220"
          />
          <StatsCard
            title="Chiffre Produits"
            value={`${(totalProductRevenue / 1000).toFixed(1)}K F`}
            icon="💰"
            trend={{ percentage: 18, positive: true }}
            borderColor="#F58220"
          />
          <StatsCard
            title="Prix Moyen"
            value={`${averageProductPrice.toLocaleString()} F`}
            icon="📊"
            trend={{ percentage: 5, positive: false }}
            borderColor="#3B82F6"
          />
          <StatsCard
            title="Catégories"
            value="17"
            icon="📂"
            trend={{ percentage: 3, positive: true }}
            borderColor="#8B5CF6"
          />
        </div>

        {/* Top 5 Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-playfair font-bold text-[#6B3E26] mb-6">
            Top 5 Produits
          </h3>

          <div className="space-y-4">
            {topProducts.length > 0 ? (
              topProducts.map((product, idx) => {
                const maxRevenue = topProducts[0].revenue;
                const percentageOfTop = (product.revenue / maxRevenue) * 100;
                const medals = ["🥇", "🥈", "🥉", "", ""];

                return (
                  <div key={product.name}>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl">{medals[idx]}</span>
                      <div className="flex-1">
                        <p className="font-playfair font-bold text-[#6B3E26]">
                          #{idx + 1} {product.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-playfair font-bold text-[#F58220]">
                          {product.revenue.toLocaleString()} F
                        </p>
                        <p className="text-xs text-[#999999] font-lato">
                          {product.count} ventes
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-[#F5F5F5] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#F58220] h-2 rounded-full transition-all"
                        style={{ width: `${percentageOfTop}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-[#999999] font-lato">
                        {percentageOfTop.toFixed(0)}% du best-seller
                      </span>
                      <span className="text-xs text-green-600 font-lato font-semibold">
                        ↑ 8%
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-[#999999] font-lato py-8">
                Aucune donnée de produits disponible
              </p>
            )}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-playfair font-bold text-[#6B3E26] mb-6">
            Performance par Catégorie
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Plats Garnis",
                sales: 450000,
                percentage: 35,
                growth: 12,
              },
              {
                name: "Pizzas",
                sales: 320000,
                percentage: 25,
                growth: 18,
              },
              {
                name: "Fast-Food",
                sales: 280000,
                percentage: 22,
                growth: 8,
              },
              { name: "Autres", sales: 150000, percentage: 18, growth: -5 },
            ].map((category) => (
              <div
                key={category.name}
                className="border border-[#D4AF37] rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-playfair font-bold text-[#6B3E26]">
                    {category.name}
                  </h4>
                  <span
                    className={`text-xs font-lato font-semibold px-2 py-1 rounded ${
                      category.growth > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {category.growth > 0 ? "↑" : "↓"}{" "}
                    {Math.abs(category.growth)}%
                  </span>
                </div>
                <p className="font-playfair font-bold text-[#F58220] mb-3">
                  {(category.sales / 1000).toFixed(0)}K F
                </p>
                <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                  <div
                    className="bg-[#F58220] h-2 rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-[#999999] font-lato mt-2">
                  {category.percentage}% du CA
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-[#D4AF37]">
            <h3 className="text-lg font-playfair font-bold text-[#6B3E26]">
              Tous les Produits
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F5F5F5] border-b border-[#D4AF37]">
                  <th className="px-6 py-3 text-left text-xs font-playfair font-bold text-[#6B3E26]">
                    Produit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-playfair font-bold text-[#6B3E26]">
                    Ventes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-playfair font-bold text-[#6B3E26]">
                    Chiffre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-playfair font-bold text-[#6B3E26]">
                    Évolution
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(productSales)
                  .map(([name, { count, revenue }]) => ({
                    name,
                    count,
                    revenue,
                  }))
                  .sort((a, b) => b.revenue - a.revenue)
                  .slice(0, 10)
                  .map((product) => (
                    <tr
                      key={product.name}
                      className="border-b border-[#F5F5F5] hover:bg-[#F5F5F5] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-lato font-semibold text-[#6B3E26]">
                          {product.name}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-lato text-[#999999]">
                          {product.count}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-playfair font-bold text-[#F58220]">
                          {product.revenue.toLocaleString()} F
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-lato font-semibold text-green-600">
                          ↑ 12%
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
