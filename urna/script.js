let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let  VotoBranco = false;
let votos = [];

function comercarEtapa(){
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    VotoBranco = false;

    for(let i=0; i< etapa.numeros; i++){
        numeroHtml += i == 0 ? '<div class="numero pisca"></div>' : '<div class="numero"></div>';
    }
    
    seuVotoPara.style.display= 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display= 'none';
    lateral.innerHTML = '';
    numeros.innerHTML =  numeroHtml;
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato =  etapa.candidatos.filter((item) => {
        if(item.numero === numero){
            return true;
        }else {
            return false;
        }
    });

    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display= 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>
        Partido:${candidato.partido}<br/>`;

        let fotosHtml = '';
        for(let i in candidato.fotos){
            fotosHtml += candidato.fotos[i].small ? `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>` : `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
        }
        lateral.innerHTML = fotosHtml;
    }else {
        seuVotoPara.style.display = 'block';
        aviso.style.display= 'block';
        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO NULO</div>`;
    }
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        }else {
            atualizaInterface();
        }
    }
}

function branco() {
    if(numero === ''){
        VotoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display= 'block';
        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO EM BRANCO</div>`;
        numeros.innerHTML= '';
    }else {
        alert("Para Votar em Branco não pode ter digitado nenhum número");
    }
}

function corrige() {
    comercarEtapa();  
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(VotoBranco === true){
        alert("Confirmado como VOTO EM BRANCO");
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    }else if(numero.length === etapa.numeros){
        alert("Confirmado como " + numero);
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }
   
    if(votoConfirmado){
        etapaAtual++;
       if(etapas[etapaAtual]){
           comercarEtapa();
       }else {
           document.querySelector('.tela').innerHTML = `<div class="aviso-gigante pisca">FIM</div>`;
           console.log(votos)
        }
    }
}


comercarEtapa();