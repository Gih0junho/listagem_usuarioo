import { useEffect, useState } from "react";
import axios from "axios";

import HeaderComponent from "./components/HeaderComponent";
import LoadingComponent from "./components/LoadingComponent";
import UserListComponent from "./components/UserListComponent";

import "./App.css";
import UserDetailsComponent from "./components/UserDetailsComponent";
import UserForm from "./components/UserForm";
import ModalComponent from "./components/ModalComponent";


const filtrarUsuarioPorTermo = (termo) => (usuario) => {
    const termoLower = termo.toLowerCase();
    return (
        usuario.name.toLowerCase().includes(termoLower) ||
        usuario.username.toLowerCase().includes(termoLower) ||
        usuario.email.toLowerCase().includes(termoLower)
    );
};


function App() {
    const url = "https://jsonplaceholder.typicode.com";

    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [busca, setBusca] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null)
    const [erroDetalhes, setErroDetalhes] = useState(null)
    const [erroCadastro, setErroCadastro] = useState(null)
    const [toast, setToast] = useState(null)

    const usuariosFiltrados = usuarios
        .filter(filtrarUsuarioPorTermo(busca));

    function buscarUsuario(id) {
        setErroDetalhes(null)
        const usuarioEncontrado = usuarios.find((usuario) => usuario.id === id)

        if (usuarioEncontrado) {
            setUsuarioSelecionado(usuarioEncontrado)
        } else {
            setErroDetalhes("Não foi possível carregar os detalhes. Tente novamente.")
        }
    }


    async function buscarUsuarios() {
        try {
            setCarregando(true);
            const response = await axios.get(
                `${url}/users`
            );

            const data = response.data;

            setUsuarios(data);
        } catch (error) {
            console.log(
                "Erro ao buscar usuários: ",
                error
            );
            setErro(
                `Não foi possível carregar os usuários. Código: ${error.message}`
            );
            setUsuarios([]);
        } finally {
            setCarregando(false);
        }
    }

    function limparDetalhesUsuario() {
        setUsuarioSelecionado(null)
    }

    function excluirUsuario(id) {
        setUsuarios((usuariosAtuais) =>
            usuariosAtuais.filter((usuario) => usuario.id !== id)
        )

        if (usuarioSelecionado?.id === id) {
            limparDetalhesUsuario()
        }
    }

    async function cadastrarUsuario(usuario) {
        setErroCadastro(null)
        try {
            const response = await axios.post(
                `${url}/users`, usuario
            )
            const data = response.data
            const idLocal = usuarios.reduce(
                (maiorId, usuarioAtual) => Math.max(maiorId, Number(usuarioAtual.id) || 0),
                Date.now()
            ) + 1
            const usuarioCriado = {
                ...usuario,
                ...data,
                id: idLocal,
                address: data.address ?? usuario.address ?? { city: "Não informado" },
                website: data.website ?? usuario.website ?? "Não informado",
            }

            setUsuarios((usuariosAtuais) => [usuarioCriado, ...usuariosAtuais])
            setBusca("")
            setToast({
                id: Date.now(),
                mensagem: `${usuarioCriado.name} foi adicionado à lista!`,
            })
            return true
        } catch (error) {
            console.log("Erro ao cadastrar usuário: ", error)
            setErroCadastro("Não foi possível cadastrar o usuário. Tente novamente.")
            return false
        }
    }

    useEffect(() => {
        if (!toast) return undefined

        const temporizador = window.setTimeout(() => setToast(null), 3200)
        return () => window.clearTimeout(temporizador)
    }, [toast])

    useEffect(() => {
        buscarUsuarios();
    }, []);


    return (
        <div className="app">
            <HeaderComponent
                busca={busca}
                setBusca={setBusca}
            />
            {toast && (
                <div
                    key={toast.id}
                    className="toast-sucesso"
                    role="status"
                    aria-live="polite"
                >
                    <span className="toast-icone" aria-hidden="true">OK</span>
                    <p>{toast.mensagem}</p>
                    <button
                        className="toast-fechar"
                        type="button"
                        aria-label="Fechar aviso"
                        onClick={() => setToast(null)}
                    >
                        ×
                    </button>
                </div>
            )}
            {carregando && (
                <LoadingComponent />
            )}

            <p className="informacao">
                Usuários encontrados: {usuarios.length}
            </p>

            {erro && (
                <p className="erro">
                    {erro}
                </p>
            )}

            {erroDetalhes && (
                <p className="erro" role="alert">
                    {erroDetalhes}
                </p>
            )}


            {!carregando && !erro && (
                <>
                    <p className="informacao">
                        {usuariosFiltrados.length} usuário(s) encontrado(s)
                    </p>

                    {usuariosFiltrados.length > 0 ? (
                        <UserListComponent
                            usuarios={usuariosFiltrados}
                            onSelecionarUsuario={buscarUsuario}
                            onExcluirUsuario={excluirUsuario}
                        />
                    ) : (
                        <p className="sem-resultados">
                            Nenhum usuário encontrado.
                        </p>
                    )}

                    {usuarioSelecionado && (
                        <ModalComponent onFechar={limparDetalhesUsuario}>
                            <UserDetailsComponent
                                usuario={usuarioSelecionado}
                                onFecharDetalhes={limparDetalhesUsuario}
                            />
                        </ModalComponent>
                    )}

                    <UserForm onCadastrar={cadastrarUsuario} />

                    {erroCadastro && (
                        <p className="erro" role="alert">
                            {erroCadastro}
                        </p>
                    )}

                </>
            )}
        </div>
    );
}

export default App;

