import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash2, Plus, Minus, ArrowLeft, Lock } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: {
        subtotal,
        deliveryFee,
        deliveryType,
        fullName,
        phone,
        address,
        notes,
      },
    });
  };

  const deliveryFee = deliveryType === "delivery" ? 1000 : 0;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal + deliveryFee;

  const handleQuantityChange = (id: string, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      updateQuantity(id, Math.max(1, item.quantity + delta));
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const isFormValid =
    fullName && phone && (deliveryType === "pickup" || address);

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
            MON PANIER
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-6">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <h3 className="text-lg font-playfair font-bold text-[#6B3E26] mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-[#666666] font-lato mb-3">
                          {item.description}
                        </p>
                        <p className="text-sm text-[#999999] font-lato mb-3">
                          Prix unitaire : {item.price.toLocaleString()} F
                        </p>

                        {/* Quantity and Total */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="p-1 border border-[#9C6B4A] hover:bg-[#F5F5F5] rounded"
                            >
                              <Minus size={16} />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              readOnly
                              className="w-12 text-center border border-[#D4AF37] rounded py-1 font-lato"
                            />
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="p-1 border border-[#9C6B4A] hover:bg-[#F5F5F5] rounded"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <p className="font-bold text-[#F58220] text-lg">
                            Total :{" "}
                            {(item.price * item.quantity).toLocaleString()} F
                          </p>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-[#E74C3C] hover:text-[#C0392B] transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-8 sticky top-48">
                <h2 className="text-2xl font-playfair font-bold text-[#6B3E26] mb-6 border-b border-[#D4AF37] pb-4">
                  RÉCAPITULATIF
                </h2>

                {/* Delivery Type */}
                <div className="mb-6">
                  <h3 className="font-playfair font-bold text-[#6B3E26] mb-3">
                    Type de Commande
                  </h3>
                  <RadioGroup
                    value={deliveryType}
                    onValueChange={setDeliveryType}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label
                        htmlFor="delivery"
                        className="font-lato cursor-pointer"
                      >
                        🚚 Livraison à domicile
                        <span className="text-[#F58220] font-bold">
                          {" "}
                          +1.000 F
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label
                        htmlFor="pickup"
                        className="font-lato cursor-pointer"
                      >
                        🏠 À emporter
                        <span className="text-green-600 font-bold">
                          {" "}
                          Gratuit
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Customer Info */}
                <div className="mb-6 border-t border-[#D4AF37] pt-6">
                  <h3 className="font-playfair font-bold text-[#6B3E26] mb-4">
                    Vos Informations
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-[#6B3E26] font-lato font-semibold text-sm">
                        Nom complet *
                      </Label>
                      <Input
                        placeholder="Votre nom"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 border-[#9C6B4A] font-lato"
                      />
                    </div>

                    <div>
                      <Label className="text-[#6B3E26] font-lato font-semibold text-sm">
                        Téléphone *
                      </Label>
                      <Input
                        placeholder="Votre numéro"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 border-[#9C6B4A] font-lato"
                      />
                    </div>

                    {deliveryType === "delivery" && (
                      <div>
                        <Label className="text-[#6B3E26] font-lato font-semibold text-sm">
                          Adresse de livraison *
                        </Label>
                        <Textarea
                          placeholder="Votre adresse complète"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="mt-1 border-[#9C6B4A] font-lato resize-none"
                          rows={3}
                        />
                      </div>
                    )}

                    <div>
                      <Label className="text-[#6B3E26] font-lato font-semibold text-sm">
                        Notes supplémentaires
                      </Label>
                      <Textarea
                        placeholder="Demandes spéciales..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mt-1 border-[#9C6B4A] font-lato resize-none"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-[#D4AF37] pt-6 space-y-3">
                  <div className="flex justify-between font-lato">
                    <span>Sous-total</span>
                    <span className="font-semibold">
                      {subtotal.toLocaleString()} F
                    </span>
                  </div>
                  {deliveryType === "delivery" && (
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

                {/* CTA Button */}
                <Button
                  onClick={handleProceedToPayment}
                  className={`w-full mt-6 h-14 font-playfair font-bold text-lg uppercase tracking-wide flex items-center justify-center gap-2 ${
                    isFormValid
                      ? "bg-[#F58220] hover:bg-[#E06E10] text-white cursor-pointer"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid}
                >
                  <Lock size={18} />
                  Procéder au Paiement
                </Button>

                <p className="text-center text-xs text-[#999999] font-lato mt-4">
                  🔒 Paiement 100% sécurisé
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <p className="text-[#999999] font-lato text-xl mb-6">
              Votre panier est vide
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
