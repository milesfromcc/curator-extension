import React, { useEffect, useState } from 'react';
import { Spinner, Typography } from '@material-tailwind/react';
import Login from '../../containers/login';
import PushToContentList from '../../containers/push_to_content_list';
import PushedToContentListSuccess from '../../containers/pushed_to_content_list_success';
import { Button } from '../../components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import {
  Cog6ToothIcon,
  Square3Stack3DIcon,
  UserCircleIcon,
  SignalIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { InfoCircledIcon, QuestionMarkIcon } from '@radix-ui/react-icons';
import { User } from '../../entities/user';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip';

const Popup = () => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : null
  );

  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(
    user !== null ? true : false
  );

  const [activeViewTab, setActiveViewTab] = useState<
    'loading' | 'login' | 'push_to_content_list'
  >('login');

  useEffect(() => {
    setUserIsLoggedIn(user !== null ? true : false);
  }, [user]);

  useEffect(() => {
    setActiveViewTab(userIsLoggedIn ? 'push_to_content_list' : 'login');
  }, [userIsLoggedIn]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="relative h-full">
      {showOverlay && (
        <button className="absolute inset-0 flex z-10 flex-col justify-center items-center">
          <div className="bg-gray-800 opacity-75 backdrop-blur-2px w-full h-full pointer-events-none"></div>
          <div className="absolute flex flex-col items-center p-12 h-fit w-fit bg-white rounded-lg">
            <CheckCircleIcon className="h-16 w-16 text-green-600" />
            <Typography variant="small" className="font-semibold">
              Saved to {}
            </Typography>
            <p>Click anywhere to close</p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setShowOverlay(false);
              }}
              type="submit"
              variant="outline"
              className="mt-12"
            >
              Push another link
            </Button>
            <p className="mt-2">
              <a
                onClick={(e) => {
                  window.close();
                }}
              >
                Close
              </a>
            </p>
          </div>
        </button>
      )}
      <div className="flex flex-col justify-between h-full">
        {userIsLoggedIn !== false && user !== null ? (
          <header className="w-full justify-between flex border-b-2 border-gray-200 p-2">
            <div className="flex items-center">
              <img
                src={user.photoURL}
                alt="profile picture"
                className="aspect-circle h-8 w-8 min-w-8 rounded-full object-cover"
              />
              <div className="ml-1.5">
                <p className="font-semibold leading-none">{user.displayName}</p>
                <p className="text-xs">@{user.uid}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4"></ChevronDown>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <a
                      href="https://curation.space/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-start font-normal"
                    >
                      <UserCircleIcon className="h-4 w-4 mr-1.5 text-black" />
                      Profile
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a
                      href="https://curation.space"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-start font-normal"
                    >
                      <Cog6ToothIcon className="h-4 w-4 mr-1.5 text-black" />
                      Account
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <a
                      href="https://curation.space"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-start font-normal"
                    >
                      <SignalIcon className="w-4 h-4 mr-1.5 text-black" />
                      Feed Manager
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a
                      href="https://curation.space"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-start font-normal"
                    >
                      <Square3Stack3DIcon className="w-4 h-4 mr-1.5 text-black" />
                      Curation Station
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="py-0">
                    <Button
                      className="font-normal text-sm px-0 justify-start w-full"
                      size="sm"
                      variant="ghost"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
        ) : (
          <header className="w-full flex justify-center items-center border-b-2 border-gray-100 p-2.5">
            <p className="text-lg">
              curation<strong className="font-semibold">space</strong>
            </p>
          </header>
        )}
        <main className="grow mt-2 mx-auto w-5/6">
          {/* <div className="h-full"> */}
          {/* {activeViewTab === 'loading' && (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="blue" className="w-10 h-10"></Spinner>
          </div>
        )} */}
          {activeViewTab === 'login' && <Login setUser={setUser} />}
          {activeViewTab === 'push_to_content_list' && user !== null && (
            <PushToContentList
              ownerUid={user.uid}
              setShowOverlay={setShowOverlay}
            />
          )}
          {/* </div> */}
        </main>
        <footer className="text-center mt-6">
          <div className="bg-gray-100 p-2.5 flex justify-between">
            <div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  window.open('https://www.curation.space', '_blank')
                }
              >
                Open the web app
              </Button>
            </div>
            <div className="flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
                      href="https://www.curation.space"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <QuestionMarkIcon className="w-4 h-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="right">FAQ</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
                      href="https://www.curation.space"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <InfoCircledIcon className="w-4 h-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="right">About</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Popup;
