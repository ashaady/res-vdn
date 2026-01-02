import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader } from "lucide-react";
import { useOrders, OrderStatus } from "@/context/OrdersContext";

const statusLabels: Record<OrderStatus, string> = {
  pending: "En attente",
  in_preparation: "En préparation",
  ready: "Prêt",
  completed: "Complétée",
};

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  in_preparation: "bg-blue-100 text-blue-800",
  ready: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
};

export default function Orders() {
  const { orders } = useOrders();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white border-b border-[#D4AF37] sticky top-20 z-30">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-[#F58220] font-lato font-semibold hover:text-[#E06E10]"
          >
            <ArrowLeft size={20} />
            Continuer mes achats
          </Link>
          <h1 className="text-3xl font-playfair font-bold text-[#6B3E26] mt-2">
            MES COMMANDES
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-[#F5F5F5] border-b border-[#D4AF37] px-6 py-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#999999] font-lato">
                        Commande #{order.id}
                      </p>
                      <p className="text-sm text-[#666666] font-lato">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-lato font-semibold w-fit ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status === "in_preparation" ? (
                          <span className="flex items-center gap-2">
                            <Loader size={14} className="animate-spin" />
                            {statusLabels[order.status]}
                          </span>
                        ) : (
                          statusLabels[order.status]
                        )}
                      </span>
                      <p className="text-lg font-playfair font-bold text-[#F58220]">
                        {order.total.toLocaleString()} F
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  {/* Customer Info */}
                  <div className="mb-6 pb-6 border-b border-[#D4AF37]">
                    <h3 className="font-playfair font-bold text-[#6B3E26] mb-3">
                      Informations de livraison
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-lato">
                      <div>
                        <p className="text-[#999999]">Nom</p>
                        <p className="font-semibold text-[#6B3E26]">
                          {order.fullName}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#999999]">Téléphone</p>
                        <p className="font-semibold text-[#6B3E26]">
                          {order.phone}
                        </p>
                      </div>
                      {order.address && (
                        <div className="md:col-span-2">
                          <p className="text-[#999999]">Adresse</p>
                          <p className="font-semibold text-[#6B3E26]">
                            {order.address}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-[#999999]">Type de livraison</p>
                        <p className="font-semibold text-[#6B3E26]">
                          {order.deliveryType === "delivery"
                            ? "Livraison à domicile"
                            : "À emporter"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#999999]">Méthode de paiement</p>
                        <p className="font-semibold text-[#6B3E26]">
                          {order.paymentMethod === "wave"
                            ? "Wave Money"
                            : "Max it"}
                        </p>
                      </div>
                    </div>
                    {order.notes && (
                      <div className="mt-4">
                        <p className="text-[#999999]">Notes</p>
                        <p className="font-semibold text-[#6B3E26]">
                          {order.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Items */}
                  <div className="mb-6 pb-6 border-b border-[#D4AF37]">
                    <h3 className="font-playfair font-bold text-[#6B3E26] mb-3">
                      Articles commandés
                    </h3>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-playfair font-bold text-[#6B3E26]">
                              {item.name}
                            </p>
                            <p className="text-sm text-[#666666] font-lato">
                              Quantité: {item.quantity}
                            </p>
                            {item.selectedSize && (
                              <p className="text-sm text-[#999999] font-lato">
                                Taille: {item.selectedSize}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#F58220]">
                              {(item.price * item.quantity).toLocaleString()} F
                            </p>
                            <p className="text-sm text-[#999999] font-lato">
                              {item.price.toLocaleString()} F x {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="flex justify-end">
                    <div className="w-full md:w-80">
                      <div className="space-y-2 text-sm font-lato mb-3">
                        <div className="flex justify-between">
                          <span>Sous-total</span>
                          <span className="font-semibold">
                            {order.subtotal.toLocaleString()} F
                          </span>
                        </div>
                        {order.deliveryFee > 0 && (
                          <div className="flex justify-between">
                            <span>Livraison</span>
                            <span className="font-semibold">
                              {order.deliveryFee.toLocaleString()} F
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="border-t border-[#D4AF37] pt-3 flex justify-between font-playfair font-bold text-lg">
                        <span>TOTAL</span>
                        <span className="text-[#F58220]">
                          {order.total.toLocaleString()} F
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <p className="text-[#999999] font-lato text-xl mb-6">
              Vous n'avez pas encore de commandes
            </p>
            <Link
              to="/menu"
              className="inline-block px-8 py-3 bg-[#F58220] text-white font-lato font-bold uppercase text-sm tracking-wide hover:bg-[#E06E10] transition-colors rounded-sm"
            >
              Découvrir nos plats
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
