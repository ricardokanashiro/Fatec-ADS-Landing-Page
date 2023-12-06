var $animation_elements = $('.animation-element');
var $window = $(window);

$window.on('scroll', check_if_in_view);
$window.on('scroll resize', check_if_in_view);

$window.trigger('scroll');

function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
  
    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);
  
      if ((element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view');
      }
    });
}

function calcularTamanhoDoRetangulo(texto) {
  const codeBox = document.getElementById('codeBox');
  const textoTemporario = document.createElement('p');
  textoTemporario.style.visibility = 'hidden';
  textoTemporario.style.position = 'absolute';
  textoTemporario.style.whiteSpace = 'pre-wrap';
  textoTemporario.innerHTML = texto;

  codeBox.appendChild(textoTemporario);

  const tamanho = {
    largura: textoTemporario.offsetWidth,
    altura: textoTemporario.offsetHeight
  };

  codeBox.removeChild(textoTemporario);

  return tamanho;
}

function escreverTexto(elemento, texto, velocidade) {
  elemento.innerHTML = '';

  const tamanhoDoTexto = calcularTamanhoDoRetangulo(texto);

  elemento.style.width = tamanhoDoTexto.largura + 'px';
  elemento.style.height = tamanhoDoTexto.altura*1.4 + 'px';

  let i = 0;
  const intervalo = setInterval(function() {
    if (i < texto.length - 1) {
      elemento.innerHTML += texto.charAt(i);
      i++;
    } else {
      const ultimoCaractere = texto.charAt(i);
      const piscar = setInterval(function() {
        if (elemento.innerHTML.endsWith(ultimoCaractere)) {
          elemento.innerHTML = elemento.innerHTML.slice(0, -1);
        } else {
          elemento.innerHTML += ultimoCaractere;
        }
      }, 500); // Tempo de piscar: 500 milissegundos (0.5 segundos)

      clearInterval(intervalo); // Para o loop principal
    }

    if (i >= texto.length) {
      clearInterval(intervalo);
    }
  }, velocidade);
}

const elementoTexto = document.getElementById('texto');

const textoParaEscrever = '> o curso superior de Análise e Desenvolvimento de Sistemas tem a proposta de ensinar e capacitar seus estudantes, tornando-os profissionais na área da programação com conceitos de banco de dados, sistemas operacionais, programação voltada a objeto, programação estruturada, programação de scripts, entre outros_';

const velocidadeEscrita = 20;

escreverTexto(elementoTexto, textoParaEscrever, velocidadeEscrita);
