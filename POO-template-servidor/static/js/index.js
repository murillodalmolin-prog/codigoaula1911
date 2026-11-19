url = "/pessoas";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnEnviar").addEventListener("click", enviarDados);
});

async function enviarDados() {
  const form = document.getElementById("form-cadastro");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    if (!formData.get("id")) {
      salvarPessoa(formData);
    } else {
      editarPessoa(formData);
    }
  });
}

async function salvarPessoa(data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }

  window.location.reload();
}

async function prepararEditarPessoa(id) {
  try {
    const response = await fetch(url+`/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const pessoa = await response.json();
    console.log("Success:", pessoa);
    document.getElementById("id").value = pessoa.id;
    document.getElementById("nome").value = pessoa.nome;
    document.getElementById("idade").value = pessoa.idade;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function editarPessoa(data) {
  try {
    const response = await fetch(`${url}/${data.get("id")}`, {
      method: "PUT",
      body: data,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }

  window.location.reload();
}

async function buscarPessoas() {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const listaPessoas = await response.json();

    console.log("Success:", listaPessoas);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deletarPessoa(id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
  window.location.reload();
}
