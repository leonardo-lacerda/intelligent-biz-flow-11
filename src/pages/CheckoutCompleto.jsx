import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowLeft, Shield, Clock, Zap, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const CheckoutCompleto = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    paymentMethod: 'PIX' // PIX ou CREDIT_CARD
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatCPF = (cpf) => {
    return cpf.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatPhone = (phone) => {
    return phone.replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (formData.cpf.replace(/\D/g, '').length !== 11) {
      newErrors.cpf = 'CPF deve ter 11 dígitos';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (formData.telefone.replace(/\D/g, '').length < 10) {
      newErrors.telefone = 'Telefone inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('https://your-backend-url.railway.app/api/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            planType: 'COMPLETO',
            amount: 147.00
          }),
        });

        const data = await response.json();
        
        if (response.ok && data.invoiceUrl) {
          // Redirecionar para o link de pagamento do Asaas
          window.location.href = data.invoiceUrl;
        } else {
          console.error('Erro ao criar link de pagamento:', data.error);
          // Aqui você pode adicionar um toast de erro
        }
      } catch (error) {
        console.error('Erro ao processar pagamento:', error);
        // Aqui você pode adicionar um toast de erro
      }
    }
  };

  const essentialFeatures = [
    "🤖 Respostas automáticas com IA",
    "📅 Confirmação e lembretes básicos de agendamento",
    "⚡ Suporte digital ágil"
  ];

  const completeFeatures = [
    "📅 Agendamentos e lembretes automáticos ('Agenda Inteligente')",
    "📈 Automação de Vendas & Follow-up ('Esteira Invisível de Vendas')",
    "📊 Relatórios semanais no WhatsApp",
    "📂 Organização em planilhas inteligentes ou mini-CRM"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-primary/5">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          
          <div className="text-center space-y-4">
            <div className="inline-block">
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">PACOTE COMPLETO - MAIS POPULAR</span>
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Finalize sua assinatura
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Preencha seus dados para continuar com o Pacote Completo
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Plan Summary */}
          <div className="lg:order-2">
            <Card className="sticky top-8 border-2 border-primary shadow-xl bg-gradient-to-b from-surface to-primary/5">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      Pacote Completo
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Ecossistema completo de crescimento automatizado
                    </CardDescription>
                    {/* Meio de Pagamento */}
                    <div className="space-y-3">
                      <Label>Forma de pagamento *</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'PIX' }))}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.paymentMethod === 'PIX' 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-border hover:border-primary/40'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className="text-2xl">🏦</div>
                            <span className="font-medium text-sm">PIX</span>
                            <span className="text-xs text-muted-foreground">Pagamento instantâneo</span>
                          </div>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'CREDIT_CARD' }))}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.paymentMethod === 'CREDIT_CARD' 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-border hover:border-primary/40'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className="text-2xl">💳</div>
                            <span className="font-medium text-sm">Cartão</span>
                            <span className="text-xs text-muted-foreground">Crédito ou débito</span>
                          </div>
                        </button>
                      </div>
                    </div>

                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-2">
                      <div className="text-3xl font-bold text-foreground">R$147</div>
                      <div className="text-sm text-muted-foreground">/mês</div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground line-through">antes R$197</span>
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-semibold border border-primary/20">
                        -R$50
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Savings Highlight */}
                <div className="bg-primary/10 border-2 border-primary/30 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-primary">Economize R$50/mês</p>
                      <p className="text-sm text-muted-foreground">R$600 de economia anual</p>
                    </div>
                  </div>
                </div>

                {/* Essential Features (Included) */}
                <div className="space-y-4">
                  <div className="bg-primary/5 border border-primary/20 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-primary">✅ Inclui tudo do Pacote Essencial:</p>
                  </div>
                  {essentialFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 opacity-70">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Complete Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Plus recursos exclusivos:</h4>
                  {completeFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center mt-0.5 flex-shrink-0 border border-primary/40">
                        <Check className="w-3 h-3 text-primary font-bold" />
                      </div>
                      <span className="text-foreground font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <div className="border-t border-border pt-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Implementação em até 7 dias</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>Suporte técnico premium</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Sem contrato de fidelidade</span>
                  </div>
                </div>

                {/* Target */}
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Ideal para:</span> Negócios que querem <span className="font-semibold text-primary">mais controle, mais vendas e mais inteligência</span> trabalhando por eles
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:order-1">
            <Card className="shadow-lg border border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Seus dados</CardTitle>
                <CardDescription>
                  Preencha as informações abaixo para continuar
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {/* Nome */}
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo *</Label>
                      <Input
                        id="nome"
                        name="nome"
                        type="text"
                        placeholder="Digite seu nome completo"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className={errors.nome ? "border-red-500" : ""}
                      />
                      {errors.nome && (
                        <p className="text-sm text-red-500">{errors.nome}</p>
                      )}
                    </div>

                    {/* CPF */}
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        name="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        value={formatCPF(formData.cpf)}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 11) {
                            handleInputChange({
                              target: { name: 'cpf', value }
                            });
                          }
                        }}
                        maxLength={14}
                        className={errors.cpf ? "border-red-500" : ""}
                      />
                      {errors.cpf && (
                        <p className="text-sm text-red-500">{errors.cpf}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    {/* Telefone */}
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        type="text"
                        placeholder="(00) 00000-0000"
                        value={formatPhone(formData.telefone)}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 11) {
                            handleInputChange({
                              target: { name: 'telefone', value }
                            });
                          }
                        }}
                        maxLength={15}
                        className={errors.telefone ? "border-red-500" : ""}
                      />
                      {errors.telefone && (
                        <p className="text-sm text-red-500">{errors.telefone}</p>
                      )}
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="bg-muted/50 border border-border p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          Seus dados estão seguros
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Utilizamos criptografia de ponta para proteger suas informações. 
                          Seus dados serão usados apenas para processar o pagamento.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Premium Features Reminder */}
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0 fill-current" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-primary">
                          Você escolheu o plano mais completo!
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Acesso total à automação avançada, relatórios inteligentes e suporte premium.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full h-12 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Continuar para o Pagamento
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Ao continuar, você concorda com nossos termos de serviço
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCompleto;