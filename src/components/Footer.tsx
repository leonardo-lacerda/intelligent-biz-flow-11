const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { name: "Sobre", href: "#about" },
    { name: "Política de Privacidade", href: "#privacy" },
    { name: "Termos de Uso", href: "#terms" },
    { name: "Contato", href: "#contact" }
  ];

  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 pb-8 border-b border-gray-700">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">pAI</span>
                </div>
                <span className="text-2xl font-bold">promptAI</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                Inteligência invisível que faz seu negócio crescer. 
                IA aplicada aos negócios locais.
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contato</h3>
              <div className="space-y-2 text-gray-400">
                <p>WhatsApp: (27) 98127-1965</p>
                <p>Email: contato@promptai.com.br</p>
                <p>Vitória, ES - Brasil</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Links Rápidos</h3>
              <div className="grid grid-cols-2 gap-2">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-primary-light transition-smooth text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {currentYear} promptAI. Todos os direitos reservados.</p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Sistema operando normalmente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;