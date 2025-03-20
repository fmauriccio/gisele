document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-avaliacao");
    const listaAvaliacoes = document.getElementById("lista-avaliacoes");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const nota = document.getElementById("nota").value;
        const comentario = document.getElementById("comentario").value;
        const imagemInput = document.getElementById("imagem");
        const imagem = imagemInput.files[0];

        const novaAvaliacao = document.createElement("div");
        novaAvaliacao.classList.add("avaliacao");

        let imagemTag = "";
        if (imagem) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagemTag = `<img src="${e.target.result}" width="100px">`;
                novaAvaliacao.innerHTML = `<strong>${nome}</strong> - ${"★".repeat(nota)}<br>${comentario}<br>${imagemTag}`;
                listaAvaliacoes.appendChild(novaAvaliacao);
            };
            reader.readAsDataURL(imagem);
        } else {
            novaAvaliacao.innerHTML = `<strong>${nome}</strong> - ${"★".repeat(nota)}<br>${comentario}`;
            listaAvaliacoes.appendChild(novaAvaliacao);
        }

        form.reset();
    });

    document.querySelectorAll(".estrelas").forEach(stars => {
        stars.addEventListener("click", function(event) {
            let nota = Array.from(stars.textContent).indexOf(event.target.textContent) + 1;
            document.getElementById("nota").value = nota;
            stars.innerHTML = "★".repeat(nota) + "☆".repeat(5 - nota);
        });
    });
});
