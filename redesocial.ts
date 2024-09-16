import { Usuario, Publicacao, PublicacaoAvancada  } from './classes';
import { UsuarioNaoEncontradoError, PublicacaoNaoEncontradaError } from './excecoes';

class RedeSocial {
    private _colecaoUsuarios: Usuario[] = [];
    private _colecaoPublicacoes: Publicacao[] = [];

    inserirUsuario(user: Usuario) {
        let idDuplicado = true;
    
        while (idDuplicado) {
            idDuplicado = false;
            for (let i = 0; i < this._colecaoUsuarios.length; i++) {
                if (this._colecaoUsuarios[i].id === user.id) {
                    user.id = user.gerarId();
                    idDuplicado = true;
                    break;
                }
            }
        }
    
        this._colecaoUsuarios.push(user);
    }
    

    consultarUsuario(email: string): Usuario{
        let userProcurado!: Usuario;
        for (let i: number = 0; i < this._colecaoUsuarios.length; i++) {
            if (this._colecaoUsuarios[i].email == email) {
                userProcurado = this._colecaoUsuarios[i];
                break;
            }
        }

        if (userProcurado == null) {
            throw new UsuarioNaoEncontradoError(`Usuário ${email} não encontrado!`);
        }
        return userProcurado;
    }

    inserirPublicacao(publicacao: Publicacao) {
        let idDuplicado = true;
        
        while (idDuplicado) {
            idDuplicado = false;
            for (let i = 0; i < this._colecaoPublicacoes.length; i++) {
                if (this._colecaoPublicacoes[i].id === publicacao.id) {
                    publicacao.id = publicacao.gerarIdPublicacao();
                    idDuplicado = true;
                    break;
                }
            }
        }
        
        this._colecaoPublicacoes.push(publicacao);
    }

    consultarPublicacao(id: number): Publicacao {
        let publicacaoProcurada!: Publicacao;
        for (let i: number = 0; i < this._colecaoPublicacoes.length; i++) {
            if (this._colecaoPublicacoes[i].id == id) {
                publicacaoProcurada = this._colecaoPublicacoes[i];
                break;
            }
        }

        if (publicacaoProcurada == null) {
            throw new PublicacaoNaoEncontradaError(`Publicação de id ${id} não encontrada!`);
        }
        return publicacaoProcurada;
    }

    listarPublicacoes(): void{
        for(let i: number = this._colecaoPublicacoes.length - 1; i >= 0; i--){
            let publicacao: Publicacao = this._colecaoPublicacoes[i];
            if(publicacao instanceof PublicacaoAvancada){
                console.log(`\n\n\n    (${publicacao.id}) - @${publicacao.usuario.apelido} em ${publicacao.dataHora}:\n`);
                publicacao.mostrarConteudo();
                console.log();
                (publicacao as PublicacaoAvancada).mostrarInteracoes(publicacao);
            }else{
                console.log(`\n\n\n    (${publicacao.id}) - @${publicacao.usuario.apelido} em ${publicacao.dataHora}:\n`);
                publicacao.mostrarConteudo();
            }
        }
    }

    get colecaoUsuarios(): Usuario[] {
        return this._colecaoUsuarios;
    }

    get colecaoPublicacoes(): Publicacao[] {
        return this._colecaoPublicacoes;
    }

    excluirPostId(id: number): void {
        if (id < 100000 || id > 999999) {
            console.log("O ID deve ter 6 dígitos!");
            return;
        }
    
        let indice: number = this._colecaoPublicacoes.findIndex(publicacao => publicacao.id == id);
    
        if (indice != -1) {
            this._colecaoPublicacoes.splice(indice, 1);
            console.log(`\n\nPost ${id} excluído com sucesso!`);
        } 
        else {
            throw new PublicacaoNaoEncontradaError(`\n\nPost ${id} não encontrado!`);
        }
    }
    

    excluirContaEmail(email: string): void {
        let indice: number = this.colecaoUsuarios.findIndex(usuario => usuario.email === email);
    
        if (indice !== -1) {
            this._colecaoPublicacoes = this._colecaoPublicacoes.filter(publicacao => publicacao.usuario.email !== email);
            this._colecaoUsuarios.splice(indice, 1);
    
            console.log(`\n\nConta ${email} excluída com sucesso!`);
        } 
        else {
            throw new UsuarioNaoEncontradoError(`\n\nConta ${email} não encontrada!`);
        }
    }
    
}

//Observações: 
// - id do usuário tem 5 numeros e id da publicacao tem 6

export {RedeSocial};