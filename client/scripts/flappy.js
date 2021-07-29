function novoElemento(tagName, className){
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Barreira(reversa = false){
    this.elemento = novoElemento('div', 'barreira')

    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')

    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}

function ParDeBarreiras(altura, abertura, x){
    this.elemento = novoElemento('div', 'par-de-barreiras')

    this.superior = new Barreira(true)
    this.inferior = new Barreira (false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(x)
}


function Barreiras(altura, largura, abertura, espaco, notificarPonto){
    this.pares = [
        new ParDeBarreiras(altura, abertura, largura), 
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco * 2),
        new ParDeBarreiras(altura, abertura, largura + espaco * 3)
    ]

    const deslocamento = 3

    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)
            //depois que a barreira sair ela tem que voltar, ficar em loop
            //quando o elemento sair da tela (area do jogo)
            if(par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }
            const meio = (largura / 2) - 170.0 // 170 tamanho da largura da barreira + largura do passaro
            const cruzouOMeio = par.getX() + deslocamento >= meio && par.getX() < meio

            //acabou de cruzar o meio
            if (cruzouOMeio) notificarPonto()
        
        })
    }
}

function Passaro(alturaJogo){
    let voando = false;

    this.elemento = novoElemento('img', 'passaro')
    this.elemento.src = 'images/passaro.png'

    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`

    window.onkeydown = e => voando = true
    window.onkeyup = e => voando = false

    this.animar = () => {
        const novoY = this.getY() + (voando ? 8 : -5)
        const alturaMaxima = alturaJogo - this.elemento.clientWidth

        if(novoY <= 0){
            this.setY(0)
        }else if(novoY >= alturaMaxima){
            this.setY(alturaMaxima)
        }else {
            this.setY(novoY)
        }
    }

    this.setY(alturaJogo / 2)
}

function Progresso(){
    this.elemento = novoElemento('span', 'progresso')
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos
    }
    this.atualizarPontos(0)
}

function estaoSobrepostos(elementoA, elementoB){
    // Retangulo associado ao elemento
    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()

    const horizontal = a.left + a.width >= b.left
        && b.left + b.width >= a.left

    const vertical = a.top + a.height >= b.top
        && b.top + b.height >= a.top

    return horizontal && vertical

}

function colidiu(passaro, barreiras){
    let colisao = false

    barreiras.pares.forEach(parDeBarreiras => {
        if(!colisao){
            const superior = parDeBarreiras.superior.elemento
            const inferior = parDeBarreiras.inferior.elemento

            colisao = estaoSobrepostos(passaro.elemento, superior) 
                || estaoSobrepostos(passaro.elemento, inferior)
        }
    })

    return colisao
}

function GameOver() {
    const areaDoJogo = document.querySelector('[wm-flappy]')
 
    this.elemento = novoElemento('span', 'game-over')
    this.elemento.innerHTML = 'GAME OVER'
 
    areaDoJogo.appendChild(this.elemento)

}

var socket = io();

function FlappyBird() {
    let pontos = 0

    const areaDoJogo = document.querySelector('[wm-flappy]')
    const altura = areaDoJogo.clientHeight
    const largura = areaDoJogo.clientWidth

    const progresso = new Progresso()
    const barreiras = new Barreiras(altura, largura, 200, 400,
        () => progresso.atualizarPontos(++pontos))
    const passaro = new Passaro(altura)

    //setInterval(()=>{socket.emit("chat", altura)},100);

    areaDoJogo.appendChild(progresso.elemento)
    areaDoJogo.appendChild(passaro.elemento)

    barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))

    this.start = () => {
        // loop do Jogo 
        const temporizador = setInterval(() => {
            barreiras.animar() 
            passaro.animar()

            if(colidiu(passaro, barreiras)){
                clearInterval(temporizador)
                new GameOver()

                setTimeout(() => {
                    window.location.reload()
                }, 2000)

            }

        },20)
    }
}

new FlappyBird().start()

socket.on("chat", function(msg){ 
    new Passaro(msg);
  });


// TESTE 4 - Barreiras, Passaro, Animacao e Progresso

// const barreiras = new Barreiras(700, 1200, 300, 500)
// const passaro = new Passaro(700)
// const areaDoJogo = document.querySelector('[wm-flappy]')

// // adicionando passaro
// areaDoJogo.appendChild(passaro.elemento)
// //adicionando progresso
// areaDoJogo.appendChild(new Progresso().elemento)

// barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))
// setInterval(() => {
//     barreiras.animar()
//     passaro.animar()
// },20)

// TESTE 3 - Barreiras e Animacao

// const barreiras = new Barreiras(700, 1200, 200, 400)
// const areaDoJogo = document.querySelector('[wm-flappy]')
// barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))
// setInterval(() => {
//     barreiras.animar()
// },1)


// TESTE 2 - Par de Barreiras
// const b = new ParDeBarreiras(700, 300, 400)
// document.querySelector('[wm-flappy]').appendChild(b.elemento)

// TESTE 1 - Barreira
// const b = new Barreira()
// b.setAltura(300)
// document.querySelector('[wm-flappy]').appendChild(b.elemento)

