import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import MetamaskButton from './MetamaskButton';

const Header = (props) => {
    return (
        <React.Fragment>
            <Navbar variant="light" bg="secondary">
                <Navbar.Brand href="/"><i classname="fas fa-home"></i> Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href={'/createNft'}><i class="fas fa-cookie-bite"></i> Create NFT</Nav.Link>
                        <Nav.Link href={'/assignments'}><i class="fas fa-utensils"></i> Study Table</Nav.Link>
                        <Nav.Link href={'/market'}><i class="fas fa-funnel-dollar"></i> Marketplace</Nav.Link>
                    </Nav>
                    <Nav>
                        { props.account !== null ? <>Connected account:&nbsp;<strong>{props.account}</strong></> : <MetamaskButton /> }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    );
}

export default Header;