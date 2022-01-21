let cont = 0;

function refresh (){
    //Lê a expressão do visor e realiza as operações
    //Atualiza o display com o valor passado
    //Ao apertar igual ou outra operação, é chamada, para mostrar o resultado
    adiciona_resultado();
    let entrada = document.getElementById('_entrada').innerHTML;
    let var1 = '';
    let operadores = [];
    const oper = new Map();
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
    console.log("operadores:" + operadores);
    console.log("termos:" + termos);
    resultado = operações(operadores, termos);
    document.getElementById('_entrada').innerHTML = "" + resultado;
    cont = 1;
    console.log(agrupar_operadores(oper));
}

function operações(operadores, termos){
    let resultado = [];
    console.log(operadores);
    console.log(termos);
    for(let i = 0; i < operadores.length; i++){
        if(operadores[i] == "^"){
            resultado.push(parseFloat(termos[i])**parseFloat(termos[i+1]));
            delete operadores[i];
            termos[i+1] = resultado[i];
        }else if(operadores[i] == "/"){
            resultado.push(parseFloat(termos[i])/parseFloat(termos[i+1]));
            delete operadores[i];
            termos[i+1] = resultado[i];
        }else if(operadores[i] == "*"){
            resultado.push(parseFloat(termos[i])*parseFloat(termos[i+1]));
            delete operadores[i];
            termos[i+1] = resultado[i];
        }else if(operadores[i] == "+"){
            resultado.push(parseFloat(termos[i])+parseFloat(termos[i+1]));
            delete operadores[i];
            termos[i+1] = resultado[i];
        }else if(operadores[i] == "-"){
            resultado.push(parseFloat(termos[i])-parseFloat(termos[i+1]));
            delete operadores[i];
            termos[i+1] = resultado[i];
        }
    }

    if(operadores.length>1){
        operações(operadores, resultado);
    }
    return resultado[resultado.length-1];
}

function adiciona_num(param){
    if (cont == 1){
        limpa();
        cont = 0;
    }
    str = document.getElementById("_entrada").innerHTML;
    str = "" + str + param;
    str = document.getElementById("_entrada").innerHTML = "" + str;
    var audio = document.getElementById('audio_num');
    audio.play();
}

function adiciona_opera(param){
    if (cont == 1){
        limpa();
        cont = 0;
    }
    str = document.getElementById("_entrada").innerHTML;
    str = "" + str + param;
    str = document.getElementById("_entrada").innerHTML = "" + str;
    var audio = document.getElementById('audio_opera');
    audio.play();
}

function adiciona_resultado(param){
    if (cont == 1){
        limpa();
        cont = 0;
    }
    str = document.getElementById("_entrada").innerHTML;
    str = "" + str + param;
    str = document.getElementById("_entrada").innerHTML = "" + str;
    var audio = document.getElementById('audio_resultado');
    audio.play();
}


function del(){
    //Apaga o último digito do termo atual (backspace)
    str = "" + document.getElementById('_entrada').innerHTML;
    str = str.slice(0,-1);    
    document.getElementById('_entrada').innerHTML = "" + str;
    var audio = document.getElementById('audio_resultado');
    audio.play();
}

function limpa(){
    //Limpa toda a expressão atual (C)
    document.getElementById('_entrada').innerHTML = "";
    var audio = document.getElementById('audio_resultado');
    audio.play();
}
