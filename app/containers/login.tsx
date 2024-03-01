import React, { useState } from 'react';
import { Typography } from '@material-tailwind/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { authenticateUser } from '../services/app.routes.service';
import { User } from '../entities/user';

type LoginProps = {
  setUser: (user: User) => void;
};

function Login({ setUser }: LoginProps) {
  const [userAccessToken, setUserAccessToken] = useState('');

  const handleLoginSubmit = async () => {
    try {
      const loginUserResponse = await authenticateUser(userAccessToken);
      localStorage.setItem('user', JSON.stringify(loginUserResponse.user));
      setUser(loginUserResponse.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="w-full text-center">
        <Typography variant="small">To connect your account, go to:</Typography>
        <Typography variant="small" className="text-xs">
          <strong className="font-semibold">Settings</strong> {' > '}
          <strong className="font-semibold">Access Token</strong>
        </Typography>
      </div>

      <form
        className="grid grid-cols-1 gap-y-2.5 mt-5"
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
          variant="outline"
          className="text-gray-700 hover:text-black w-full"
          disabled={userAccessToken.length === 0}
        >
          Connect Account
        </Button>
      </form>
    </div>
  );
}

export default Login;
