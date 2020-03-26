import React from 'react';
import {
  Grid,
  Header,
  Container,
  Segment,
  Button,
  Divider,
  Responsive
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Home = props => {
  const givingCategories = ['Purpose 1', 'Purpose 2', 'Purpose 3'];

  return (
    <Container className="page" textAlign='center'>
      <Header className='home-lede' size='huge' content='Giving' />
      <Grid columns={3} padded stackable verticalAlign='middle'>
        <Grid.Row>
          {givingCategories.map((purpose, key) => (
            <Grid.Column
              as={Link}
              to={{ pathname: '/donate', state: { purpose } }}
              key={key}
            >
              <Segment as={Button} padded='very'>
                <Header content={purpose} />
              </Segment>
            </Grid.Column>
          ))}
        </Grid.Row>
        <Responsive as={Divider} hidden minWidth={768} />
        <Grid.Row centered>
          <Grid.Column as={Link} to='/donate'>
            <Segment as={Button} padded='very'>
              <Header content='Other' />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Home;
