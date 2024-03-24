import React, { useState } from 'react';
import { Spinner } from '@material-tailwind/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { authenticateUser } from '../../../services/app.routes.service';
import { User } from '../../../entities/user';
import { DEFAULT_RESPONSE_ERROR_TEXT } from '../../../entities/response_status';

type LoginProps = {
  setRootUser: (user: User) => void;
  setRootAccountAccessToken: (accountAccessToken: string) => void;
};

function Login({ setRootUser, setRootAccountAccessToken }: LoginProps) {
  const [accountAccessToken, setAccountAccessToken] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [responseErrorText, setResponseErrorText] = useState('');

  const handleLoginSubmit = async () => {
    try {
      setLoginLoading(true);
      const response = await authenticateUser({
        accountAccessToken,
      });

      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem(
          'token',
          JSON.stringify(response.data.accountAccessToken)
        );

        setRootUser(response.data.user);
        setRootAccountAccessToken(response.data.accountAccessToken);
      } else {
        setResponseErrorText(response.error || DEFAULT_RESPONSE_ERROR_TEXT);
      }

      setLoginLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="w-full text-center">
        <p className="text-sm">To connect your account, go to:</p>
        <p className="text-xs">
          <strong className="font-semibold">Settings</strong> {' > '}
          <strong className="font-semibold">Access Token</strong>
        </p>
      </div>

      <form
        className="grid grid-cols-1 gap-y-2.5 mt-10"
        onSubmit={(e) => {
          e.preventDefault();

          handleLoginSubmit();
        }}
      >
        <Input
          type="text"
          placeholder="Account access token"
          className="w-full"
          onChange={(e) => setAccountAccessToken(e.target.value)}
          value={accountAccessToken}
        ></Input>
        <Button
          type="submit"
          variant="default"
          className="w-full"
          disabled={accountAccessToken.length === 0 || loginLoading}
        >
          Connect Account
          {loginLoading && (
            <Spinner color="gray" className="w-4 h-4 ml-2"></Spinner>
          )}
        </Button>
      </form>

      <p className="text-xs text-red-400 text-center mt-2">
        {responseErrorText}
      </p>
    </div>
  );
}

export default Login;
