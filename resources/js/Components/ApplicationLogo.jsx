import Logo from "../../../public/assets/Logo/Logo.png";

export default function ApplicationLogo(props) {
    return (
        <img
            src={Logo}
            alt="Logo"
            className="w-10 h-10 rounded-full"
            {...props}
        />
    );
}
