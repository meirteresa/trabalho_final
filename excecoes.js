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
exports.ValorInvalidoError = exports.AplicacaoError = exports.UsuarioJaCadastradoError = exports.PublicacaoNaoEncontradaError = exports.UsuarioNaoEncontradoError = void 0;
var AplicacaoError = /** @class */ (function (_super) {
    __extends(AplicacaoError, _super);
    function AplicacaoError(message) {
        return _super.call(this, message) || this;
    }
    return AplicacaoError;
}(Error));
exports.AplicacaoError = AplicacaoError;
var UsuarioNaoEncontradoError = /** @class */ (function (_super) {
    __extends(UsuarioNaoEncontradoError, _super);
    function UsuarioNaoEncontradoError(message) {
        return _super.call(this, message) || this;
    }
    return UsuarioNaoEncontradoError;
}(AplicacaoError));
exports.UsuarioNaoEncontradoError = UsuarioNaoEncontradoError;
var PublicacaoNaoEncontradaError = /** @class */ (function (_super) {
    __extends(PublicacaoNaoEncontradaError, _super);
    function PublicacaoNaoEncontradaError(message) {
        return _super.call(this, message) || this;
    }
    return PublicacaoNaoEncontradaError;
}(AplicacaoError));
exports.PublicacaoNaoEncontradaError = PublicacaoNaoEncontradaError;
var UsuarioJaCadastradoError = /** @class */ (function (_super) {
    __extends(UsuarioJaCadastradoError, _super);
    function UsuarioJaCadastradoError(message) {
        return _super.call(this, message) || this;
    }
    return UsuarioJaCadastradoError;
}(AplicacaoError));
exports.UsuarioJaCadastradoError = UsuarioJaCadastradoError;
var ValorInvalidoError = /** @class */ (function (_super) {
    __extends(ValorInvalidoError, _super);
    function ValorInvalidoError(message) {
        return _super.call(this, message) || this;
    }
    return ValorInvalidoError;
}(AplicacaoError));
exports.ValorInvalidoError = ValorInvalidoError;
