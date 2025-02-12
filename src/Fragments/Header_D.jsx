export const Header_D = () =>{
    return (
        <header className="bg-light py-3">
        <div className="container d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
      <img src="profile.png" alt="Profile Picture" className="rounded-circle me-3" width="40" height="40">
      <div>
        <h1 className="h4 mb-0">Task Manager</h1>
        <p className="text-muted mb-0">LEVEL 21</p>
      </div>
    </div>
    <div>
      <i className="bi bi-lightbulb fs-4 me-3"></i>
      <i className="bi bi-heart fs-4 me-3"></i>
      <i className="bi bi-crown fs-4"></i>
    </div>
  </div>  
      
      </header>

    );
};