    export default function Navbar() {
    return (
        <div style={styles.navbar}>
        <a href="#home" style={styles.link}>Home</a>
        <a href="#news" style={styles.link}>News</a>
        <a href="#contact" style={styles.link}>Contact</a>
        <a href="#about" style={styles.link}>About</a>
        <br/>
        <br/>
        <br/>
        <a href="logout" style={styles.link}>Logout</a>

        </div>
    );

};

const styles = {
  navbar: {
    height: "100vh",
    width: "250px",
    backgroundColor: "#f1f1f1",
    display: "flex",
    flexDirection: "column",
    paddingTop: "20px",
    borderRight: "2px solid #3333",   
  },
  link: {
    padding: "12px 16px",
    textDecoration: "none",
    color: "black",
    display: "block",
  }
};
