import{useState}from"react";
function UserFormComponent({onCadastrar}){
    const[nome,setNome]=useState("");
    const[email,setEmail]=useState("");
    const[senha,setSenha]=useState("");
    const handleSubmit=(e)=>{e.preventDefault();onCadastrar({nome,email,senha});setNome("");setEmail("");setSenha("")};
    
    return(<form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="nome">Nome:</label><input type="text" id="nome" value={nome} onChange={(e)=>setNome(e.target.value)} required/>
        </div>
        <div>
            <label htmlFor="email">Email:</label><input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div>
            <label htmlFor="senha">Senha:</label><input type="password" id="senha" value={senha} onChange={(e)=>setSenha(e.target.value)} required/>
        </div>
        <button type="submit">Cadastrar</button>
    </form>)
    }

function UserFormComponent({ onCadastrar }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onCadastrar({ nome, email, senha });
        setNome("");
        setEmail("");
        setSenha("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="senha">Senha:</label>
                <input
                    type="password"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    );
}



export default UserFormComponent;



