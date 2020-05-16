import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'reactstrap';

export default class dashboard extends Component {
  render() {
    return (
      <div>
        <Link to="/create/bootcamp">
          <Button color="secondary">Create Bootcamp</Button>
        </Link>
      </div>
    );
  }
}
