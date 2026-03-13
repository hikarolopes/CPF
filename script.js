// Função principal para gerar CPF
function gerarCPF() {
    // Gerar 9 dígitos aleatórios
    let cpf = [];
    for (let i = 0; i < 9; i++) {
        cpf.push(Math.floor(Math.random() * 10));
    }

    // Calcular primeiro dígito verificador
    let primeiroDigito = calcularDigitoVerificador(cpf, 10);
    cpf.push(primeiroDigito);

    // Calcular segundo dígito verificador
    let segundoDigito = calcularDigitoVerificador(cpf, 11);
    cpf.push(segundoDigito);

    // Verificar se não é um CPF com todos dígitos iguais
    if (cpf.every(digito => digito === cpf[0])) {
        return gerarCPF(); // Gerar novamente se for inválido
    }

    // Formatar e exibir o CPF
    exibirCPF(cpf);
    mostrarMensagem('✅ Novo CPF gerado com sucesso!', 'success');
}

// Função para calcular dígito verificador
function calcularDigitoVerificador(cpf, pesoInicial) {
    let soma = 0;
    let peso = pesoInicial;

    for (let i = 0; i < cpf.length; i++) {
        soma += cpf[i] * peso;
        peso--;
    }

    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

// Função para formatar e exibir o CPF
function exibirCPF(cpf) {
    let cpfFormatado = 
        cpf.slice(0, 3).join('') + '.' +
        cpf.slice(3, 6).join('') + '.' +
        cpf.slice(6, 9).join('') + '-' +
        cpf.slice(9, 11).join('');
    
    document.getElementById('cpfDisplay').textContent = cpfFormatado;
}

// Função para copiar CPF
function copiarCPF() {
    let cpfElement = document.getElementById('cpfDisplay');
    let cpf = cpfElement.textContent;

    if (cpf === '___.___.___-__') {
        mostrarMensagem('⚠️ Gere um CPF primeiro!', 'error');
        return;
    }

    navigator.clipboard.writeText(cpf).then(function() {
        mostrarMensagem('📋 CPF copiado para a área de transferência!', 'success');
    }, function() {
        mostrarMensagem('❌ Erro ao copiar CPF', 'error');
    });
}

// Função para mostrar mensagens
function mostrarMensagem(texto, tipo) {
    let messageElement = document.getElementById('message');
    messageElement.textContent = texto;
    messageElement.className = 'message ' + tipo;
    
    setTimeout(function() {
        messageElement.textContent = '';
        messageElement.className = 'message';
    }, 3000);
}

// Gerar um CPF ao carregar a página
window.onload = function() {
    gerarCPF();
};