import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button-variants";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Phone, UserCheck, Calendar, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  id: string;
  nome: string;
  whatsapp: string;
  ramo: string;
  timestamp: string;
  contacted: boolean;
}

const AdminRequests = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [requests, setRequests] = useState<FormData[]>([]);
  const { toast } = useToast();

  const correctPassword = "H34sgeR234HGewr!$#@";

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem("admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadRequests();
    }
    
    // Also load requests when component mounts if authenticated
    if (isAuthenticated) {
      loadRequests();
    }
  }, [isAuthenticated]);

  const loadRequests = () => {
    const savedRequests = localStorage.getItem("lead_capture_requests");
    console.log("Loading requests from localStorage:", savedRequests);
    if (savedRequests) {
      const parsedRequests = JSON.parse(savedRequests);
      console.log("Parsed requests:", parsedRequests);
      setRequests(parsedRequests);
    } else {
      console.log("No requests found in localStorage");
      setRequests([]);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      console.log("Login successful, loading requests...");
      loadRequests();
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao painel administrativo"
      });
    } else {
      toast({
        title: "Senha incorreta",
        description: "Tente novamente",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
    setPassword("");
  };

  const toggleContactStatus = (id: string) => {
    const updatedRequests = requests.map(request =>
      request.id === id ? { ...request, contacted: !request.contacted } : request
    );
    setRequests(updatedRequests);
    localStorage.setItem("lead_capture_requests", JSON.stringify(updatedRequests));
    
    const request = updatedRequests.find(r => r.id === id);
    toast({
      title: request?.contacted ? "Marcado como contatado" : "Marcado como não contatado",
      description: `${request?.nome} - ${request?.contacted ? "Contato realizado" : "Aguardando contato"}`
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  const formatWhatsApp = (whatsapp: string) => {
    return whatsapp.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <Card className="border-border shadow-xl">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-foreground">
                Painel Administrativo
              </CardTitle>
              <p className="text-muted-foreground">
                Digite a senha para acessar os dados das solicitações
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite a senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <Button type="submit" variant="hero" size="hero" className="w-full">
                  Entrar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Solicitações de Diagnóstico
            </h1>
            <p className="text-muted-foreground mt-2">
              Total: {requests.length} solicitações | Contatados: {requests.filter(r => r.contacted).length}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={loadRequests} variant="outline">
              Recarregar Dados
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Sair
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{requests.length}</p>
                  <p className="text-sm text-muted-foreground">Total de Solicitações</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{requests.filter(r => r.contacted).length}</p>
                  <p className="text-sm text-muted-foreground">Contatados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{requests.filter(r => !r.contacted).length}</p>
                  <p className="text-sm text-muted-foreground">Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {requests.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Nenhuma solicitação ainda
                </h3>
                <p className="text-muted-foreground">
                  As solicitações de diagnóstico aparecerão aqui quando os usuários preencherem o formulário.
                </p>
              </CardContent>
            </Card>
          ) : (
            requests
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map((request) => (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-foreground">
                            {request.nome}
                          </h3>
                          <Badge 
                            variant={request.contacted ? "default" : "secondary"}
                            className={request.contacted ? "bg-green-500" : "bg-orange-500"}
                          >
                            {request.contacted ? "Contatado" : "Pendente"}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-foreground font-medium">
                              {formatWhatsApp(request.whatsapp)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 text-muted-foreground">🏢</span>
                            <span className="text-foreground">
                              {request.ramo}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {formatDate(request.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => toggleContactStatus(request.id)}
                        variant={request.contacted ? "outline" : "hero"}
                        size="sm"
                        className="shrink-0"
                      >
                        {request.contacted ? "Marcar como não contatado" : "Marcar como contatado"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRequests;