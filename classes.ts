class Usuario {
    private _id: number;
    private _email: string;
    private _apelido: string;
    private _documento: string;

    constructor(email: string, apelido: string, documento: string){
        this._id = this.gerarId();
        this._email = email;
        this._apelido = apelido;
        this._documento = documento;
    }

    get email(): string{
        return this._email;
    }

    get apelido(): string{
        return this._apelido;
    }

    get documento(): string{
        return this._documento;
    }

    get id(): number{
        return this._id;
    }

    set id(new_id: number){
        this._id = new_id;
    }

    gerarId(): number{
        let numeroId: number = Math.floor(10000 + Math.random() * 90000);
        return numeroId;
    }
}

class Publicacao {
    private _id: number;
    private _usuario: Usuario;
    private _conteudo: string;
    private _dataHora: Date;

    constructor(usuario: Usuario, conteudo: string, dataHora: Date){
        this._id = this.gerarIdPublicacao();
        this._usuario = usuario;
        this._conteudo = conteudo;
        this._dataHora = dataHora;
    }

    get id(): number{
        return this._id;
    }

    set id(new_id : number){
        this._id = new_id;
    }

    get usuario(): Usuario{
        return this._usuario;
    }

    get conteudo(): string{
        return this._conteudo;
    }

    get dataHora(): Date{
        return this._dataHora;
    }

    gerarIdPublicacao(): number{
        let numeroId: number = Math.floor(100000 + Math.random() * 900000);
        return numeroId;
    }

    mostrarConteudo(): void {
        let conteudoFormatado: string = '';
        let linhaAtual: string = '';
        const espacos: string = '    '; // Quatro espaços
    
        for (let i: number = 0; i < this.conteudo.length; i++) {
            linhaAtual += this.conteudo[i];
    
            // Quando atingir 35 caracteres, verificar onde quebrar
            if (linhaAtual.length >= 35) {
                let ultimaEspaco = linhaAtual.lastIndexOf(' '); // Localiza o último espaço
                if (ultimaEspaco !== -1) {
                    // Se encontrou um espaço, quebre a linha nesse ponto
                    conteudoFormatado += espacos + linhaAtual.slice(0, ultimaEspaco) + '\n';
                    linhaAtual = linhaAtual.slice(ultimaEspaco + 1); // Começa nova linha após o espaço
                } else {
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
    }    
}

enum TipoInteracao {
    curtir = "Curtir",
    naoCurtir = "Nao curtir",
    risos = "Risos",
    surpresa = "Surpresa",
    chorando = "Chorando"
}

class Interacao {
    private _id: number;
    private _publicacao: Publicacao;
    private _tipoInteracao: TipoInteracao;
    private _usuario: Usuario;
    private _dataHora: Date;

    constructor(publicacao: Publicacao, tipoInteracao: TipoInteracao, usuario: Usuario, dataHora: Date){
        this._id = this.gerarIdInteracao();
        this._publicacao = publicacao;
        this._tipoInteracao = tipoInteracao;
        this._usuario = usuario;
        this._dataHora = dataHora;
    }

    get id(): number{
        return this._id;
    }

    set id(new_id: number){
        this._id = new_id;
    }

    get publicacao(): Publicacao{
        return this._publicacao;
    }

    get tipoInteracao(): TipoInteracao{
        return this._tipoInteracao;
    }

    set tipoInteracao(new_tipo: TipoInteracao){
        this._tipoInteracao = new_tipo;
    }

    get usuario(): Usuario{
        return this._usuario;
    }

    get dataHora(): Date{
        return this._dataHora;
    }

    gerarIdInteracao(): number{
        let numeroId: number = Math.floor(100000 + Math.random() * 900000);
        return numeroId;
    }
}

class PublicacaoAvancada extends Publicacao{
    private _interacoes: Interacao[];

    constructor(usuario: Usuario, conteudo: string, dataHora: Date, interacoes: Interacao[]){
        super(usuario, conteudo, dataHora);
        this._interacoes = interacoes;
    }

    get interacoes(): Interacao[]{
        return this._interacoes;
    }

    inserirInteracao(interacao: Interacao): void {
        let interacaoExistente = this._interacoes.find(i => i.usuario.id === interacao.usuario.id);
        
        if (interacaoExistente) {
            if (interacaoExistente.tipoInteracao === interacao.tipoInteracao) {
                console.log(`@${interacao.usuario.apelido} já deu ${interacao.tipoInteracao} antes!`);
            } else {
                console.log(`Interação atualizada de ${interacaoExistente.tipoInteracao} para ${interacao.tipoInteracao}!`);
                interacaoExistente.tipoInteracao = interacao.tipoInteracao;
            }
        } else {
            this._interacoes.push(interacao);
            console.log('Interação adicionada com sucesso!');
        }
    }

    mostrarInteracoes(publicacao: PublicacaoAvancada): void{
        let curtir: number = 0, naoCurtir: number = 0, risos: number = 0, surpresa: number = 0, chorando: number = 0;

        for(let i: number = 0; i < publicacao.interacoes.length; i++){
            if(publicacao.interacoes[i].tipoInteracao == "Curtir"){
                curtir++;
            }
            else if(publicacao.interacoes[i].tipoInteracao == "Nao curtir"){
                naoCurtir++;
            }
            else if(publicacao.interacoes[i].tipoInteracao == "Risos"){
                risos++;
            }
            else if(publicacao.interacoes[i].tipoInteracao == "Surpresa"){
                surpresa++;
            }
            else if(publicacao.interacoes[i].tipoInteracao == "Chorando"){
                chorando++;
            }
        }

        console.log(`    👍 ${curtir} 👎 ${naoCurtir} 😂 ${risos} 😱 ${surpresa} 😭 ${chorando}`);
    }
}

export { Usuario, Publicacao, TipoInteracao, Interacao, PublicacaoAvancada};