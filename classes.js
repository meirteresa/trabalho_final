"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicacaoAvancada = exports.Interacao = exports.TipoInteracao = exports.Publicacao = exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(email, apelido, documento) {
        this._id = this.gerarId();
        this._email = email;
        this._apelido = apelido;
        this._documento = documento;
    }
    Object.defineProperty(Usuario.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "apelido", {
        get: function () {
            return this._apelido;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "documento", {
        get: function () {
            return this._documento;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (new_id) {
            this._id = new_id;
        },
        enumerable: false,
        configurable: true
    });
    Usuario.prototype.gerarId = function () {
        var numeroId = Math.floor(10000 + Math.random() * 90000);
        return numeroId;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
var Publicacao = /** @class */ (function () {
    function Publicacao(usuario, conteudo, dataHora) {
        this._id = this.gerarIdPublicacao();
        this._usuario = usuario;
        this._conteudo = conteudo;
        this._dataHora = dataHora;
    }
    Object.defineProperty(Publicacao.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (new_id) {
            this._id = new_id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Publicacao.prototype, "usuario", {
        get: function () {
            return this._usuario;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Publicacao.prototype, "conteudo", {
        get: function () {
            return this._conteudo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Publicacao.prototype, "dataHora", {
        get: function () {
            return this._dataHora;
        },
        enumerable: false,
        configurable: true
    });
    Publicacao.prototype.gerarIdPublicacao = function () {
        var numeroId = Math.floor(100000 + Math.random() * 900000);
        return numeroId;
    };
    Publicacao.prototype.mostrarConteudo = function () {
        var conteudoFormatado = '';
        var linhaAtual = '';
        var espacos = '    '; // Quatro espaços
        for (var i = 0; i < this.conteudo.length; i++) {
            linhaAtual += this.conteudo[i];
            // Quando atingir 35 caracteres, verificar onde quebrar
            if (linhaAtual.length >= 35) {
                var ultimaEspaco = linhaAtual.lastIndexOf(' '); // Localiza o último espaço
                if (ultimaEspaco !== -1) {
                    // Se encontrou um espaço, quebre a linha nesse ponto
                    conteudoFormatado += espacos + linhaAtual.slice(0, ultimaEspaco) + '\n';
                    linhaAtual = linhaAtual.slice(ultimaEspaco + 1); // Começa nova linha após o espaço
                }
                else {
                    // Se não encontrou um espaço, quebre na posição atual (palavra longa)
                    conteudoFormatado += espacos + linhaAtual + '\n';
                    linhaAtual = ''; // Reinicia a linha
                }
            }
        }
        // Adiciona qualquer conteúdo remanescente que não foi adicionado
        if (linhaAtual.length > 0) {
            conteudoFormatado += espacos + linhaAtual;
        }
        console.log(conteudoFormatado); // Mostra o conteúdo formatado
    };
    return Publicacao;
}());
exports.Publicacao = Publicacao;
var TipoInteracao;
(function (TipoInteracao) {
    TipoInteracao["curtir"] = "Curtir";
    TipoInteracao["naoCurtir"] = "Nao curtir";
    TipoInteracao["risos"] = "Risos";
    TipoInteracao["surpresa"] = "Surpresa";
    TipoInteracao["chorando"] = "Chorando";
})(TipoInteracao || (exports.TipoInteracao = TipoInteracao = {}));
var Interacao = /** @class */ (function () {
    function Interacao(publicacao, tipoInteracao, usuario, dataHora) {
        this._id = this.gerarIdInteracao();
        this._publicacao = publicacao;
        this._tipoInteracao = tipoInteracao;
        this._usuario = usuario;
        this._dataHora = dataHora;
    }
    Object.defineProperty(Interacao.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (new_id) {
            this._id = new_id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interacao.prototype, "publicacao", {
        get: function () {
            return this._publicacao;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interacao.prototype, "tipoInteracao", {
        get: function () {
            return this._tipoInteracao;
        },
        set: function (new_tipo) {
            this._tipoInteracao = new_tipo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interacao.prototype, "usuario", {
        get: function () {
            return this._usuario;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interacao.prototype, "dataHora", {
        get: function () {
            return this._dataHora;
        },
        enumerable: false,
        configurable: true
    });
    Interacao.prototype.gerarIdInteracao = function () {
        var numeroId = Math.floor(100000 + Math.random() * 900000);
        return numeroId;
    };
    return Interacao;
}());
exports.Interacao = Interacao;
var PublicacaoAvancada = /** @class */ (function (_super) {
    __extends(PublicacaoAvancada, _super);
    function PublicacaoAvancada(usuario, conteudo, dataHora, interacoes) {
        var _this = _super.call(this, usuario, conteudo, dataHora) || this;
        _this._interacoes = interacoes;
        return _this;
    }
    Object.defineProperty(PublicacaoAvancada.prototype, "interacoes", {
        get: function () {
            return this._interacoes;
        },
        enumerable: false,
        configurable: true
    });
    PublicacaoAvancada.prototype.inserirInteracao = function (interacao) {
        var interacaoExistente = this._interacoes.find(function (i) { return i.usuario.id === interacao.usuario.id; });
        if (interacaoExistente) {
            if (interacaoExistente.tipoInteracao === interacao.tipoInteracao) {
                console.log("@".concat(interacao.usuario.apelido, " j\u00E1 deu ").concat(interacao.tipoInteracao, " antes!"));
            }
            else {
                console.log("Intera\u00E7\u00E3o atualizada de ".concat(interacaoExistente.tipoInteracao, " para ").concat(interacao.tipoInteracao, "!"));
                interacaoExistente.tipoInteracao = interacao.tipoInteracao;
            }
        }
        else {
            this._interacoes.push(interacao);
            console.log('Interação adicionada com sucesso!');
        }
    };
    PublicacaoAvancada.prototype.mostrarInteracoes = function (publicacao) {
        var curtir = 0, naoCurtir = 0, risos = 0, surpresa = 0, chorando = 0;
        for (var i = 0; i < publicacao.interacoes.length; i++) {
            if (publicacao.interacoes[i].tipoInteracao == "Curtir") {
                curtir++;
            }
            else if (publicacao.interacoes[i].tipoInteracao == "Nao curtir") {
                naoCurtir++;
            }
            else if (publicacao.interacoes[i].tipoInteracao == "Risos") {
                risos++;
            }
            else if (publicacao.interacoes[i].tipoInteracao == "Surpresa") {
                surpresa++;
            }
            else if (publicacao.interacoes[i].tipoInteracao == "Chorando") {
                chorando++;
            }
        }
        console.log("    \uD83D\uDC4D ".concat(curtir, " \uD83D\uDC4E ").concat(naoCurtir, " \uD83D\uDE02 ").concat(risos, " \uD83D\uDE31 ").concat(surpresa, " \uD83D\uDE2D ").concat(chorando));
    };
    return PublicacaoAvancada;
}(Publicacao));
exports.PublicacaoAvancada = PublicacaoAvancada;
