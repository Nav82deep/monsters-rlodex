import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component";
import "./App.css";
import SearchBox from "./components/search-box/search-box.component";

function App() {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);

  const [filteredMonsters, setFilteredMosnter] = useState(monsters);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value;
    setSearchField(searchFieldString);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    setFilteredMosnter(newFilteredMonsters);
  }, [monsters, searchField]);

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>;
      <SearchBox
        className="search-box-monster"
        placeholder="search monsters"
        onSearchChange={onSearchChange}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}
/*
class App extends Component {
  constructor() {
    super();

    this.state = {
      searchField: "",
      monsters: [],
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return {
            monsters: users,
          };
        })
      );
  }
  onSearchChange = (event) => {
    const searchField = event.target.value;
    this.setState(() => {
      return {
        searchField,
      };
    });
  };
  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>;
        <SearchBox
          className="search-box-monster"
          placeholder="search monsters"
          onSearchChange={onSearchChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}*/

export default App;
