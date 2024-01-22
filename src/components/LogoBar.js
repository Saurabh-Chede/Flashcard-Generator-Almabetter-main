import logo from './logo.png'

function LogoBar() {
    return (
      <div
        name="logo-Div"
        className="w-[100%] p-[10px] sticky top-0 z-10 flex m-auto bg-white"
      >
        <img className="h-[35px] text-left" src={logo} alt="AlmaBetterLogo" />
      </div>
    );
  }
  
  export default LogoBar;
  