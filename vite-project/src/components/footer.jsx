import { Link } from "react-router-dom";
import Logo from "./logo";

const Footer = () => {

  return (
    <>
<footer className="footer text-black border  bg-white  mt-14  text-base-content p-10">
  <aside>
 
    <p>
     <Logo></Logo>
      <br />
      <span className="text-lg text-bold text-pretty">Providing reliable products </span>
    </p>
  </aside>
  <nav  className="">
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
    </>
  );
}

export default Footer;



