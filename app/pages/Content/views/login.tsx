import React, { useState } from 'react';
import { Spinner, Typography } from '@material-tailwind/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { authenticateUser } from '../../../services/app.routes.service';
import { User } from '../../../entities/user';

type LoginProps = {
  setUser: (user: User) => void;
};

function Login({ setUser }: LoginProps) {
  const [userAccessToken, setUserAccessToken] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLoginSubmit = async () => {
    try {
      setLoginLoading(true);
      const loginUserResponse = await authenticateUser(userAccessToken);
      localStorage.setItem('user', JSON.stringify(loginUserResponse.user));
      setUser(loginUserResponse.user);
      setLoginLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="w-full text-center">
        <Typography variant="small">To connect your account, go to:</Typography>
        <Typography variant="small" className="text-xs">
          <strong className="font-semibold">Settings</strong> {' > '}
          <strong className="font-semibold">Access Token</strong>
        </Typography>
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
          onChange={(e) => setUserAccessToken(e.target.value)}
          value={userAccessToken}
        ></Input>
        <Button
          type="submit"
          variant="default"
          className="w-full"
          disabled={userAccessToken.length === 0}
        >
          Connect Account
          {loginLoading && (
            <Spinner color="gray" className="w-4 h-4 ml-2"></Spinner>
          )}
        </Button>
      </form>
    </div>
  );
}

export default Login;
