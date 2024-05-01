const themeCheckbox = document.querySelector('.theme input[type="checkbox"]');
const htmlElement = document.querySelector('html');

themeCheckbox.addEventListener('change', () => {
    htmlElement.classList.toggle('dark-theme'); 
});
document.getElementById('meuFormulario').addEventListener('submit', function(e) {
    e.preventDefault();
    document.body.style.overflow = 'hidden';
    document.getElementById('loading').style.display = 'flex';
    var loadingText = document.getElementById('loadingText');
    loadingText.textContent = 'Enviando o email...'; 

    var formData = new FormData(this);
    fetch('/send-email', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.body.style.overflow = ''; // Permite rolagem
        setTimeout(() => {
            if (data.success) {
                loadingText.textContent = 'Enviado com sucesso!'; // Altera para "Enviado com sucesso" após um tempo
            } else {
                loadingText.textContent = 'Falha ao enviar e-mail. Tente novamente.';
            }
        }, 4000); // Tempo de espera em milissegundos (2 segundos)
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none'; // Esconde a animação após um tempo
        }, 5000); // Tempo total antes de esconder em milissegundos (5 segundos)
    })
    .catch(error => {
        console.error('Erro:', error);
        loadingText.textContent = 'Erro ao enviar e-mail. Tente novamente.';
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
        }, 5000); // Tempo total antes de esconder em milissegundos (5 segundos)
        document.body.style.overflow = '';
    });
});
