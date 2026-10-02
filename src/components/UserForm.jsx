import { useState } from "react";

function UserForm({ onCadastrar }){
    const [nome, setNome] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [enviando, setEnviando] = useState(false)

    async function handleSubmit(evento) {
        evento.preventDefault()
        const novoUsuario = {
            name: nome,
            username: username,
            email: email,
            phone: telefone
        }

        setEnviando(true)
        try {
            const cadastroRealizado = await onCadastrar(novoUsuario)
            if (cadastroRealizado) {
                limparFormulario()
            }
        } finally {
            setEnviando(false)
        }
    }

    function limparFormulario() {
        setNome("")
        setUsername("")
        setEmail("")
        setTelefone("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                placeholder="Nome"
                aria-label="Nome"
                autoComplete="name"
                required
                value={nome}
                onChange={(evento) => {
                    setNome(evento.target.value)
                }}
            />

            <input type="text"
                placeholder="Usuário"
                aria-label="Usuário"
                autoComplete="username"
                required
                value={username}
                onChange={(evento) => {
                    setUsername(evento.target.value)
                }}
            />

            <input type="email"
                placeholder="E-mail"
                aria-label="E-mail"
                autoComplete="email"
                required
                value={email}
                onChange={(evento) => {
                    setEmail(evento.target.value)
                }}
            />

            <input type="tel"
                placeholder="Telefone"
                aria-label="Telefone"
                autoComplete="tel"
                required
                value={telefone}
                onChange={(evento) => {
                    setTelefone(evento.target.value)
                }}
            />

            <button type="submit" disabled={enviando}>
                {enviando ? "Cadastrando..." : "Cadastrar"}
            </button>
        </form>
    )
}

export default UserForm