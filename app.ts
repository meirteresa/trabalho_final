import { readFileSync, writeFileSync } from 'fs';
import { RedeSocial } from './redesocial';
import { Usuario, Publicacao, PublicacaoAvancada, Interacao, TipoInteracao } from './classes';
import { AplicacaoError, ValorInvalidoError, UsuarioJaCadastradoError } from './excecoes';
const moment = require('moment-timezone');

const promptSync = require('prompt-sync');
class App {
    private _rede: RedeSocial;
    // private CAMINHO_ARQUIVO = './contas.txt'
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
            op = this._input('Digite uma opção: ');

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
                    this.stalkear();
                    break;
                }
            } catch (e) {
                if (e instanceof AplicacaoError) {
                    console.log(e.message); // "Ocorreu um erro na aplicação!"
                } else {
                    console.log("\n    " + e);
                }
                this.imprimirPressionarEnter();
            }
        } while (op != "0");
        
        console.log("\nAplicação Encerrada");
    }

    private listarOpcoes() {
        console.log('\nBem vindo!\n');
        console.log('1 - Abrir Conta       2 - Publicar            3 - Interagir\n' +
            '4 - Feed              5 - Excluir Post        6 - Excluir Conta\n' +
            '7 - Stalkear          0 - Sair\n\n');
    }

    private cadastrar() {
        console.log("\n┎--------------------------------------------------┒ \
\n\n    Abrir conta\n");

        let email: string = this._input('    Digite o email: ');
        if (email.trim() === "" || !this.isValidEmail(email)) {
            throw new ValorInvalidoError("Email inválido.");
        }

        for (let i: number = 0; i < this._rede.colecaoUsuarios.length; i++) {
            if (this._rede.colecaoUsuarios[i].email == email) {
                throw new UsuarioJaCadastradoError("Esse email já está cadastrado"); 
            }
        }

        let apelido: string = this._input('    Apelido: ');
        if (apelido.trim() === "") {
            throw new ValorInvalidoError("O apelido do usuário não pode ser vazio.");
        }

        let documento: string = this._input('    Digite seu cpf: ');
        if (documento.trim() === "" || !this.isValidCPF(documento)) {
            throw new ValorInvalidoError("CPF inválido.");
        }
        console.log("\n┖--------------------------------------------------┚\n");

        let usuario: Usuario = new Usuario(email, apelido, documento);

        this._rede.inserirUsuario(usuario);
        this.exibirContaUsuario(email);
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private isValidCPF(cpf: string): boolean {
        return cpf.length == 11;
    }
    
    private exibirContaUsuario(email: string, solicitarEnter: boolean = true) {
        let usuario: Usuario = this._rede.consultarUsuario(email);
        console.log(`\n\n@: ${usuario.apelido}\nEmail: ${usuario.email}\nId: ${usuario.id}\nDocumento: ${usuario.documento}`);
        
        console.log("\nConta criada com sucesso!");

        if (solicitarEnter) {
            this.imprimirPressionarEnter();
        }
    }

    private imprimirPressionarEnter() {
        console.log();
        this._input("Pressione <enter>");
        console.clear();
    }

    private publicar() {
        console.log("\n┎--------------------------------------------------┒ \
\n\n    Publicar\n");

        let opcaoPost: string = this._input('    Informe o tipo (1 - Simples, 2 - Avançada): ');
        if (opcaoPost != "1" && opcaoPost != "2") {
            throw new ValorInvalidoError("Opção de conta inválida.");
        }

        let email: string = this._input('    Digite o email: ');
        if (email.trim() === "" || !this.isValidEmail(email)) {
            throw new ValorInvalidoError("Email inválido.");
        }

        let usuario: Usuario = this._rede.consultarUsuario(email);

        let conteudo: string = this._input('    O que você está pensando? ');
        if (conteudo.length > 100) {
            throw new ValorInvalidoError("Você excedeu o limite de caracteres.");
        }

        console.log("\n┖--------------------------------------------------┚\n");

        let publicacao: Publicacao;
        let dataHora = moment().tz("America/Sao_Paulo").format('DD-MM-YYYY, HH:mm');

        if (opcaoPost == "1") {
            publicacao = new Publicacao(usuario, conteudo, dataHora);
        } else {
            let interacoes: Interacao[] = [];
            publicacao = new PublicacaoAvancada(usuario, conteudo, dataHora, interacoes);
        }

        this._rede.inserirPublicacao(publicacao);
        this.exibirPublicacao(publicacao.id);       
    }

    private exibirPublicacao(id: number, solicitarEnter: boolean = true) {
        let publicacao: Publicacao = this._rede.consultarPublicacao(id);
        if(publicacao instanceof PublicacaoAvancada){
            console.log(`\n    (${publicacao.id}) - @${publicacao.usuario.apelido} em ${publicacao.dataHora}:\n`);
            publicacao.mostrarConteudo();
            console.log();
            (publicacao as PublicacaoAvancada).mostrarInteracoes(publicacao);
        }else{
            console.log(`\n    (${publicacao.id}) - @${publicacao.usuario.apelido} em ${publicacao.dataHora}:\n`);
            publicacao.mostrarConteudo();
        }

        console.log("\n\n\nPublicação enviada com sucesso!");
        if (solicitarEnter) {
            this.imprimirPressionarEnter();
        }
    }

    private interagir(){
        console.log("\n┎--------------------------------------------------┒ \
\n\n    Interagir\n");

        let email: string = this._input('    Digite o email: ');
        if (email.trim() === "" || !this.isValidEmail(email)) {
            throw new ValorInvalidoError("Email inválido.");
        }

        this.listarAvancadas();
        console.log("\n\n");
        let id: number = this._input('    Id da publicação que deseja interagir: ');

        let publicacao: Publicacao | undefined = this._rede.consultarPublicacao(id);

        if (!publicacao) {
            throw new ValorInvalidoError("Publicação não encontrada.");
        }
    
        if (!(publicacao instanceof PublicacaoAvancada)) {
            throw new ValorInvalidoError("Id inválido.");
        }

        
        console.log(`\n    1 - ${TipoInteracao.curtir}  2 - ${TipoInteracao.naoCurtir}  3 - ${TipoInteracao.risos}  4 - ${TipoInteracao.surpresa}  5 - ${TipoInteracao.chorando}\n`);
        
        let tipo: string = this._input('    >>> ');
        
        if (tipo != "1" && tipo != "2" && tipo != "3" && tipo != "4" && tipo != "5") {
            throw new ValorInvalidoError("Reação inválida.");
        }

        let usuario: Usuario = this._rede.consultarUsuario(email);
        if((publicacao as PublicacaoAvancada).usuario.email == email){

        }
        let interacao: Interacao;

        switch (tipo) {
            case "1":
                interacao = new Interacao(publicacao, TipoInteracao.curtir, usuario, new Date());
                break;
            case "2":
                interacao = new Interacao(publicacao, TipoInteracao.naoCurtir, usuario, new Date());
                break;
            case "3":
                interacao = new Interacao(publicacao, TipoInteracao.risos, usuario, new Date());
                break;
            case "4":
                interacao = new Interacao(publicacao, TipoInteracao.surpresa, usuario, new Date());
                break;
            case "5":
                interacao = new Interacao(publicacao, TipoInteracao.chorando, usuario, new Date());
                break;
        }

        console.log("\n┖--------------------------------------------------┚\n");

        (publicacao as PublicacaoAvancada).inserirInteracao(interacao);
        this.imprimirPressionarEnter();        
    }

    private excluirPost(){
        console.log("\n┎--------------------------------------------------┒ \
\n\n    Excluir Post\n");
        let email: string = this._input('    Digite o email: ');
        this.listarTodas(email);
        console.log("\n");
        let id: number = this._input('    Digite o id do post a ser excluido: ');

        console.log("\n┖--------------------------------------------------┚\n");
    
        try {
            this._rede.excluirPostId(id);
        } catch (e) {
            if (e instanceof AplicacaoError) {
                console.log("Erro desconhecido ao excluir post.");
            } else {
                console.log(`Erro ao excluir post: ${e.message}`);
            }
        }
        this.imprimirPressionarEnter();
    }
    

    private excluirConta(){
        console.log("\n┎--------------------------------------------------┒ \
\n\n    Excluir Conta\n");

        let email: string = this._input('    Digite o email da conta a ser excluida: ');
    
        console.log("\n┖--------------------------------------------------┚\n");

        try {
            this._rede.excluirContaEmail(email);
        } catch (e) {
            if (e instanceof AplicacaoError) {
                console.log("Erro desconhecido ao excluir conta.");
            } else {
                console.log(`Erro ao excluir conta: ${e.message}`);
            }
        }
        this.imprimirPressionarEnter();
    }
    
    private stalkear(){
        console.log("\n┎--------------------------------------------------┒ \
\n\n    Stalkear\n");
        let email: string = this._input('    Digite o email: ');
        if (email.trim() === "" || !this.isValidEmail(email)) {
            throw new ValorInvalidoError("Email inválido.");
        }   
        this.listarTodas(email);
        console.log("\n┖--------------------------------------------------┚\n");
        this.imprimirPressionarEnter();
    }

    private feed(){
        console.clear();
        console.log("\n┎--------------------------------------------------┒ \
\n\n    Feed");
        this._rede.listarPublicacoes();
        console.log("\n\n\n┖--------------------------------------------------┚\n");
        this.imprimirPressionarEnter();
    }

    private listarAvancadas(){
        for(let i: number = 0; i < this._rede.colecaoPublicacoes.length; i++){
            let publicacao: Publicacao = this._rede.colecaoPublicacoes[i];
            if(this._rede.colecaoPublicacoes[i] instanceof PublicacaoAvancada){
                console.log(`\n\n\n    (${publicacao.id}) - @${publicacao.usuario.apelido} em ${publicacao.dataHora}:\n`);
                publicacao.mostrarConteudo();
                console.log();
                (publicacao as PublicacaoAvancada).mostrarInteracoes(publicacao as PublicacaoAvancada);
            }
        }
    }

    private listarTodas(email: string){
        for(let i: number = 0; i < this._rede.colecaoPublicacoes.length; i++){
            if(email === this._rede.colecaoPublicacoes[i].usuario.email){
                let publicacao: Publicacao = this._rede.colecaoPublicacoes[i];
                if(this._rede.colecaoPublicacoes[i] instanceof PublicacaoAvancada){
                    console.log(`\n\n\n    (${publicacao.id}) - @${publicacao.usuario.apelido} em ${publicacao.dataHora}:\n`);
                    publicacao.mostrarConteudo();
                    console.log();
                    (publicacao as PublicacaoAvancada).mostrarInteracoes(publicacao as PublicacaoAvancada);
                }else{
                    console.log(`\n\n\n    (${publicacao.id}) - @${publicacao.usuario.apelido} em ${publicacao.dataHora}:\n`);
                    publicacao.mostrarConteudo();
                }
            }
        }
    }
}

export { App }