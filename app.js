// let titulo = document.querySelector('h1')
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
//EVOLUÇÃO DESSE CÓDIGO ABAIXO:

let listaDeNumerosSorteados=[];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorios();
let tentativas = 1;
//função que exibe coisas na tela, executa, sem retornar
function exibirTextoNaTela(tag, texto) {
    let campo =  document.querySelector (tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window){
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang='pt-BR';
        utterance.rate=1.2;
        window.speechSynthesis.speak(utterance);
    }else {
        console.log("Web peech API não suportada neste navegador. ");
    }

}
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}
exibirMensagemInicial();

//função sem prâmetro e sem retorno
function verificarChute() {
    let chute = document.querySelector('input').value;
    

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'acertou!');
        let palavraTentativa = tentativas>1 ? 'tentativas':'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    
    }else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior');
            }
            tentativas++;
            limparCampo();
        }
    }
//sem parâmetro e sem informção mas retorna um valor 
function gerarNumeroAleatorios() {
    let numeroEscolhido = parseInt(Math.random()*numeroLimite+1);
    let quntidadeDeElemnetosDaLista = listaDeNumerosSorteados.length;

    if(quntidadeDeElemnetosDaLista == 3) {
        listaDeNumerosSorteados =[];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorios();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
function limparCampo(){
    chute= document.querySelector('input');
    chute.value='';
}
function reiniciarJogo(){
    numeroSecreto=gerarNumeroAleatorios();
    limparCampo();
    tentativas=1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}