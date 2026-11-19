class Pessoa:
    def __init__(self, id, nome, idade):
        self.id = id
        self.nome = nome
        self.idade = idade

    def to_dict(self):
        return {"nome": self.nome, "idade": self.idade}


from flask import Flask, request, jsonify, render_template

app = Flask(__name__, template_folder="html")

pessoas_bd = []
id = 0

@app.route("/")
def index():
    return render_template("index.html", lista_pessoas=pessoas_bd)

@app.route("/pessoas")
def listar_pessoas():
    return jsonify(obj.__dict__ for obj in pessoas_bd)

@app.route("/pessoas/<int:identificador>")
def buscar_pessoa(identificador):
    for pessoa in pessoas_bd:
        if identificador == pessoa.id:
            return jsonify(pessoa.__dict__)
    return jsonify({"mensagem":"Pessoa não encontrada"})

@app.route("/pessoas", methods=["POST"])
def inserir_pessoas_form():
    global id
    id=id+1
    nome=request.form.get("nome")
    idade=request.form.get("idade")
    pessoas_bd.append(Pessoa(id,nome,idade))
    return jsonify({"mensagem":"pessoa salva"})


@app.route("/pessoas/<int:id>",methods=["PUT"])
def editar_pessoa(id):
    for pessoa in pessoas_bd:
        if pessoa.id==id:
            pessoa.nome=request.form.get("nome")
            pessoa.idade=request.form.get("idade")
            return jsonify({"mensagem":"pessoa editada com sucesso"})
    
@app.route("/pessoas/<int:id>",methods=["DELETE"])
def excluir_pessoa(id):
    for pessoa in pessoas_bd:
        if pessoa.id==id:
            pessoas_bd.remove(pessoa)

    return "", 204



app.run(debug=True)
