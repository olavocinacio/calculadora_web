let cont = 0;

function refresh() {
    tocar("audio_resultado");

    let entrada = document.getElementById('_entrada').innerHTML;
    let var1 = '';
    let operadores = [];
    let termos = [];

    for(let i = 0; i < entrada.length; i++){
        if(entrada[i] != "+" && entrada[i] != "-" && entrada[i] != "/" && entrada[i] != "^" && entrada[i] != "*"){
            var1 = var1 + entrada[i];
        }else{
            termos.push("" + var1);
            var1 = '';
            operadores.push("" + entrada[i])
        }
    }

    if(var1 != ''){
        termos.push('' + var1);
    }

    resultado = operações(operadores, termos);

    if(isNaN(resultado)){
        document.getElementById('_entrada').innerHTML = "Erro";
    }else{
        document.getElementById('_entrada').innerHTML = "" + resultado;
    }
    cont = 1;
}

function operações(operadores, termos){
    let operadores_agrupados = agrupar_operadores(operadores);

    for(let i = 0; i < operadores_agrupados.length; i++){
        switch(i){
            case 0:
                for(let j = 0; j < operadores_agrupados[i].length; j++){
                    termos[operadores_agrupados[i][j]+1] = parseFloat(termos[operadores_agrupados[i][j]])**parseFloat(termos[operadores_agrupados[i][j]+1]);
                    delete termos[operadores_agrupados[i][j]];
                }
                break;
            case 1:
                for(let j = 0; j < operadores_agrupados[i].length; j++){
                    termos[operadores_agrupados[i][j]+1] = parseFloat(termos[operadores_agrupados[i][j]])*parseFloat(termos[operadores_agrupados[i][j]+1]);
                    delete termos[operadores_agrupados[i][j]];
                }
                break;
            case 2:
                for(let j = 0; j < operadores_agrupados[i].length; j++){
                    termos[operadores_agrupados[i][j]+1] = parseFloat(termos[operadores_agrupados[i][j]])/parseFloat(termos[operadores_agrupados[i][j]+1]);
                    delete termos[operadores_agrupados[i][j]];
                }
                break;
            case 3:
                for(let j = 0; j < operadores_agrupados[i].length; j++){
                    termos[operadores_agrupados[i][j]+1] = parseFloat(termos[operadores_agrupados[i][j]])+parseFloat(termos[operadores_agrupados[i][j]+1]);
                    delete termos[operadores_agrupados[i][j]];
                }
                break;
            case 4:
                for(let j = 0; j < operadores_agrupados[i].length; j++){
                    termos[operadores_agrupados[i][j]+1] = parseFloat(termos[operadores_agrupados[i][j]])-parseFloat(termos[operadores_agrupados[i][j]+1]);
                    delete termos[operadores_agrupados[i][j]];
                }
                break;
        }
        // termos = termos.filter(e => String(e).trim());
    }
    console.log(termos);
    return termos[termos.length-1];

    //No estado atual, tudo certo, com exceção de equações em que uma operação já realizada, é repetida após uma diferente (ex: 2*6 - 3*4). Nesse caso, sobra um espaço em branco
    //entre o resultado da primeira operação e o da outra, não possibilitando operar novamente e retornando somente o resultado da última
}

function adiciona(param){
    if(document.getElementById("_entrada").innerHTML == "Erro"){
        document.getElementById("_entrada").innerHTML = ""
    }
    document.getElementById("_entrada").innerHTML = document.getElementById("_entrada").innerHTML + param;
}

function adiciona_num(param){
    if(cont == 1){
        cont = 0;
        document.getElementById("_entrada").innerHTML = "" + param;
    }else{
        adiciona(param);
    }
    tocar("audio_num");
}

function adiciona_opera(param){
    adiciona(param);
    tocar("audio_opera");
}

function del(){
    str = "" + document.getElementById('_entrada').innerHTML;
    str = str.slice(0,-1);    
    document.getElementById('_entrada').innerHTML = "" + str;
    tocar("audio_resultado");
}

function limpa(){
    document.getElementById('_entrada').innerHTML = "";
    tocar("audio_resultado");
}

function tocar(nome_audio) {
    var audio = document.getElementById(nome_audio);
    audio.play();
}
