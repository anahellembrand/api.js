document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("emailInput").focus(); // Focar no campo de e-mail

    document.getElementById("emailInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") { 
            login(); // Pressionar Enter também faz login
        }
    });
});

async function login() {
    const email = document.getElementById("emailInput").value.trim().toLowerCase();

    if (!email) {
        alert("Por favor, insira um e-mail válido!");
        return;
    }

    try {
        const response = await fetch("/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (data.success) {
            sessionStorage.setItem("userEmail", email);
            window.location.href = "index.html"; // Redireciona para a página de acesso
        } else {
            alert("⛔ Acesso negado! Verifique se seu e-mail está correto.");
        }
    } catch (error) {
        alert("Erro ao conectar com o servidor. Tente novamente.");
        console.error("Erro no login:", error);
    }
}
