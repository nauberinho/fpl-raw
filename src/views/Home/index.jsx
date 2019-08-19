import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background: white;
`;

const Content = styled.div`
  padding: 5rem;
`;

const Heading = styled.div`
  text-align: center;
`;

const HeadingTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
`;

const HeadingIntroduction = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;

const Menu = styled.div`
  padding: 2rem 0;
  display: flex;
  width: 100%;
  margin-top: 10rem;
`;

const MenuLink = styled(Link)`
  display: inline-block;
  margin: auto;
  color: black;
`;

const Home = props => {
  return (
    <Container>
      <Content>
        <Heading>
          <HeadingTitle>FPL Raw</HeadingTitle>
          <HeadingIntroduction>
            Fantasy Premier League made raw
          </HeadingIntroduction>
        </Heading>
        <Menu>
          <MenuLink to="league">My League</MenuLink>
          <MenuLink to="game">Games</MenuLink>
        </Menu>
      </Content>
    </Container>
  );
};

export default withRouter(Home);
