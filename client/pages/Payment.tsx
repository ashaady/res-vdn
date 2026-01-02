import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrdersContext";
import { toast } from "sonner";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, clearCart } = useCart();
  const { createOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState<"wave" | "maxit">("wave");
  const [isProcessing, setIsProcessing] = useState(false);

  // Get cart and order details from location state
  const {
    subtotal = 0,
    deliveryFee = 0,
    deliveryType = "delivery",
    fullName = "",
    phone = "",
    address = "",
    notes = "",
  } = location.state || {};

  const total = subtotal + deliveryFee;

  const handlePayment = async () => {
    if (!fullName || !phone) {
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // Create the order
      createOrder({
        items: cartItems,
        subtotal,
        deliveryFee,
        total,
        deliveryType: deliveryType as "delivery" | "pickup",
        fullName,
        phone,
        address,
        notes,
        paymentMethod,
        status: "in_preparation",
      });

      toast.success(`Paiement confirmé! Commande en préparation.`);

      // Clear cart after successful payment
      clearCart();

      // Navigate to orders page
      setTimeout(() => {
        navigate("/orders");
      }, 1500);
    } catch (error) {
      toast.error("Erreur lors de la création de la commande");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white border-b border-[#D4AF37] sticky top-20 z-30">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[#F58220] font-lato font-semibold hover:text-[#E06E10]"
          >
            <ArrowLeft size={20} />
            Retour
          </button>
          <h1 className="text-3xl font-playfair font-bold text-[#6B3E26] mt-2">
            PAIEMENT
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-playfair font-bold text-[#6B3E26] mb-6 border-b border-[#D4AF37] pb-4">
                Choisissez votre méthode de paiement
              </h2>

              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) =>
                  setPaymentMethod(value as "wave" | "maxit")
                }
              >
                {/* Wave Payment Option */}
                <div className="mb-6 p-6 border-2 border-gray-300 rounded-lg hover:border-[#F58220] transition-colors cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="wave" id="wave" className="mt-1" />
                    <Label htmlFor="wave" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2F562ab4a0fd0a4cbdb2356bc1d15ae09f%2F02703e0701a7407caab94ade4aaf70cd?format=webp&width=800"
                          alt="Wave Logo"
                          className="h-16 w-auto"
                        />
                        <div>
                          <h3 className="text-lg font-playfair font-bold text-[#6B3E26]">
                            Wave Money
                          </h3>
                          <p className="text-sm text-[#666666] font-lato">
                            Paiement sécurisé avec Wave
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </div>

                {/* Max it Payment Option */}
                <div className="p-6 border-2 border-gray-300 rounded-lg hover:border-[#F58220] transition-colors cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="maxit" id="maxit" className="mt-1" />
                    <Label htmlFor="maxit" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2F562ab4a0fd0a4cbdb2356bc1d15ae09f%2F2a6c2cb943bb4dd192993d467dec8c78?format=webp&width=800"
                          alt="Max it Logo"
                          className="h-16 w-auto"
                        />
                        <div>
                          <h3 className="text-lg font-playfair font-bold text-[#6B3E26]">
                            Max it
                          </h3>
                          <p className="text-sm text-[#666666] font-lato">
                            Paiement sécurisé avec Max it
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {/* Order Summary */}
              <div className="mt-8 pt-8 border-t border-[#D4AF37]">
                <h3 className="text-lg font-playfair font-bold text-[#6B3E26] mb-4">
                  Résumé de la commande
                </h3>
                <div className="space-y-2 text-sm">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between font-lato"
                    >
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>
                        {(item.price * item.quantity).toLocaleString()} F
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-8 sticky top-48">
              <h2 className="text-2xl font-playfair font-bold text-[#6B3E26] mb-6 border-b border-[#D4AF37] pb-4">
                DÉTAILS
              </h2>

              {/* Customer Info */}
              <div className="mb-6">
                <h3 className="font-playfair font-bold text-[#6B3E26] mb-3">
                  Informations
                </h3>
                <div className="space-y-2 text-sm font-lato">
                  <div>
                    <p className="text-[#999999]">Nom</p>
                    <p className="font-semibold text-[#6B3E26]">{fullName}</p>
                  </div>
                  <div>
                    <p className="text-[#999999]">Téléphone</p>
                    <p className="font-semibold text-[#6B3E26]">{phone}</p>
                  </div>
                  {address && (
                    <div>
                      <p className="text-[#999999]">Adresse</p>
                      <p className="font-semibold text-[#6B3E26]">{address}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[#999999]">Type de livraison</p>
                    <p className="font-semibold text-[#6B3E26]">
                      {deliveryType === "delivery"
                        ? "Livraison à domicile"
                        : "À emporter"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div className="border-t border-[#D4AF37] pt-6 space-y-3">
                <div className="flex justify-between font-lato">
                  <span>Sous-total</span>
                  <span className="font-semibold">
                    {subtotal.toLocaleString()} F
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between font-lato">
                    <span>Livraison</span>
                    <span className="font-semibold">
                      {deliveryFee.toLocaleString()} F
                    </span>
                  </div>
                )}
                <div className="border-t border-[#D4AF37] pt-3 flex justify-between font-playfair font-bold text-lg">
                  <span>TOTAL</span>
                  <span className="text-[#F58220]">
                    {total.toLocaleString()} F
                  </span>
                </div>
              </div>

              {/* Payment Method Display */}
              <div className="mt-6 p-4 bg-[#F5F5F5] rounded">
                <p className="text-sm font-lato text-[#666666] mb-2">
                  Paiement par
                </p>
                <p className="font-playfair font-bold text-[#6B3E26]">
                  {paymentMethod === "wave" ? "Wave Money" : "Max it"}
                </p>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-6 h-14 font-playfair font-bold text-lg uppercase tracking-wide flex items-center justify-center gap-2 bg-[#F58220] hover:bg-[#E06E10] text-white"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin">⏳</div>
                    Traitement...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Confirmer le paiement
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-[#999999] font-lato mt-4">
                🔒 Paiement 100% sécurisé
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
