import { useState } from "react";
import { Button } from "@/components/ui/button-variants";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LeadCapture = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    ramo: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    const newRequest = {
      id: Date.now().toString(),
      nome: formData.nome,
      whatsapp: formData.whatsapp,
      ramo: formData.ramo,
      timestamp: new Date().toISOString(),
      contacted: false
    };
    
    const existingRequests = localStorage.getItem("lead_capture_requests");
    const requests = existingRequests ? JSON.parse(existingRequests) : [];
    requests.push(newRequest);
    localStorage.setItem("lead_capture_requests", JSON.stringify(requests));
    
    console.log("Form submitted and saved:", newRequest);
    
    // Show success message
    toast({
      title: "Dados salvos com sucesso!",
      description: "Suas informações foram registradas e você será redirecionado para o WhatsApp.",
    });
    
    // Redirecionar para WhatsApp ou página de diagnóstico
    const message = `Olá! Quero descobrir quantos clientes estou perdendo no WhatsApp. Meus dados: Nome: ${formData.nome}, Ramo: ${formData.ramo}`;
    window.open(`https://wa.me/seunumero?text=${encodeURIComponent(message)}`, '_blank');
    
    // Reset form after a small delay
    setTimeout(() => {
      setFormData({ nome: "", whatsapp: "", ramo: "" });
    }, 1000);
  };

  const businessTypes = [
    "Barbearia/Salão",
    "Clínica/Consultório", 
    "Loja de Roupas",
    "Restaurante",
    "Academia",
    "Oficina/Mecânica",
    "Estética",
    "Advocacia",
    "Contabilidade",
    "Imobiliária",
    "E-commerce",
    "Outro"
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-surface to-primary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-6">
                <div className="inline-block animate-bounce-in [animation-delay:0.3s] opacity-0 [animation-fill-mode:forwards]">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 animate-pulse-glow">
                    Diagnóstico Gratuito
                  </span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight animate-fade-up [animation-delay:0.5s] opacity-0 [animation-fill-mode:forwards]">
                  Descubra quantos{" "}
                  <span className="text-gradient animate-wave [animation-delay:1s]">clientes você perde</span>{" "}
                  no WhatsApp
                </h2>
                
                <p className="text-xl text-muted-foreground leading-relaxed animate-slide-up [animation-delay:0.7s] opacity-0 [animation-fill-mode:forwards]">
                  Responda 3 perguntas rápidas e receba o diagnóstico personalizado em 1 minuto.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border animate-zoom-in [animation-delay:0.9s] opacity-0 [animation-fill-mode:forwards] hover:scale-105 hover:shadow-glow transition-smooth">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center animate-pulse-glow">
                    <Calculator className="w-5 h-5 text-primary animate-bounce" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Análise Precisa</p>
                    <p className="text-xs text-muted-foreground">Baseada em dados reais</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border animate-zoom-in [animation-delay:1.1s] opacity-0 [animation-fill-mode:forwards] hover:scale-105 hover:shadow-glow transition-smooth">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center animate-pulse-glow [animation-delay:0.5s]">
                    <TrendingUp className="w-5 h-5 text-primary animate-bounce [animation-delay:0.2s]" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Potencial de Crescimento</p>
                    <p className="text-xs text-muted-foreground">Oportunidades identificadas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="relative animate-slide-in-right [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
              {/* Enhanced Glow effect */}
              <div className="absolute -inset-1 gradient-hero rounded-2xl opacity-20 blur-xl animate-pulse-glow"></div>
              <div className="absolute -inset-2 gradient-hero rounded-2xl opacity-10 blur-2xl animate-pulse-glow [animation-delay:1s]"></div>
              
              <div className="relative bg-surface border border-border rounded-2xl p-8 shadow-xl hover:shadow-hero transition-smooth">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      Diagnóstico Gratuito
                    </h3>
                    <p className="text-muted-foreground">
                      Preencha os dados abaixo e descubra seu potencial
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Seu nome
                      </label>
                      <Input
                        type="text"
                        placeholder="Digite seu nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        WhatsApp
                      </label>
                      <Input
                        type="tel"
                        placeholder="(xx) xxxxx-xxxx"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Ramo do negócio
                      </label>
                      <Select 
                        value={formData.ramo} 
                        onValueChange={(value) => setFormData({...formData, ramo: value})}
                      >
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Selecione seu ramo" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="hero" 
                    className="w-full group"
                    disabled={!formData.nome || !formData.whatsapp || !formData.ramo}
                  >
                    Receber diagnóstico gratuito
                    <div className="ml-2 transition-transform group-hover:translate-x-1">→</div>
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    ✅ 100% gratuito • ✅ Sem compromisso • ✅ Resposta em 1 minuto
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;