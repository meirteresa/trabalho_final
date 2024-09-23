import { UsuarioNaoEncontradoError, PublicacaoNaoEncontradaError, ValorInvalidoError, UsuarioJaCadastradoError, InteracaoInvalidaError } from './excecoes';
const moment = require('moment-timezone');

class Usuario {
    private _id: number;
    private _email: string;
    private _apelido: string;
    private _documento: string;
    private _tipo: string;

    constructor(email: string, apelido: string, documento: string, tipo: string){
        this._id = this.gerarId();
        this._email = email;
        this._apelido = apelido;
        this._documento = documento;
        this._tipo = tipo;
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

    get tipo(): string{
        return this._tipo;
    }

    set tipo(new_tipo: string){
        this._tipo = new_tipo;
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

    set conteudo(new_conteudo: string){
        this._conteudo = new_conteudo;
    }

    get dataHora(): Date{
        return this._dataHora;
    }

    gerarIdPublicacao(): number{
        let numeroId: number = Math.floor(100000 + Math.random() * 900000);
        return numeroId;
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

    set dataHora(new_data: Date){
        this._dataHora = new_data;
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
        this._interacoes.push(interacao);
    }
}

class RedeSocial {
    private _colecaoUsuarios: Usuario[] = [];
    private _colecaoPublicacoes: Publicacao[] = [];


    cadastrarUsuario(email: string, apelido: string, documento: string): void {  
        for (let i: number = 0; i < this.colecaoUsuarios.length; i++) {
            if (this.colecaoUsuarios[i].email == email) {
                throw new UsuarioJaCadastradoError("Esse email já está cadastrado"); 
            }
        }
        
        let usuario: Usuario = new Usuario(email, apelido, documento, "ativo");

        this.inserirUsuario(usuario);
        this.exibirContaUsuario(email);
    }

    private exibirContaUsuario(email: string) {
        let usuario: Usuario = this.consultarUsuario(email);

        console.log(`\n\n    @: ${usuario.apelido}\n    Email: ${usuario.email}\n    Id: ${usuario.id}\n    Documento: ${usuario.documento}`);
        
        console.log("\x1b[32m\n    Conta criada com sucesso!\x1b[0m");
    }

    isValidEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }    

    isValidCPF(cpf: string): boolean {
        return cpf.length == 11;
    }

    inserirUsuario(user: Usuario): void {
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
    

    consultarUsuario(email: string): Usuario {
        if (email.trim() === "" || !this.isValidEmail(email)) {
            throw new ValorInvalidoError("Email inválido.");
        }
    
        let userProcurado: Usuario | undefined;
    
        for (let i: number = 0; i < this._colecaoUsuarios.length; i++) {
            if (this._colecaoUsuarios[i].email === email) {
                userProcurado = this._colecaoUsuarios[i];
                break;
            }
        }
    
        if (!userProcurado || userProcurado.tipo === "desativado") {
            throw new UsuarioNaoEncontradoError(`Usuário ${email} não encontrado!`);
        }
    
        return userProcurado;
    }
    

    inserirPublicacao(publicacao: Publicacao): void {
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

        if (publicacaoProcurada == null || publicacaoProcurada.usuario.tipo == "desativado") {
            throw new PublicacaoNaoEncontradaError(`Publicação de id ${id} não encontrada!`);
        }

        return publicacaoProcurada;
    }

    validarTipoPublicacao(id: number) {
        let publicacao: Publicacao = this.consultarPublicacao(id);

        if(!(publicacao instanceof PublicacaoAvancada)){
            throw new InteracaoInvalidaError(`A publicação ${id} é do tipo simples!`);
        }

        return publicacao;
    }

    listarPublicacoes(): void{
        let contador = 0;

        for(let i: number = this._colecaoPublicacoes.length - 1; i >= 0; i--){

            let publicacao: Publicacao = this._colecaoPublicacoes[i];

            if(publicacao.usuario.tipo == "ativo"){
                contador++;
                if(publicacao instanceof PublicacaoAvancada){
                    console.log(`\n\n\n    (${publicacao.id}) - @${publicacao.usuario.apelido} em ${publicacao.dataHora}:\n`);
                    this.mostrarConteudo(publicacao);
                    console.log();
                    this.mostrarInteracoes(publicacao);
                }
                else{
                    console.log(`\n\n\n    (${publicacao.id}) - @${publicacao.usuario.apelido} em ${publicacao.dataHora}:\n`);
                    this.mostrarConteudo(publicacao);
                }
            }
        }

        if(contador == 0){
            throw new PublicacaoNaoEncontradaError("Feed vazio");
        }
    }
    
    excluirPostId(id: number): void {   
        let indice: number = this._colecaoPublicacoes.findIndex(publicacao => publicacao.id == id);

        this._colecaoPublicacoes.splice(indice, 1);
    }
    
    
    excluirContaEmail(usuario: Usuario): void {
        let indice: number = this._colecaoUsuarios.findIndex(usuario => usuario.email === usuario.email);

        if (indice !== -1) {
            this._colecaoPublicacoes = this._colecaoPublicacoes.filter(publicacao => publicacao.usuario.email !== usuario.email);
            this._colecaoUsuarios.splice(indice, 1);
            
            console.log(`\x1b[32m\n\n    Conta ${usuario.email} excluída com sucesso!\x1b[0m`);
        }
    }
    
    pesquisarUsuario(email: string): void{
        let user : Usuario = this.consultarUsuario(email);     
        this.listarTodas(user.email);
    }
    
    listarInteracoes(usuario: Usuario){
        let interacoes: Interacao[] = [];

        for(let i: number = this.colecaoPublicacoes.length - 1; i >= 0; i--){  
            if(this._colecaoPublicacoes[i].usuario.tipo == "ativo"){
                if(usuario.email === this.colecaoPublicacoes[i].usuario.email){
                    let publicacao: Publicacao = this.colecaoPublicacoes[i];
                    
                    if(this.colecaoPublicacoes[i] instanceof PublicacaoAvancada){
                        let interacoesAvancadas = (publicacao as PublicacaoAvancada).interacoes;
                        interacoes.push(...interacoesAvancadas);
                    }
                }
            }
        }

        interacoes.sort((a, b) => (a.dataHora > b.dataHora ? 1 : -1));

        if(interacoes.length == 0){
            console.log("\n    Ainda não há interações.")
        }
        for(let i = interacoes.length - 1; i >= 0; i--){
            console.log(`\n    @${interacoes[i].usuario.apelido} deu ${interacoes[i].tipoInteracao} no post ${interacoes[i].publicacao.id} em ${interacoes[i].dataHora}.\n`);
        }
    }

    listarTodas(email: string) {
        let contador = 0;
        for(let i: number = this.colecaoPublicacoes.length - 1; i >= 0; i--){
            if(email === this.colecaoPublicacoes[i].usuario.email){
                let publicacao: Publicacao = this.colecaoPublicacoes[i];
                if(publicacao.usuario.tipo == "ativo"){
                    contador++;
                    if(this.colecaoPublicacoes[i] instanceof PublicacaoAvancada){
                        console.log(`\n\n\n    (${publicacao.id}) - @${publicacao.usuario.apelido} em ${publicacao.dataHora}:\n`);
                        this.mostrarConteudo(publicacao);
                        console.log();
                        this.mostrarInteracoes(publicacao as PublicacaoAvancada);
                    }
                    else{
                        console.log(`\n\n\n    (${publicacao.id}) - @${publicacao.usuario.apelido} em ${publicacao.dataHora}:\n`);
                        this.mostrarConteudo(publicacao);
                    }
                }
            }
        }

        if(contador === 0){
            throw new PublicacaoNaoEncontradaError("Essa conta não possui posts.");
        }

        console.log("\n");
    }

    postarPublicacao(opcaoPost: string, usuario: Usuario, conteudo: string):void {
        let publicacao: Publicacao;
        let dataHora = moment().tz("America/Sao_Paulo").format('DD-MM-YYYY, HH:mm');
        
        if (opcaoPost == "1") {
            publicacao = new Publicacao(usuario, conteudo, dataHora);
        }
        else {
            let interacoes: Interacao[] = [];
            publicacao = new PublicacaoAvancada(usuario, conteudo, dataHora, interacoes);
        }

        this.inserirPublicacao(publicacao);
        this.exibirPublicacao(publicacao.id);
    }

    private exibirPublicacao(id: number) {
        let publicacao: Publicacao = this.consultarPublicacao(id);

        if(publicacao instanceof PublicacaoAvancada){
            console.log(`\n    (${publicacao.id}) - @${publicacao.usuario.apelido} em ${publicacao.dataHora}:\n`);
            this.mostrarConteudo(publicacao);
            console.log();
            this.mostrarInteracoes(publicacao);
        }
        else{
            console.log(`\n    (${publicacao.id}) - @${publicacao.usuario.apelido} em ${publicacao.dataHora}:\n`);
            this.mostrarConteudo(publicacao);
        }

        console.log("\x1b[32m\n\n\n    Publicação enviada com sucesso!\x1b[0m");
    }

    interagirComPost(usuario: Usuario, publicacao: Publicacao, tipo: string): void {
        let interacao: Interacao | undefined;
        let dataHora = moment().tz("America/Sao_Paulo").format('DD-MM-YYYY, HH:mm');

        if (tipo == "1") interacao = new Interacao(publicacao, TipoInteracao.curtir, usuario, dataHora);
        else if(tipo == "2") interacao = new Interacao(publicacao, TipoInteracao.naoCurtir, usuario, dataHora);
        else if(tipo == "3") interacao = new Interacao(publicacao, TipoInteracao.risos, usuario, dataHora);
        else if(tipo == "4") interacao = new Interacao(publicacao, TipoInteracao.surpresa, usuario, dataHora);
        else interacao = new Interacao(publicacao, TipoInteracao.chorando, usuario, dataHora);

        let interacaoExistente = (publicacao as PublicacaoAvancada).interacoes.find(i => i.usuario.id === interacao.usuario.id);
        
        if (interacaoExistente?.tipoInteracao === interacao.tipoInteracao) {
            throw new InteracaoInvalidaError(`@${usuario.apelido} já deu ${interacao.tipoInteracao} antes!`);
        } 
        
        if (interacaoExistente) {
            interacaoExistente.dataHora = interacao.dataHora;
            interacaoExistente.tipoInteracao = interacao.tipoInteracao;
            console.log("\x1b[32m\n\n\n    Interação atualizada com sucesso!\x1b[0m");
        } 
        else {
            (publicacao as PublicacaoAvancada).inserirInteracao(interacao);
            console.log("\x1b[32m\n\n\n    Interação adicionada com sucesso!\x1b[0m");
        }
    }

    mostrarInteracoes(publicacao: PublicacaoAvancada): void{
        let curtir: number = 0, naoCurtir: number = 0, risos: number = 0, surpresa: number = 0, chorando: number = 0;

        for(let i: number = 0; i < publicacao.interacoes.length; i++){
            if(publicacao.interacoes[i].tipoInteracao == "Curtir") curtir++;
            else if(publicacao.interacoes[i].tipoInteracao == "Nao curtir") naoCurtir++;
            else if(publicacao.interacoes[i].tipoInteracao == "Risos") risos++;
            else if(publicacao.interacoes[i].tipoInteracao == "Surpresa") surpresa++;
            else if(publicacao.interacoes[i].tipoInteracao == "Chorando") chorando++;
        }

        console.log(`    👍 ${curtir} 👎 ${naoCurtir} 😂 ${risos} 😱 ${surpresa} 😭 ${chorando}`);
    }

    mostrarConteudo(publicacao: Publicacao): void {
        let conteudoFormatado: string = '';
        let linhaAtual: string = '';
        const espacos: string = '    '; // Quatro espaços
    
        for (let i: number = 0; i < publicacao.conteudo.length; i++) {
            linhaAtual += publicacao.conteudo[i];
    
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

    editarPublicacao(publicacao: Publicacao, conteudo: string): void{
        publicacao.conteudo = conteudo;

        this.exibirPublicacao(publicacao.id);
    }

    desativarAtivar(email: string, opcao: string): void{
        if (email.trim() === "" || !this.isValidEmail(email)) {
            throw new ValorInvalidoError("Email inválido.");
        }

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

        if(opcao == "1"){
            if(userProcurado.tipo == "desativado"){
                throw new ValorInvalidoError("Conta já está desativada.");
            }
            userProcurado.tipo = "desativado";
            console.log("\x1b[32m\n\n\n    Conta desativada com sucesso!\x1b[0m");
        }
        else{
            if(userProcurado.tipo == "ativo"){
                throw new ValorInvalidoError("Conta já está ativa.");
            }
            userProcurado.tipo = "ativo";
            console.log("\x1b[32m\n\n\n    Conta reativada com sucesso!\x1b[0m");
        }
    }

    get colecaoUsuarios(): Usuario[] {
        return this._colecaoUsuarios;
    }

    get colecaoPublicacoes(): Publicacao[] {
        return this._colecaoPublicacoes;
    }    
}

export { Usuario, Publicacao, TipoInteracao, Interacao, PublicacaoAvancada, RedeSocial};
