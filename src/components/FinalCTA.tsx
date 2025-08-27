import { Button } from "@/components/ui/button-variants";
import { CheckCircle, Clock, Shield } from "lucide-react";

const FinalCTA = () => {
  const guarantees = [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Garantia de 30 dias"
    },
    {
      icon: <Clock className="w-5 h-5" />, 
      text: "Implementação em 7 dias"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Suporte especializado"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-dark via-dark/95 to-primary/20 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 gradient-glow rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-128 h-128 gradient-glow rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-medium text-primary-light bg-primary-light/10 px-4 py-2 rounded-full border border-primary-light/20">
                Última Chance
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
              Pronto para ter um{" "}
              <span className="bg-gradient-to-r from-primary-light to-white bg-clip-text text-transparent">
                assistente inteligente
              </span>{" "}
              que trabalha por você?
            </h2>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Não deixe seus concorrentes saírem na frente. Seja o primeiro do seu segmento a ter IA trabalhando 24/7 no seu negócio.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 py-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary-light">24/7</div>
              <div className="text-gray-300">Atendimento ativo</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary-light">37%</div>
              <div className="text-gray-300">Mais agendamentos</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary-light">7 dias</div>
              <div className="text-gray-300">Para implementar</div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-8">
            <div className="relative">
              <Button 
                variant="hero" 
                size="hero"
                className="text-xl px-16 py-6 h-auto bg-white text-dark hover:bg-gray-100 shadow-2xl hover:shadow-white/20 group"
                onClick={() => window.open('https://wa.me/seunumero', '_blank')}
              >
                Quero meu promptAI agora
                <div className="ml-3 text-2xl transition-transform group-hover:translate-x-1">→</div>
              </Button>
              
              {/* Pulse effect */}
              <div className="absolute -inset-2 bg-white/20 rounded-2xl animate-ping opacity-75"></div>
            </div>

            {/* Guarantees */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  <div className="text-primary-light">
                    {guarantee.icon}
                  </div>
                  <span>{guarantee.text}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Mais de 50 empresas já transformaram seu atendimento com o promptAI. 
              Sua vez de crescer com inteligência artificial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;