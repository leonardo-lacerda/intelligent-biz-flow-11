import { Button } from "@/components/ui/button-variants";
import { CheckCircle, Clock, Shield } from "lucide-react";

const FinalCTA = () => {
  const guarantees = [
    {
      icon: <Clock className="w-5 h-5" />, 
      text: "Implementação em 1 dia"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Suporte especializado"
    }
  ];

  return (
    <section className="py-24 bg-dark text-white relative overflow-hidden">
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
            
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
              Pronto para ter um{" "}
              <span className="bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
                assistente inteligente
              </span>{" "}
              que trabalha por você?
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
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
              <div className="text-4xl font-bold text-primary-light">87%</div>
              <div className="text-gray-300">Mais agendamentos</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary-light">1 dia</div>
              <div className="text-gray-300">Para implementar</div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-8">
            <div className="relative w-full max-w-sm mx-auto">
              <button 
                className="w-full text-xl sm:text-2xl lg:text-1xl px-6 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 h-auto bg-green-500 text-white hover:bg-green-600 font-bold rounded-2xl shadow-2xl hover:shadow-green-500/20 group transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer relative z-10"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open('https://promptaai.com.br/checkout/completo');
                }}
              >
                <span className="flex items-center justify-center">
                  Quero meu promptAI agora
                  <span className="ml-2 sm:ml-3 text-lg sm:text-xl lg:text-2xl transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110">
                    →
                  </span>
                </span>
              </button>
              
              {/* Pulse effect */}
              <div className="absolute -inset-2 bg-green-500/20 rounded-2xl animate-ping opacity-75 pointer-events-none"></div>
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