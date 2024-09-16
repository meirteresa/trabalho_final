"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var redesocial_1 = require("./redesocial");
var classes_1 = require("./classes");
var excecoes_1 = require("./excecoes");
var moment = require('moment-timezone');
var promptSync = require('prompt-sync');
var App = /** @class */ (function () {
    function App() {
        this._rede = new redesocial_1.RedeSocial();
        this._input = promptSync();
    }
    App.prototype.menu = function () {
        var op = "";
        var email;
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
            }
            catch (e) {
                if (e instanceof excecoes_1.AplicacaoError) {
                    console.log(e.message); // "Ocorreu um erro na aplicação!"
                }
                else {
                    console.log("\n    " + e);
                }
                this.imprimirPressionarEnter();
            }
        } while (op != "0");
        console.log("\nAplicação Encerrada");
    };
    App.prototype.listarOpcoes = function () {
        console.log('\nBem vindo!\n');
        console.log('1 - Abrir Conta       2 - Publicar            3 - Interagir\n' +
            '4 - Feed              5 - Excluir Post        6 - Excluir Conta\n' +
            '7 - Stalkear          0 - Sair\n\n');
    };
    App.prototype.cadastrar = function () {
        console.log("\n┎--------------------------------------------------┒ \
\n\n    Abrir conta\n");
        var email = this._input('    Digite o email: ');
        if (email.trim() === "" || !this.isValidEmail(email)) {
            throw new excecoes_1.ValorInvalidoError("Email inválido.");
        }
        for (var i = 0; i < this._rede.colecaoUsuarios.length; i++) {
            if (this._rede.colecaoUsuarios[i].email == email) {
                throw new excecoes_1.UsuarioJaCadastradoError("Esse email já está cadastrado");
            }
        }
        var apelido = this._input('    Apelido: ');
        if (apelido.trim() === "") {
            throw new excecoes_1.ValorInvalidoError("O apelido do usuário não pode ser vazio.");
        }
        var documento = this._input('    Digite seu cpf: ');
        if (documento.trim() === "" || !this.isValidCPF(documento)) {
            throw new excecoes_1.ValorInvalidoError("CPF inválido.");
        }
        console.log("\n┖--------------------------------------------------┚\n");
        var usuario = new classes_1.Usuario(email, apelido, documento);
        this._rede.inserirUsuario(usuario);
        this.exibirContaUsuario(email);
    };
    App.prototype.isValidEmail = function (email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    App.prototype.isValidCPF = function (cpf) {
        return cpf.length == 11;
    };
    App.prototype.exibirContaUsuario = function (email, solicitarEnter) {
        if (solicitarEnter === void 0) { solicitarEnter = true; }
        var usuario = this._rede.consultarUsuario(email);
        console.log("\n\n@: ".concat(usuario.apelido, "\nEmail: ").concat(usuario.email, "\nId: ").concat(usuario.id, "\nDocumento: ").concat(usuario.documento));
        console.log("\nConta criada com sucesso!");
        if (solicitarEnter) {
            this.imprimirPressionarEnter();
        }
    };
    App.prototype.imprimirPressionarEnter = function () {
        console.log();
        this._input("Pressione <enter>");
        console.clear();
    };
    App.prototype.publicar = function () {
        console.log("\n┎--------------------------------------------------┒ \
\n\n    Publicar\n");
        var opcaoPost = this._input('    Informe o tipo (1 - Simples, 2 - Avançada): ');
        if (opcaoPost != "1" && opcaoPost != "2") {
            throw new excecoes_1.ValorInvalidoError("Opção de conta inválida.");
        }
        var email = this._input('    Digite o email: ');
        if (email.trim() === "" || !this.isValidEmail(email)) {
            throw new excecoes_1.ValorInvalidoError("Email inválido.");
        }
        var usuario = this._rede.consultarUsuario(email);
        var conteudo = this._input('    O que você está pensando? ');
        if (conteudo.length > 100) {
            throw new excecoes_1.ValorInvalidoError("Você excedeu o limite de caracteres.");
        }
        console.log("\n┖--------------------------------------------------┚\n");
        var publicacao;
        var dataHora = moment().tz("America/Sao_Paulo").format('DD-MM-YYYY, HH:mm');
        if (opcaoPost == "1") {
            publicacao = new classes_1.Publicacao(usuario, conteudo, dataHora);
        }
        else {
            var interacoes = [];
            publicacao = new classes_1.PublicacaoAvancada(usuario, conteudo, dataHora, interacoes);
        }
        this._rede.inserirPublicacao(publicacao);
        this.exibirPublicacao(publicacao.id);
    };
    App.prototype.exibirPublicacao = function (id, solicitarEnter) {
        if (solicitarEnter === void 0) { solicitarEnter = true; }
        var publicacao = this._rede.consultarPublicacao(id);
        if (publicacao instanceof classes_1.PublicacaoAvancada) {
            console.log("\n    (".concat(publicacao.id, ") - @").concat(publicacao.usuario.apelido, " em ").concat(publicacao.dataHora, ":\n"));
            publicacao.mostrarConteudo();
            console.log();
            publicacao.mostrarInteracoes(publicacao);
        }
        else {
            console.log("\n    (".concat(publicacao.id, ") - @").concat(publicacao.usuario.apelido, " em ").concat(publicacao.dataHora, ":\n"));
            publicacao.mostrarConteudo();
        }
        console.log("\n\n\nPublicação enviada com sucesso!");
        if (solicitarEnter) {
            this.imprimirPressionarEnter();
        }
    };
    App.prototype.interagir = function () {
        console.log("\n┎--------------------------------------------------┒ \
\n\n    Interagir\n");
        var email = this._input('    Digite o email: ');
        if (email.trim() === "" || !this.isValidEmail(email)) {
            throw new excecoes_1.ValorInvalidoError("Email inválido.");
        }
        this.listarAvancadas();
        console.log("\n\n");
        var id = this._input('    Id da publicação que deseja interagir: ');
        var publicacao = this._rede.consultarPublicacao(id);
        if (!publicacao) {
            throw new excecoes_1.ValorInvalidoError("Publicação não encontrada.");
        }
        if (!(publicacao instanceof classes_1.PublicacaoAvancada)) {
            throw new excecoes_1.ValorInvalidoError("Id inválido.");
        }
        console.log("\n    1 - ".concat(classes_1.TipoInteracao.curtir, "  2 - ").concat(classes_1.TipoInteracao.naoCurtir, "  3 - ").concat(classes_1.TipoInteracao.risos, "  4 - ").concat(classes_1.TipoInteracao.surpresa, "  5 - ").concat(classes_1.TipoInteracao.chorando, "\n"));
        var tipo = this._input('    >>> ');
        if (tipo != "1" && tipo != "2" && tipo != "3" && tipo != "4" && tipo != "5") {
            throw new excecoes_1.ValorInvalidoError("Reação inválida.");
        }
        var usuario = this._rede.consultarUsuario(email);
        if (publicacao.usuario.email == email) {
        }
        var interacao;
        switch (tipo) {
            case "1":
                interacao = new classes_1.Interacao(publicacao, classes_1.TipoInteracao.curtir, usuario, new Date());
                break;
            case "2":
                interacao = new classes_1.Interacao(publicacao, classes_1.TipoInteracao.naoCurtir, usuario, new Date());
                break;
            case "3":
                interacao = new classes_1.Interacao(publicacao, classes_1.TipoInteracao.risos, usuario, new Date());
                break;
            case "4":
                interacao = new classes_1.Interacao(publicacao, classes_1.TipoInteracao.surpresa, usuario, new Date());
                break;
            case "5":
                interacao = new classes_1.Interacao(publicacao, classes_1.TipoInteracao.chorando, usuario, new Date());
                break;
        }
        console.log("\n┖--------------------------------------------------┚\n");
        publicacao.inserirInteracao(interacao);
        this.imprimirPressionarEnter();
    };
    App.prototype.excluirPost = function () {
        console.log("\n┎--------------------------------------------------┒ \
\n\n    Excluir Post\n");
        var email = this._input('    Digite o email: ');
        this.listarTodas(email);
        console.log("\n");
        var id = this._input('    Digite o id do post a ser excluido: ');
        console.log("\n┖--------------------------------------------------┚\n");
        try {
            this._rede.excluirPostId(id);
        }
        catch (e) {
            if (e instanceof excecoes_1.AplicacaoError) {
                console.log("Erro desconhecido ao excluir post.");
            }
            else {
                console.log("Erro ao excluir post: ".concat(e.message));
            }
        }
        this.imprimirPressionarEnter();
    };
    App.prototype.excluirConta = function () {
        console.log("\n┎--------------------------------------------------┒ \
\n\n    Excluir Conta\n");
        var email = this._input('    Digite o email da conta a ser excluida: ');
        console.log("\n┖--------------------------------------------------┚\n");
        try {
            this._rede.excluirContaEmail(email);
        }
        catch (e) {
            if (e instanceof excecoes_1.AplicacaoError) {
                console.log("Erro desconhecido ao excluir conta.");
            }
            else {
                console.log("Erro ao excluir conta: ".concat(e.message));
            }
        }
        this.imprimirPressionarEnter();
    };
    App.prototype.stalkear = function () {
        console.log("\n┎--------------------------------------------------┒ \
\n\n    Stalkear\n");
        var email = this._input('    Digite o email: ');
        if (email.trim() === "" || !this.isValidEmail(email)) {
            throw new excecoes_1.ValorInvalidoError("Email inválido.");
        }
        this.listarTodas(email);
        console.log("\n┖--------------------------------------------------┚\n");
        this.imprimirPressionarEnter();
    };
    App.prototype.feed = function () {
        console.clear();
        console.log("\n┎--------------------------------------------------┒ \
\n\n    Feed");
        this._rede.listarPublicacoes();
        console.log("\n\n\n┖--------------------------------------------------┚\n");
        this.imprimirPressionarEnter();
    };
    App.prototype.listarAvancadas = function () {
        for (var i = 0; i < this._rede.colecaoPublicacoes.length; i++) {
            var publicacao = this._rede.colecaoPublicacoes[i];
            if (this._rede.colecaoPublicacoes[i] instanceof classes_1.PublicacaoAvancada) {
                console.log("\n\n\n    (".concat(publicacao.id, ") - @").concat(publicacao.usuario.apelido, " em ").concat(publicacao.dataHora, ":\n"));
                publicacao.mostrarConteudo();
                console.log();
                publicacao.mostrarInteracoes(publicacao);
            }
        }
    };
    App.prototype.listarTodas = function (email) {
        for (var i = 0; i < this._rede.colecaoPublicacoes.length; i++) {
            if (email === this._rede.colecaoPublicacoes[i].usuario.email) {
                var publicacao = this._rede.colecaoPublicacoes[i];
                if (this._rede.colecaoPublicacoes[i] instanceof classes_1.PublicacaoAvancada) {
                    console.log("\n\n\n    (".concat(publicacao.id, ") - @").concat(publicacao.usuario.apelido, " em ").concat(publicacao.dataHora, ":\n"));
                    publicacao.mostrarConteudo();
                    console.log();
                    publicacao.mostrarInteracoes(publicacao);
                }
                else {
                    console.log("\n\n\n    (".concat(publicacao.id, ") - @").concat(publicacao.usuario.apelido, " em ").concat(publicacao.dataHora, ":\n"));
                    publicacao.mostrarConteudo();
                }
            }
        }
    };
    return App;
}());
exports.App = App;
