$(document).ready(function() {
    // carrinho de compras
    let carrinho = [];
    let carrinhoCount = 0;

    // menu mobile
    $('#mobile_btn').on('click', function() {
        $('#mobile_menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-xmark');
    });
    
    // fechar menu mobile ao clicar em um link
    $('.nav_item a').on('click', function() {
        $('#mobile_menu').removeClass('active');
        $('#mobile_btn').find('i').removeClass('fa-xmark').addClass('fa-bars');
    });
    
    // atualizar item ativo no menu ao rolar a pagina
    $(window).on('scroll', function() {
        var scrollPosition = $(window).scrollTop();
        
        $('section').each(function() {
            var sectionTop = $(this).offset().top - 100;
            var sectionBottom = sectionTop + $(this).outerHeight();
            var sectionId = $(this).attr('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $('.nav_item').removeClass('active');
                $('a[href="#' + sectionId + '"]').parent().addClass('active');
            }
        });
    });
    
    // animacao suave para os produtos
    $('.produto').each(function(i) {
        $(this).delay(i * 200).animate({opacity: 1, top: 0}, 500);
    });

    // funcao para atualizar carrinho
    function atualizarCarrinho() {
        $('#carrinho_count').text(carrinhoCount);
        $('#carrinho_count_mobile').text(carrinhoCount);
    }

    // adicionar ao carrinho
    $('.produto .btn_default').on('click', function() {
        const btn = $(this);
        const originalHtml = btn.html();
        
        // efeito de loading
        btn.html('<i class="fa-solid fa-spinner fa-spin"></i>');
        btn.prop('disabled', true);
        
        setTimeout(() => {
            btn.html(originalHtml);
            btn.prop('disabled', false);
            
            // adicionar ao carrinho
            const produto = btn.closest('.produto');
            const nome = produto.find('.produto-titulo').text();
            const preco = produto.find('.produto-preco h4').text();
            
            carrinho.push({ nome, preco });
            carrinhoCount++;
            atualizarCarrinho();
            
            // efeito de confirmacao
            btn.html('<i class="fa-solid fa-check"></i>');
            btn.css('background-color', '#28a745');
            
            setTimeout(() => {
                btn.html(originalHtml);
                btn.css('background-color', '#ED9180');
            }, 1500);
        }, 1000);
    });

    // mostrar carrinho (desktop)
    $('#carrinho_btn').on('click', function() {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
        } else {
            let mensagem = 'Itens no seu carrinho:\n\n';
            carrinho.forEach((item, index) => {
                mensagem += `${index + 1}. ${item.nome} - ${item.preco}\n`;
            });
            mensagem += `\nTotal: ${carrinho.length} item(ns)`;
            alert(mensagem);
        }
    });

    // mostrar carrinho (mobile)
    $('#carrinho_btn_mobile').on('click', function() {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
        } else {
            let mensagem = 'Itens no seu carrinho:\n\n';
            carrinho.forEach((item, index) => {
                mensagem += `${index + 1}. ${item.nome} - ${item.preco}\n`;
            });
            mensagem += `\nTotal: ${carrinho.length} item(ns)`;
            alert(mensagem);
        }
    });

    // contador regressivo
    let tempoRestante = 600; // 10 minutos em segundos

    function atualizarContador() {
        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;
        
        $('#contador').text(
            `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
        );
        
        if (tempoRestante > 0) {
            tempoRestante--;
            setTimeout(atualizarContador, 1000);
        } else {
            $('#contador').text('Promoção encerrada!');
            $('.promocoes .btn_default').prop('disabled', true).css('opacity', 0.5);
        }
    }

    // iniciar contador
    atualizarContador();

    // mostrar modal após 5 segundos
    setTimeout(() => {
        $('#modal-newsletter').fadeIn();
    }, 5000);
    
    // fechar o modal
    $('.close-modal').on('click', function() {
        $('#modal-newsletter').fadeOut();
    });
    
    // fechar modal clicando fora
    $(window).on('click', function(e) {
        if ($(e.target).is('#modal-newsletter')) {
            $('#modal-newsletter').fadeOut();
        }
    });
    
    // formulário do modal
    $('.newsletter-form-modal').on('submit', function(e) {
        e.preventDefault();
        const email = $(this).find('input').val();
        alert(`Obrigada! Cupom de 10% OFF enviado para: ${email}`);
        $('#modal-newsletter').fadeOut();
    });
});
