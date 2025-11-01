import "./Navbar.config.css"

function Navbar(){
   return (
    <nav id="navbar">
      <div className="logo-section">
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="chimpanzee-logo"
          height={40}
          width={40}
        />
        <h2>Chimpanzee World 🐵</h2>
      </div>
      <ul className="nav-links">
        <li>Home</li>
        <li>About</li>
        <li>Bananas 🍌</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;
