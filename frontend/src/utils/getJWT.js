import Cookies from 'universal-cookie';

const getJWT = () => {
  const cookies = new Cookies();
  const jwt = cookies.get('jwt');
  return jwt ? jwt : false;
};

export default getJWT;