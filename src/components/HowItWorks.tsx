import { MousePointer, FileText, Zap, Rocket } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      icon: <MousePointer className="w-6 h-6" />,
      title: "Clique e assine",
      description: "Processo rápido e simples. Escolha seu plano e comece imediatamente."
    },
    {
      number: "2", 
      icon: <FileText className="w-6 h-6" />,
      title: "Preencha os dados do seu negócio",
      description: "Conte sobre seu negócio, clientes e processos para personalizar a IA."
    },
    {
      number: "3",
      icon: <Zap className="w-6 h-6" />,
      title: "Ative seu agente inteligente", 
      description: "Conectamos e configuramos tudo no seu WhatsApp Business."
    },
    {
      number: "4",
      icon: <Rocket className="w-6 h-6" />,
      title: "Sistema rodando sozinho",
      description: "Em até 1 dia, sua IA estará atendendo clientes 24/7 automaticamente."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-block">
              <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                Processo Simples
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Como funciona?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              4 passos simples para ter inteligência artificial trabalhando no seu negócio
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                )}
                
                <div className="text-center space-y-6">
                  {/* Step Number */}
                  <div className="relative mx-auto w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-glow transition-smooth">
                    {step.number}
                    
                    {/* Icon overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline indicator for mobile */}
          <div className="lg:hidden flex justify-center">
            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-0.5 bg-primary/30 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;