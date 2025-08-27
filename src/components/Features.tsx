import { Zap, Calendar, TrendingUp, BarChart3, Database, Headphones } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Esteira Invisível de Vendas",
      subtitle: "Automação de Vendas & Follow-up",
      description: [
        "Follow-up automático: lembretes no WhatsApp para clientes que pediram orçamento mas não fecharam",
        "Upsell / Cross-sell automático: cliente que comprou X recebe sugestão de Y",
        "Carrinho abandonado: sistema lembra o cliente para concluir compra"
      ]
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Agenda Inteligente", 
      subtitle: "Agendamentos Automatizados",
      description: [
        "Integração com Google Calendar → evita overbooking",
        "Confirmação automática → cliente recebe lembrete 24h antes",
        "Reativação de cliente antigo → se não agenda há 30 dias, recebe mensagem automática"
      ]
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "IA Conversacional",
      subtitle: "Atendimento 24/7 no WhatsApp",
      description: [
        "Responde dúvidas frequentes automaticamente",
        "Qualifica leads e direcionamentos inteligentes", 
        "Aprende com suas respostas para melhorar continuamente"
      ]
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Relatórios Inteligentes",
      subtitle: "Dados que importam",
      description: [
        "Relatórios semanais enviados direto no WhatsApp",
        "Métricas de conversão e performance de atendimento",
        "Insights acionáveis para crescimento do negócio"
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Organização Automática",
      subtitle: "Mini-CRM Integrado",
      description: [
        "Dados dos clientes organizados automaticamente",
        "Histórico completo de conversas e interações",
        "Sincronização com planilhas e sistemas existentes"
      ]
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Suporte Especializado",
      subtitle: "100% Digital e Ágil",
      description: [
        "Implementação guiada passo a passo",
        "Suporte técnico via WhatsApp",
        "Ajustes e otimizações contínuas"
      ]
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-6 animate-fade-up">
            <div className="inline-block animate-bounce-in [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards]">
              <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-glow animate-pulse-glow">
                Recursos Avançados
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground animate-slide-up [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
              Inteligência que trabalha{" "}
              <span className="text-gradient animate-wave">por você</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in [animation-delay:0.6s] opacity-0 [animation-fill-mode:forwards]">
              Não somos só automação — somos inteligência artificial aplicada aos negócios locais
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-8 rounded-2xl border border-border hover:border-primary/30 transition-smooth bg-surface hover:shadow-lg animate-elastic-in opacity-0 [animation-fill-mode:forwards] hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${0.8 + index * 0.2}s` }}
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white group-hover:shadow-glow transition-smooth group-hover:rotate-12 group-hover:scale-110 animate-rotate-in [animation-delay:0.3s]">
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-primary font-medium">
                        {feature.subtitle}
                      </p>
                    </div>
                    
                    <ul className="space-y-2">
                      {feature.description.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;