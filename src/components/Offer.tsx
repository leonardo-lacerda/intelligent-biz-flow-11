import { Button } from "@/components/ui/button-variants";
import { Check } from "lucide-react";

const Offer = () => {
  const features = [
    "🤖 Atendimento automatizado com IA no WhatsApp",
    "📅 Agendamentos e lembretes automáticos com 'Agenda Inteligente'",
    "📈 Automação de Vendas & Follow-up com 'Esteira Invisível de Vendas'",
    "📊 Relatórios semanais no WhatsApp",
    "📂 Organização em planilhas inteligentes ou mini-CRM",
    "⚡ Suporte 100% digital e ágil"
  ];

  return (
    <section id="pricing" className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          {/* Header */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                Plano Único
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Tudo que seu negócio precisa
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma solução completa de inteligência artificial para transformar seu atendimento no WhatsApp
            </p>
          </div>

          {/* Pricing Card */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 gradient-hero rounded-2xl opacity-20 blur-xl"></div>
            
            <div className="relative bg-surface border border-border rounded-2xl p-8 lg:p-12 shadow-xl">
              <div className="space-y-8">
                {/* Price */}
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-5xl lg:text-6xl font-bold text-foreground">R$197</span>
                    <span className="text-xl text-muted-foreground">/mês</span>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    Implementação em até 7 dias • Sem contrato de fidelidade
                  </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl hover:bg-muted/50 transition-smooth">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground text-left">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="space-y-4 pt-4">
                  <Button 
                    variant="hero" 
                    size="hero"
                    className="w-full group"
                    onClick={() => window.open('https://wa.me/seunumero', '_blank')}
                  >
                    Assine agora e implemente em até 7 dias
                    <div className="ml-2 transition-transform group-hover:translate-x-1">→</div>
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    ✅ Garantia de 30 dias • ✅ Suporte especializado • ✅ Resultados em 1 semana
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;