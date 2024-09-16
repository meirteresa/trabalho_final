"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeSocial = void 0;
var classes_1 = require("./classes");
var excecoes_1 = require("./excecoes");
var RedeSocial = /** @class */ (function () {
    function RedeSocial() {
        this._colecaoUsuarios = [];
        this._colecaoPublicacoes = [];
    }
    RedeSocial.prototype.inserirUsuario = function (user) {
        var idDuplicado = true;
        while (idDuplicado) {
            idDuplicado = false;
            for (var i = 0; i < this._colecaoUsuarios.length; i++) {
                if (this._colecaoUsuarios[i].id === user.id) {
                    user.id = user.gerarId();
                    idDuplicado = true;
                    break;
                }
            }
        }
        this._colecaoUsuarios.push(user);
    };
    RedeSocial.prototype.consultarUsuario = function (email) {
        var userProcurado;
        for (var i = 0; i < this._colecaoUsuarios.length; i++) {
            if (this._colecaoUsuarios[i].email == email) {
                userProcurado = this._colecaoUsuarios[i];
                break;
            }
        }
        if (userProcurado == null) {
            throw new excecoes_1.UsuarioNaoEncontradoError("Usu\u00E1rio ".concat(email, " n\u00E3o encontrado!"));
        }
        return userProcurado;
    };
    RedeSocial.prototype.inserirPublicacao = function (publicacao) {
        var idDuplicado = true;
        while (idDuplicado) {
            idDuplicado = false;
            for (var i = 0; i < this._colecaoPublicacoes.length; i++) {
                if (this._colecaoPublicacoes[i].id === publicacao.id) {
                    publicacao.id = publicacao.gerarIdPublicacao();
                    idDuplicado = true;
                    break;
                }
            }
        }
        this._colecaoPublicacoes.push(publicacao);
    };
    RedeSocial.prototype.consultarPublicacao = function (id) {
        var publicacaoProcurada;
        for (var i = 0; i < this._colecaoPublicacoes.length; i++) {
            if (this._colecaoPublicacoes[i].id == id) {
                publicacaoProcurada = this._colecaoPublicacoes[i];
                break;
            }
        }
        if (publicacaoProcurada == null) {
            throw new excecoes_1.PublicacaoNaoEncontradaError("Publica\u00E7\u00E3o de id ".concat(id, " n\u00E3o encontrada!"));
        }
        return publicacaoProcurada;
    };
    RedeSocial.prototype.listarPublicacoes = function () {
        for (var i = this._colecaoPublicacoes.length - 1; i >= 0; i--) {
            var publicacao = this._colecaoPublicacoes[i];
            if (publicacao instanceof classes_1.PublicacaoAvancada) {
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
    };
    Object.defineProperty(RedeSocial.prototype, "colecaoUsuarios", {
        get: function () {
            return this._colecaoUsuarios;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RedeSocial.prototype, "colecaoPublicacoes", {
        get: function () {
            return this._colecaoPublicacoes;
        },
        enumerable: false,
        configurable: true
    });
    RedeSocial.prototype.excluirPostId = function (id) {
        if (id < 100000 || id > 999999) {
            console.log("O ID deve ter 6 dígitos!");
            return;
        }
        var indice = this._colecaoPublicacoes.findIndex(function (publicacao) { return publicacao.id == id; });
        if (indice != -1) {
            this._colecaoPublicacoes.splice(indice, 1);
            console.log("\n\nPost ".concat(id, " exclu\u00EDdo com sucesso!"));
        }
        else {
            throw new excecoes_1.PublicacaoNaoEncontradaError("\n\nPost ".concat(id, " n\u00E3o encontrado!"));
        }
    };
    RedeSocial.prototype.excluirContaEmail = function (email) {
        var indice = this.colecaoUsuarios.findIndex(function (usuario) { return usuario.email === email; });
        if (indice !== -1) {
            this._colecaoPublicacoes = this._colecaoPublicacoes.filter(function (publicacao) { return publicacao.usuario.email !== email; });
            this._colecaoUsuarios.splice(indice, 1);
            console.log("\n\nConta ".concat(email, " exclu\u00EDda com sucesso!"));
        }
        else {
            throw new excecoes_1.UsuarioNaoEncontradoError("\n\nConta ".concat(email, " n\u00E3o encontrada!"));
        }
    };
    return RedeSocial;
}());
exports.RedeSocial = RedeSocial;
