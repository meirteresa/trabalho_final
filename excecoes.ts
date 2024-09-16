class AplicacaoError extends Error {
    constructor(message: string) {
        super(message);
    }
}

class UsuarioNaoEncontradoError extends AplicacaoError {
  constructor(message: string) {
    super(message);
  }
}

class PublicacaoNaoEncontradaError extends AplicacaoError {
  constructor(message: string) {
    super(message);
  }
}

class UsuarioJaCadastradoError extends AplicacaoError {
  constructor(message: string) {
    super(message);
  }
}

class ValorInvalidoError extends AplicacaoError {
  constructor(message: string) {
    super(message);
  }
}

export { UsuarioNaoEncontradoError, PublicacaoNaoEncontradaError, UsuarioJaCadastradoError,
         AplicacaoError, ValorInvalidoError
 };