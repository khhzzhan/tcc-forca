
let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }   
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#C71585";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }

    
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca();

        if(tentativas == 0){
            abreModal("OPS!", "Não foi dessa vez ... Tente novamente");
            piscarBotaoJogarNovamente(true);
        }
    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    
    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true)
    {
        abreModal("PARABÉNS!", "VOCÊ ACERTOU A PALAVRA ✨...");
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}

// async function piscarBotaoJogarNovamente(){
//     while (jogarNovamente == true) {
//         document.getElementById("btnReiniciar").style.backgroundColor = 'red';
//         document.getElementById("btnReiniciar").style.scale = 1.3;
//         await atraso(500)
//         document.getElementById("btnReiniciar").style.backgroundColor = 'yellow';
//         document.getElementById("btnReiniciar").style.scale = 1;
//         await atraso(500)
//     }
// }

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))     
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background  = "url('/img/forca astronauta 1.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background  = "url('./img/forca astronauta 2.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background  = "url('./img/forca astronauta 3.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background  = "url('./img/forca astronauta 4.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background  = "url('./img/forca astronauta 5.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background  = "url('./img/forca astronauta 6.png')";
            break;
        default:
            document.getElementById("imagem").style.background  = "url('./img/forca astronauta.png')";
            break;
    }
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica(){ // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = [];
        jogoAutomatico = false;

        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    }
    else if(jogoAutomatico == false){ // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true;

        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";
        
    }
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = ""; 
}

window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica(){
    palavras = [
        palavra001 = {
            nome: "GALAXIA",
            categoria:"UM VASTO SISTEMA DE POEIRAS ESTRELAS E GÁS"
        },
        palavra002 = {
            nome: "ESTRELA",
            categoria:"UM CORPO CELESTE LUMINOSO QUE BRILHA POR CAUSA DE REAÇÕES NUCLEARES EM SEU NÚCLEO."
        },
        palavra003 = {
            nome: "PLANETA",
            categoria:"UM CORPO CELESTE QUE ORBITA UMA ESTRELA E NÃO BRILHA POR LUZ PRÓPRIA."
        },
        palavra004 = {
            nome: "LUA",
            categoria:"SATÉLITE NATURAL DE UM PLANETA."
        },
        palavra005 = {
            nome: "ASTEROIDE",
            categoria:"PEQUENO CORPO ROCHOSO QUE ORBITA O SOL."
        },
        palavra006 = {
            nome: "NEBULOSA",
            categoria:"NUVEM DE GÁS E POEIRA NO ESPAÇO, MUITAS VEZES UM BERÇO DE NOVAS ESTRELAS."
        },
        palavra007 = {
            nome: "BURACO NEGRO",
            categoria:"REGIÃO DO ESPAÇO ONDE A GRAVIDADE É TÃO FORTE QUE NADA PODE ESCAPAR DELA, NEM MESMO A LUZ."
        },
        palavra008 = {
            nome: "SUPERNOVA",
            categoria:" EXPLOSÃO BRILHANTE DE UMA ESTRELA MORIBUNDA."
        },
        palavra009 = {
            nome: "CONSTELACAO",
            categoria:"GRUPO DE ESTRELAS QUE FORMAM UM PADRÃO IMAGINÁRIO NO CÉU."
        },
        palavra010 = {
            nome: "ECLIPSE",
            categoria:"EVENTO ASTRONÔMICO ONDE UM CORPO CELESTE PASSA NA SOMBRA DE OUTRO."
        },
        palavra011 = {
            nome: "QUASAR",
            categoria:"OBJETO MUITO LUMINOSO E DISTANTE, ACREDITA-SE QUE SEJA O NÚCLEO DE UMA GALÁXIA JOVEM."
        },
        palavra012 = {
            nome: "METEORO",
            categoria:"QUANDO UM FRAGMENTO DE ROCHA OU METAL ENTRA NA ATMOSFERA DA TERRA E BRILHA."
        },
        palavra013 = {
            nome: "EXOPLANETA",
            categoria:"PLANETA QUE ORBITA UMA ESTRELA FORA DO NOSSO SISTEMA SOLAR."
        },
        palavra014 = {
            nome: "VIA LACTEA",
            categoria:"GALÁXIA QUE CONTÉM NOSSO SISTEMA SOLAR."
        },
        palavra015 = {
            nome: "SOL",
            categoria:"A ESTRELA NO CENTRO DO NOSSO SISTEMA SOLAR."
        },
        palavra016 = {
            nome: "GRAVIDADE",
            categoria:" FORÇA QUE ATRAI CORPOS PARA O CENTRO DA TERRA OU PARA OUTRO CORPO CELESTE."
        },
        palavra017 = {
            nome: "TELESCOPIO",
            categoria:"TRANSPORTE"
        }
    ];
}

function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO"," Palavra e/ou Categoria inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);  
    sortear();
    
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}


async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none";
    }
}

