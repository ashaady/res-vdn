import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erreur de connexion",
      );
    }
  };

  const fillDemoCredentials = (role: "admin" | "manager" | "customer") => {
    const credentials = {
      admin: { email: "admin@app.com", password: "password123" },
      manager: { email: "manager@app.com", password: "password123" },
      customer: { email: "customer@app.com", password: "password123" },
    };
    const { email: demoEmail, password: demoPassword } = credentials[role];
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6B3E26] to-[#9C6B4A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F562ab4a0fd0a4cbdb2356bc1d15ae09f%2Fc57dc195ba544a7f8fb75b5b0c07efa7?format=webp&width=800"
                alt="La VDN"
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-3xl font-playfair font-bold text-[#6B3E26] mb-2">
              VDN Admin
            </h1>
            <p className="text-[#999999] font-lato">
              Tableau de bord administration
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label className="text-[#6B3E26] font-lato font-semibold text-sm">
                Email
              </Label>
              <Input
                type="email"
                placeholder="admin@app.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 border-[#9C6B4A] font-lato"
                required
              />
            </div>

            <div>
              <Label className="text-[#6B3E26] font-lato font-semibold text-sm">
                Mot de passe
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 border-[#9C6B4A] font-lato"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full h-12 bg-[#F58220] hover:bg-[#E06E10] text-white font-playfair font-bold text-lg uppercase"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-8 border-t border-[#D4AF37]">
            <p className="text-center text-sm font-lato text-[#666666] mb-4">
              Identifiants de test
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials("admin")}
                className="w-full px-4 py-2 text-sm font-lato border-2 border-[#F58220] text-[#F58220] hover:bg-[#F58220] hover:text-white rounded transition-colors"
              >
                👨‍💼 Admin
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials("manager")}
                className="w-full px-4 py-2 text-sm font-lato border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white rounded transition-colors"
              >
                📊 Manager
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials("customer")}
                className="w-full px-4 py-2 text-sm font-lato border-2 border-[#9C6B4A] text-[#9C6B4A] hover:bg-[#9C6B4A] hover:text-white rounded transition-colors"
              >
                👤 Client
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-[#F5F5F5] rounded-lg">
            <p className="text-xs font-lato text-[#666666] text-center">
              Tous les identifiants utilisent le mot de passe:{" "}
              <strong>password123</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
