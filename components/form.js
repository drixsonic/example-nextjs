import { useState } from 'react';
import Webauthn from './webauthn';
import { validateEmail } from '../lib/helpers';

const Form = ({ onEmailSubmit, onWebauthnSubmit, isLoading, disabled }) => {
  const [email, setEmail] = useState('');
  const [invalidEmailError, setInvalidEmailError] = useState(false);

  const mailURL =
    'https://www.pinclipart.com/picdir/big/52-525907_white-email-symbol-transparent-clipart-email-address-mail.png';

  return (
    <>
      <form>
        <h3>Login</h3>
        <label>
          <input
            type='email'
            name='email'
            value={email}
            required
            placeholder='Email'
            className={`email-input ${invalidEmailError && 'invalid-email'}`}
            onChange={(e) => {
              setInvalidEmailError(false);
              setEmail(e.target.value);
            }}
          />
        </label>

        <div className='submit'>
          <button
            type='submit'
            disabled={disabled}
            onClick={(e) => {
              e.preventDefault();
              !email || !validateEmail(email) ? setInvalidEmailError(true) : onEmailSubmit(email);
            }}
          >
            Send Magic Link
          </button>
          <Webauthn
            onSubmit={onWebauthnSubmit}
            email={email}
            isLoading={isLoading}
            setInvalidEmailError={setInvalidEmailError}
          />
        </div>
      </form>
      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
          text-align: center;
        }
        .email-input {
          padding: 10px;
          margin: 1rem auto;
          border: 1px solid #ccc;
          border-radius: 50px;
          outline: none;
          transition: 0.5s;
          width: 80%;
          background-image: url(${mailURL});
          background-size: 18px;
          background-repeat: no-repeat;
          background-position: 5% 50%;
          padding-left: 43px;
        }
        .email-input:focus {
          border: 1px solid #888;
        }
        .invalid-email {
          border: 1px solid #ffabab;
        }
        .submit {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          justify-content: space-between;
          width: 82%;
          margin: 0 auto;
        }
        .submit > a {
          text-decoration: none;
        }
        .submit > button {
          padding: 0.6rem 1rem;
          cursor: pointer;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 50px;
          width: 80%;
          outline: none;
          transition: 0.3s;
          margin: 0 auto;
          font-size: 13px;
          background-image: url(airplane.png);
          background-size: 21px;
          background-repeat: no-repeat;
          background-position: 12% 50%;
          padding-left: 38px;
          width: 77%;
        }
        .submit > button:hover {
          border-color: #888;
        }
      `}</style>
    </>
  );
};

export default Form;