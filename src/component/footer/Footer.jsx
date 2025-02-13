import { Container } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="bg-light text-center py-3 border-top">
            <Container>
                <p className="mb-0">&copy; {new Date().getFullYear()} FLC</p>
            </Container>
        </footer>
    );
};

export default Footer;