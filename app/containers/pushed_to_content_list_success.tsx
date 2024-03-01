import React, { useEffect, useState } from 'react';

import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { ScrollArea } from '../components/ui/scroll-area';
import { Typography } from '@material-tailwind/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

import {
  ArrowLongDownIcon,
  CheckCircleIcon,
  SignalIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';

function PushedToContentListSuccess() {
  return (
    <div className="flex flex-col justify-between h-full">
      <Textarea
        // id="description"
        rows={4}
        value="https://ui.shadcn.com/docs/components/scroll-area"
        className=""
        disabled
      />

      <div className="flex justify-center">
        <CheckCircleIcon className="w-6 h-6 text-green-400" />
      </div>

      <div className="flex justify-center">
        <img
          alt="Curation Picture"
          src="https://curationspace-images.s3.us-east-2.amazonaws.com/undefined/2c60d55a"
          className="aspect-square h-6 w-6 min-w-6 rounded-lg object-cover"
        />
        <p className="ml-2 flex items-center">
          <Square3Stack3DIcon className="w-4 h-4 mr-1" />
          <span className="font-semibold leading-none text-sm">
            My Curation
          </span>
        </p>
      </div>

      <Button className="w-full">Push another link</Button>
    </div>
  );
}

export default PushedToContentListSuccess;
