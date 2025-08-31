import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowLeft, Shield, Clock, Zap, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const CheckoutEssencial = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    paymentMethod: 'PIX' // PIX ou CREDIT_CARD
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

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
    // Clear submit error
    if (submitError) {
      setSubmitError('');
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
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitError('');

    try {
      console.log('🔗 Conectando em: https://back-production-2560.up.railway.app/api/create-subscription');
    
      const response = await fetch('https://back-production-2560.up.railway.app/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          cpf: formData.cpf.replace(/\D/g, ''), // Remove formatação
          email: formData.email,
          telefone: formData.telefone.replace(/\D/g, ''), // Remove formatação
          paymentMethod: formData.paymentMethod,
          planType: 'ESSENCIAL',
          amount: 97.00
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Pagamento criado:', data);
        
        // Redirecionar para o link de pagamento do Asaas
        if (data.invoiceUrl) {
          console.log('🔗 Redirecionando para:', data.invoiceUrl);
          window.location.href = data.invoiceUrl;
        } else {
          console.error('❌ Link de pagamento não encontrado:', data);
          setSubmitError('Erro ao gerar link de pagamento. Tente novamente.');
        }
      } else {
        console.error('❌ Erro na resposta:', data);
        setSubmitError(data.error || data.message || 'Erro ao processar pagamento');
      }
    } catch (error) {
      console.error('❌ Erro no checkout:', error);
      setSubmitError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const essentialFeatures = [
    "🤖 Respostas automáticas com IA",
    "📅 Confirmação e lembretes básicos de agendamento",
    "⚡ Suporte digital ágil"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-muted/30">
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
              <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                PACOTE ESSENCIAL
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Finalize sua assinatura
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Preencha seus dados para continuar com o Pacote Essencial
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Plan Summary */}
          <div className="lg:order-2">
            <Card className="sticky top-8 border-2 border-primary/20 shadow-xl">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      Pacote Essencial
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Atendimento automatizado no WhatsApp
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-foreground">R$97</div>
                    <div className="text-sm text-muted-foreground">/mês</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">O que está incluído:</h4>
                  {essentialFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
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
                    <span>Suporte técnico incluído</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Sem taxa de instalação</span>
                  </div>
                </div>

                {/* Target */}
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Ideal para:</span> Pequenos negócios que querem começar com automação sem investir muito
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
                  {/* Error Message */}
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-sm text-red-600 font-medium">❌ {submitError}</p>
                    </div>
                  )}

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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                      />
                      {errors.telefone && (
                        <p className="text-sm text-red-500">{errors.telefone}</p>
                      )}
                    </div>

                    {/* Meio de Pagamento */}
                    <div className="space-y-3">
                      <Label>Forma de pagamento *</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'PIX' }))}
                          disabled={isLoading}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.paymentMethod === 'PIX' 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-border hover:border-primary/40'
                          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                          disabled={isLoading}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.paymentMethod === 'CREDIT_CARD' 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-border hover:border-primary/40'
                          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full h-12 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processando...
                      </div>
                    ) : (
                      'Continuar para o Pagamento'
                    )}
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

export default CheckoutEssencial;