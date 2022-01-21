function agrupar_operadores(operadores){
    let operadores_mapeados = [];
    operacoes = ["^","*","/","+","-"];

    for(i = 0; i < 5; i++){
        var indices = [];
        var element = operacoes[i];
        var idx = operadores.indexOf(element);
        while (idx != -1) {
            indices.push(idx);
            idx = operadores.indexOf(element, idx + 1);
        }
        operadores_mapeados.push(indices);
    }

    console.log(operadores_mapeados);
    return operadores_mapeados;
}