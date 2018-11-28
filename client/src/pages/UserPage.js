import React, { Component } from 'react';
import { PageWrapper } from 'components/Base';

class UserPage extends Component {
  render() {
    const { match } = this.props
    const { username } = match.params
    return (
      <PageWrapper>
        {username}
      </PageWrapper>
    );
  }
}

export default UserPage;