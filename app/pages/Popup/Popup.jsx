import React from 'react';
import { Typography } from '@material-tailwind/react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const Popup = () => {
  return (
    <div className="text-center flex flex-col justify-between h-full">
      <header className="w-full border-b-2 border-gray-300 pb-1">
        <Typography variant="h5">Welcome, Curator!</Typography>
      </header>
      <main>
        <div>
          <Typography variant="small">
            To connect your account, go to:
          </Typography>
          <Typography variant="small">
            <strong className="font-semibold">Settings</strong> {' > '}
            <strong className="font-semibold">Access Token</strong>
          </Typography>
        </div>

        <form className="grid grid-cols-1 gap-y-2.5 mx-auto w-3/4 mt-5">
          {/* <Label htmlFor="PLACEHOLDER">Account Access Token</Label> */}
          <Input
            type="text"
            placeholder="Account access token"
            className="w-full"
          ></Input>
          <Button
            type="submit"
            variant="outline"
            className="text-gray-700 hover:text-black w-full"
          >
            Connect Account
          </Button>
        </form>
      </main>
      <footer>
        <Typography variant="small" className="text-xs text-gray-600">
          Developed by{' '}
          <a
            href="https://www.curation.space"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-gray-800"
          >
            curation space
          </a>{' '}
          v1.0.0
        </Typography>
      </footer>
    </div>
  );
};

export default Popup;
