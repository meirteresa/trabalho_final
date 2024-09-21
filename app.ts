import { Usuario, Publicacao, TipoInteracao, RedeSocial } from './classes';
import { AplicacaoError, ValorInvalidoError } from './excecoes';

const promptSync = require('prompt-sync');
class App {
    private _rede: RedeSocial;
    private _input: any; 

    constructor() {
        this._rede = new RedeSocial();
        this._input = promptSync(); 
    }

    menu() {

        let op: string = "";
        let email: string;
        
        do {
            this.listarOpcoes();
            try {
            op = this._input('    Digite uma opção: ');
            console.log("\n\n┖---------------------------------------------------------------------┚");

            switch (op) {
                case "1":
                    this.imprimirPressionarEnter();
                    this.cadastrar();
                    break;
                case "2":
                    this.imprimirPressionarEnter();
                    this.publicar();
                    break;
                case "3":
                    this.imprimirPressionarEnter();         
                    this.interagir();
                    break;
                case "4":
                    this.imprimirPressionarEnter();
                    this.feed();
                    break;
                case "5":
                    this.imprimirPressionarEnter();
                    this.excluirPost();
                    break;
                case "6":
                    this.imprimirPressionarEnter();
                    this.excluirConta();
                    break;
                case "7":
                    this.imprimirPressionarEnter();       
                    this.pesquisarPerfil();
                    break;
                case "8":
                    this.imprimirPressionarEnter();
                    this.notificacoes();
                    break;
                case "9":
                    this.imprimirPressionarEnter();
                    this.editar();
                    break;
                case "10":
                    this.imprimirPressionarEnter();
                    this.ativacao();
                }                
            } catch (e) {
                if (e instanceof AplicacaoError) {
                    console.log(e.message);
                } else {
                    console.log(`\x1b[31m\n\n    ${e}\x1b[0m`);
                }
                this.imprimirPressionarEnter();
            }
        } while (op != "0");
        
        console.log("\x1b[33m\n    Aplicação Encerrada\n\x1b[0m");
    }

    private listarOpcoes() {
        console.log("\n┎---------------------------------------------------------------------┒\n");
        console.log('\n    Bem vindo!\n');
        console.log('    1 - Abrir Conta          2 - Publicar         3 - Interagir\n' +
            '    4 - Feed                 5 - Excluir Post     6 - Excluir Conta\n' +
            '    7 - Pesquisar Perfil     8 - Notificações     9 - Editar Post\n' +
            '    10 - Desativar/Ativar    0 - Sair\n\n');
    }

    private cadastrar() {
        console.log("\n┎--------------------------------------------------┒ \
\n\n    # Abrir conta\n");

        let apelido: string = this._input('    Apelido: ');
        if (apelido.trim() === "") {
            throw new ValorInvalidoError("O apelido do usuário não pode ser vazio.");
        }

        let documento: string = this._input('    Digite seu cpf: ');
        if (documento.trim() === "" || !this._rede.isValidCPF(documento)) {
            throw new ValorInvalidoError("CPF inválido.");
        }
        let email: string = this._input('    Digite o email: ');
        if (email.trim() === "" || !this._rede.isValidEmail(email)) {
            throw new ValorInvalidoError("Email inválido.");
        }
        
        console.log("\n┖--------------------------------------------------┚\n");

        this._rede.cadastrarUsuario(email, apelido, documento);
        this.imprimirPressionarEnter();
    }

    private publicar() {
        console.log("\n┎--------------------------------------------------┒ \
\n\n    # Publicar\n");

        let opcaoPost: string = this._input('    Informe o tipo (1 - Simples, 2 - Avançada): ');
        if (opcaoPost != "1" && opcaoPost != "2") {
            throw new ValorInvalidoError("Opção inválida.");
        }

        let email: string = this._input('    Digite o email: ');
        let usuario: Usuario = this._rede.consultarUsuario(email);

        let conteudo: string = this._input('    O que você está pensando? ');
        if (conteudo.length > 100) {
            throw new ValorInvalidoError("Você excedeu o limite de caracteres.");
        }

        console.log("\n┖--------------------------------------------------┚\n");

        this._rede.postarPublicacao(opcaoPost, usuario, conteudo);
        this.imprimirPressionarEnter();
    }

    private interagir(){
        console.log("\n┎--------------------------------------------------┒ \
\n\n    # Interagir\n");

        let email: string = this._input('    Digite seu email: ');
        let usuario: Usuario = this._rede.consultarUsuario(email);

        this._rede.listarPublicacoes();

        console.log("\n\n");

        let id: number = this._input('    Id da publicação que deseja interagir: ');
        let publicacao: Publicacao = this._rede.validarTipoPublicacao(id); 

        console.log(`\n    1 - ${TipoInteracao.curtir}  2 - ${TipoInteracao.naoCurtir}  3 - ${TipoInteracao.risos}  4 - ${TipoInteracao.surpresa}  5 - ${TipoInteracao.chorando}\n`);
        let tipo: string = this._input('    >>> ');
        
        if (tipo != "1" && tipo != "2" && tipo != "3" && tipo != "4" && tipo != "5") {
            throw new ValorInvalidoError("Reação inválida.");
        }
        
        console.log("\n┖--------------------------------------------------┚\n");

        this._rede.interagirComPost(usuario, publicacao, tipo);
        this.imprimirPressionarEnter();        
    }

    private excluirPost(){
        console.log("\n┎--------------------------------------------------┒ \
\n\n    # Excluir Post\n");
        let email: string = this._input('    Digite o email: ');
        let usuario: Usuario = this._rede.consultarUsuario(email);
        
        this._rede.listarTodas(usuario);
        console.log("\n");
        
        let id: number = this._input('    Digite o id do post a ser excluido: ');
        let publicacao: Publicacao = this._rede.consultarPublicacao(id);

        if(usuario.id != publicacao.usuario.id){
            throw new ValorInvalidoError("Você não tem acesso a esse post.");
        }
        
        console.log("\n┖--------------------------------------------------┚\n");

        this._rede.excluirPostId(id);
        console.log(`\n\n    Post ${id} excluído com sucesso!`);
        this.imprimirPressionarEnter();
    }
    

    private excluirConta(){
        console.log("\n┎--------------------------------------------------┒ \
\n\n    # Excluir Conta\n");

        let email: string = this._input('    Digite o email da conta a ser excluida: ');
        let usuario: Usuario = this._rede.consultarUsuario(email);
        
        console.log("\n┖--------------------------------------------------┚\n");

        this._rede.excluirContaEmail(usuario);
        this.imprimirPressionarEnter();
    }
    
    private pesquisarPerfil(){
        console.log("\n┎--------------------------------------------------┒ \
\n\n    # Pesquisar Perfil\n");

        let email: string = this._input('    Digite o email: ');
        
        console.log("\n┖--------------------------------------------------┚\n");

        this._rede.pesquisarUsuario(email);
        this.imprimirPressionarEnter();
    }

    private feed(){
        console.log("\n┎--------------------------------------------------┒ \
\n\n    # Feed");

        this._rede.listarPublicacoes();

        console.log("\n\n\n┖--------------------------------------------------┚\n");
        this.imprimirPressionarEnter();
    }

    private notificacoes(){
        console.log("\n┎--------------------------------------------------┒ \
\n\n    # Notificações");

        let email: string = this._input('    Digite o seu email: ');
        let usuario: Usuario = this._rede.consultarUsuario(email);
                
        console.log("\n┖--------------------------------------------------┚\n");

        this._rede.listarInteracoes(usuario);
        this.imprimirPressionarEnter();
    }

    private editar(){
        console.log("\n┎--------------------------------------------------┒ \
\n\n    # Editar Post");

        let email: string = this._input('    Digite o seu email: ');
        let usuario: Usuario = this._rede.consultarUsuario(email);

        this._rede.listarTodas(usuario);
        console.log("\n");
        
        let id: number = this._input('    Digite o id do post a ser editado: ');
        let publicacao: Publicacao = this._rede.consultarPublicacao(id);
        if(usuario.id != publicacao.usuario.id){
            throw new ValorInvalidoError("Você não tem acesso a esse post.");
        }
        
        let conteudo: string = this._input('    O que você está pensando? ');
        if (conteudo.length > 100) {
            throw new ValorInvalidoError("Você excedeu o limite de caracteres.");
        }
                
        console.log("\n┖--------------------------------------------------┚\n");

        this._rede.editarPublicacao(publicacao, conteudo);
        this.imprimirPressionarEnter();
    }

    private ativacao(){
        console.log("\n┎--------------------------------------------------┒ \
\n\n    # Desativar/Ativar");

        console.log(`\n    1 - Desativar  2 - Ativar \n`);
        let opcao: string = this._input('    >>> ');

        if (opcao != "1" && opcao != "2") {
            throw new ValorInvalidoError("Opção inválida.");
        }

        let email: string = this._input('    Digite o seu email: ');
        let usuario: Usuario = this._rede.consultarUsuario(email);
            
        console.log("\n┖--------------------------------------------------┚\n");

        this._rede.desativarAtivar(usuario, opcao);
        this.imprimirPressionarEnter();
    }

    private imprimirPressionarEnter() {
        console.log();
        this._input("\x1b[36m    Pressione <enter>\x1b[0m");
        console.clear();
    }
}

export { App }
