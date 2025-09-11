import "./profilepage.css";
export default function ProfilePage() {
    return (
        <>
            <div>
                <div className="d-flex flex-row">
                    <div className = "card d-flex flex-row align-items-center user-profile">
                        <div >
                            <img style = {{borderRadius: "500px" , height : "130px" , width : "130px"}} src = "data:image/jpeg;base64,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" alt = "avathar" />
                        </div>
                        <div className="profile-page">
                            <h1>User Profile</h1>
                            <p>User Name : Sri Vardhan Adiki</p>
                            <p>Email: srivardhanadiki@gmail.com</p>
                        </div>
                        <div style = {{position: "absolute" , bottom : "20px"}}>
                            <button className="btn btn-danger">Log Out</button>
                        </div>
                    </div>

                    <div className = "card" style = {{marginLeft: "20px" , padding: "20px" , flex : 1}}>
                        <h1>Edit Profile here!!</h1>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" placeholder="Enter your name" />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter your password" />
                        <br />
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                        <br />
                        <button className="save-button">Save Changes</button>
                    </div>
                </div>
                <div className="bg-dark text-white p-3" >
                    <h2 className="text-left">About this website</h2>
                    <p>Created by : <a target = "_blank" style = {{color: "Green"}} href = "https://www.linkedin.com/in/sri-vardhan-adiki/">Sri Vardhan Adiki</a></p>
                    <p>Checkout more @ MY <a target = "_blank" style = {{color: "Green"}} href = "https://github.com/SRI-VARDHAN-ADIKI">GitHub</a></p>
                    <p>&copy; 2023 Expense Tracker. All rights reserved.</p>
                </div>
            </div>
        </>
    );
}
