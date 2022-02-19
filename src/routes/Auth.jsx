import AuthForm from 'components/AuthForm';
import { githubProvider, googleProvider, signIn_popup } from 'FB_Instance';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const Auth = () => {
  const onSocialClick = async ({ target: { name } }) => {
    let provider;

    if (name === 'google') {
      provider = googleProvider();
    } else if (name === 'github') {
      provider = githubProvider();
    }

    const data = await signIn_popup(provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#04AAFF'}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button name="google" onClick={onSocialClick} className="authBtn">
          Continue with Google
          <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="github" onClick={onSocialClick} className="authBtn">
          Continue with Github
          <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
