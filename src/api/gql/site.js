import gql from 'graphql-tag';

export const loginPublic = gql`
  mutation loginPublic($in: LoginInput!) {
    loginPublic(in: $in) {
      accessToken
      expiresIn
    }
  }
`;
