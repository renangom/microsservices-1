import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";


function App() {

  // se olharmos em termos de requisições, para cada post iremos fazer uma requisição
  // se tivermos 1 mi de posts, teremos que fazer 1 mi de requisições toda vez que a página atualizar
  return (
    <div className="App">
      <CreatePost />
      <Posts />
    </div>
  );
}

export default App;
