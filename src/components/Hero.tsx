import { Button } from "@/components/ui/button-variants";
import PhoneAnimation from "@/components/PhoneAnimation";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-surface to-neutral">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-glow rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-128 h-128 gradient-glow rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                  Inteligência invisível que faz seu negócio crescer
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Seu negócio com{" "}
                <span className="text-gradient">inteligência artificial</span>{" "}
                no WhatsApp
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Um sistema que nunca dorme, nunca esquece e nunca deixa um cliente sem resposta.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="hero"
                className="group"
                onClick={() => window.open('https://wa.me/seunumero', '_blank')}
              >
                Quero meu promptAI agora
                <div className="ml-2 transition-transform group-hover:translate-x-1">→</div>
              </Button>
              
              <Button variant="outline-hero" size="hero">
                Ver demonstração
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Sistema ativo 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>Implementação em 7 dias</span>
              </div>
            </div>
          </div>
          
          {/* Phone Animation */}
          <div className="relative animate-scale-in delay-300 flex justify-center">
            <PhoneAnimation />
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;