const Offer = () => {
  const packages = [
    {
      name: "Pacote Essencial",
      price: "97",
      focus: "Atendimento automatizado no WhatsApp",
      target: "Pequenos negócios que querem começar com automação sem investir muito",
      features: [
        "🤖 Respostas automáticas com IA",
        "📅 Confirmação e lembretes básicos de agendamento",
        "⚡ Suporte digital ágil"
      ],
      isPopular: false
    },
    {
      name: "Pacote Completo",
      price: "147",
      originalPrice: "197",
      focus: "Ecossistema completo de crescimento automatizado",
      target: "Negócios que querem mais controle, mais vendas e mais inteligência trabalhando por eles",
      features: [
        "🤖 Respostas automáticas com IA",
        "📅 Confirmação e lembretes básicos de agendamento",
        "⚡ Suporte digital ágil",
        "📅 Agendamentos e lembretes automáticos ('Agenda Inteligente')",
        "📈 Automação de Vendas & Follow-up ('Esteira Invisível de Vendas')",
        "📊 Relatórios semanais no WhatsApp",
        "📂 Organização em planilhas inteligentes ou mini-CRM"
      ],
      isPopular: true
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          {/* Header */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Escolha o plano ideal para seu negócio
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluções de inteligência artificial para transformar seu atendimento no WhatsApp
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <div key={index} className={`relative ${pkg.isPopular ? 'scale-105' : ''}`}>
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full shadow-lg">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                {/* Glow effect for popular */}
                {pkg.isPopular && (
                  <div className="absolute -inset-1 gradient-hero rounded-2xl opacity-20 blur-xl"></div>
                )}
                
                <div className={`relative bg-surface border rounded-2xl p-8 shadow-xl h-full ${
                  pkg.isPopular ? 'border-primary/50' : 'border-border'
                }`}>
                  <div className="space-y-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="text-center space-y-4">
                      <h3 className="text-2xl font-bold text-foreground">{pkg.name}</h3>
                      <div className="flex items-center justify-center gap-2">
                        {pkg.originalPrice && (
                          <span className="text-xl text-muted-foreground line-through">R${pkg.originalPrice}</span>
                        )}
                        <span className="text-4xl lg:text-5xl font-bold text-foreground">R${pkg.price}</span>
                        <span className="text-lg text-muted-foreground">/mês</span>
                      </div>
                      <p className="text-sm font-medium text-primary">{pkg.focus}</p>
                    </div>

                    {/* Features */}
                    <div className="flex-1 space-y-4">
                      {pkg.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3 text-left">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Target */}
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <p className="text-sm text-muted-foreground">
                        <strong>Ideal para:</strong> {pkg.target}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="space-y-4 pt-4">
                      <Button 
                        variant={pkg.isPopular ? "hero" : "outline"}
                        size="hero"
                        className="w-full group"
                        onClick={() => window.open('https://wa.me/seunumero', '_blank')}
                      >
                        Escolher {pkg.name}
                        <div className="ml-2 transition-transform group-hover:translate-x-1">→</div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom guarantee */}
          <div className="text-center pt-8">
            <p className="text-lg text-muted-foreground">
              ✅ Implementação em até 7 dias • ✅ Garantia de 30 dias • ✅ Sem contrato de fidelidade
            </p>
          </div>
        </div>
      </div>
    </section>
  );
