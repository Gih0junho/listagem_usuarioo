function UserCardComponent({ usuario, onSelecionarUsuario, onExcluirUsuario }) {
    return (
        <li className="card-usuario">

            <div className="avatar">
                {usuario.name.charAt(0)}
            </div>

            <h2 className="nome-usuario">
                {usuario.name}
            </h2>

            <p className="username">
                @{usuario.username}
            </p>

            <p className="email">
                {usuario.email}
            </p>

            <div className="acoes-card">
                <button
                    type="button"
                    onClick={() => onSelecionarUsuario(usuario.id)}
                >
                    Ver detalhes
                </button>
                <button
                    className="botao-excluir"
                    type="button"
                    onClick={() => onExcluirUsuario(usuario.id)}
                >
                    Excluir
                </button>
            </div>

        </li>
    );
}

export default UserCardComponent;