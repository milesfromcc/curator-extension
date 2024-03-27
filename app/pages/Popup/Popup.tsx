import React, { SetStateAction, useEffect, useState } from 'react';
import { Spinner, Typography } from '@material-tailwind/react';
import Login from '../Content/views/login';
import PushToContentList from '../Content/views/push_to_content_list';

import { ChevronDown, CopyPlusIcon, RadioTowerIcon } from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../Content/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '../Content/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Content/components/ui/tooltip';
import { ISelectedContentOverlay } from '../../entities/lists';
import { Textarea } from '../Content/components/ui/textarea';
import config from '../../config';

let SERVER_URL: string;
if (config.environment === 'development') {
  SERVER_URL = config.development_url;
} else {
  SERVER_URL = config.production_url;
}

const Popup = () => {
  const [overlayContentList, setOverlayContentList] =
    useState<ISelectedContentOverlay | null>(null);

  const [rootUser, setRootUser] = useState<User | null>(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : null
  );

  const [accountAccessToken, setAccountAccessToken] = useState<string | null>(
    localStorage.getItem('token')
      ? JSON.parse(localStorage.getItem('token') || '')
      : null
  );

  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(
    rootUser !== null ? true : false
  );

  const [activeViewTab, setActiveViewTab] = useState<
    'loading' | 'login' | 'push_to_content_list'
  >('login');

  useEffect(() => {
    setUserIsLoggedIn(rootUser !== null ? true : false);
  }, [rootUser]);

  useEffect(() => {
    setActiveViewTab(userIsLoggedIn ? 'push_to_content_list' : 'login');
  }, [userIsLoggedIn]);

  const handleLogout = () => {
    setRootUser(null);
    setAccountAccessToken(null);
    localStorage.removeItem('user');
  };

  return (
    <div
      className={`relative h-full ${
        overlayContentList !== null
          ? 'overflow-hidden'
          : 'scrollbar-thin overflow-auto scrollbar-thumb-gray-500 scrollbar-track-gray-100'
      }`}
    >
      {overlayContentList !== null && (
        <button
          className="absolute inset-0 flex z-10 flex-col h-full justify-center items-center"
          onClick={() => {
            window.close();
          }}
        >
          <div className="bg-gray-800 opacity-75 backdrop-blur-2px w-full h-full pointer-events-none"></div>
          <div className="absolute flex flex-col bg-white rounded h-[400px] w-4/5">
            <div className="bg-gray-100 p-2.5 w-full justify-center items-center rounded-t flex flex-col">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
              <p className="mt-2.5">
                Saved to: <strong>{overlayContentList.name}</strong>
              </p>
            </div>
            <div className="grow w-full flex flex-col justify-between p-2.5 pb-5">
              <div></div>
              <p>click anywhere to close</p>

              <div className="flex flex-col gap-y-2">
                <Button
                  variant="outline"
                  className="w-full text-xs flex justify-center items-center"
                  onClick={() => {
                    window.open(
                      `${SERVER_URL}/${
                        overlayContentList.contentType === 'feed'
                          ? 'feed_manager'
                          : `curation_station/?guid=${overlayContentList.guid}`
                      }`,
                      '_blank'
                    );
                  }}
                >
                  <p>Edit in the</p>
                  <p className="flex items-center">
                    {overlayContentList.contentType === 'feed' ? (
                      <RadioTowerIcon className="h-4 w-4 mx-1.5" />
                    ) : (
                      <CopyPlusIcon className="h-4 w-4 mx-1.5" />
                    )}
                    {overlayContentList.contentType === 'feed'
                      ? 'Feed Manager'
                      : 'Curation Station'}
                  </p>
                </Button>

                <Button
                  variant="outline"
                  className="w-full "
                  onClick={() => {
                    window.open(
                      `${SERVER_URL}/${overlayContentList.ownerUid}/${
                        overlayContentList.contentType === 'feed'
                          ? 'feed'
                          : overlayContentList.guid
                      }`,
                      '_blank'
                    );
                  }}
                >
                  <div className="w-4/5 mx-auto text-xs flex justify-center items-center">
                    <p>View</p>
                    <div className="flex items-center w-fit max-w-full">
                      <p>
                        {overlayContentList.contentType === 'feed' ? (
                          <SignalIcon className="w-4 h-4 mx-1.5"></SignalIcon>
                        ) : (
                          <Square3Stack3DIcon className="w-4 h-4 mx-1.5"></Square3Stack3DIcon>
                        )}
                      </p>
                      <p className="capitalize text-left truncate overflow-ellipsis">
                        {overlayContentList.name}
                      </p>
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOverlayContentList(null);
                  }}
                  type="submit"
                  variant="default"
                  className="w-full text-sm"
                >
                  Push another link
                </Button>
              </div>
            </div>
          </div>
        </button>
      )}
      <div className="flex flex-col justify-between h-full">
        <header className="flex justify-center items-center h-fit bg-gray-100 p-2.5">
          <img src={chrome.runtime.getURL('logo.png')} className="w-5 h-5" />
          <p className="ml-0.5 text-sm">
            <strong className="font-semibold">curation</strong>space
          </p>
        </header>
        {userIsLoggedIn !== false && rootUser !== null && (
          <div className="w-full justify-between flex border-b border-gray-200 p-2">
            <div className="flex items-center">
              <img
                src={rootUser.photoURL}
                alt="profile picture"
                className="aspect-circle h-8 w-8 min-w-8 rounded-full object-cover"
              />
              <div className="ml-1.5">
                <p className="font-semibold leading-none">
                  {rootUser.displayName}
                </p>
                <p className="text-xs">
                  <a
                    href={`${SERVER_URL}/${rootUser.uid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500"
                  >
                    @{rootUser.uid}
                  </a>
                </p>
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
                      href={`${SERVER_URL}/feed_manager`}
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
                      href={`${SERVER_URL}/curation_station`}
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
                  <DropdownMenuItem>
                    <a
                      href={`${SERVER_URL}/${rootUser.uid}`}
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
                      href={`${SERVER_URL}/settings`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-start font-normal"
                    >
                      <Cog6ToothIcon className="h-4 w-4 mr-1.5 text-black" />
                      Settings
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
                      Log out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <main className="grow mt-2 mx-auto w-5/6">
          {activeViewTab === 'login' && (
            <Login
              setRootUser={setRootUser}
              setRootAccountAccessToken={setAccountAccessToken}
            />
          )}
          {activeViewTab === 'push_to_content_list' &&
            rootUser !== null &&
            accountAccessToken !== null && (
              <PushToContentList
                rootUser={rootUser}
                rootAccountAccessToken={accountAccessToken}
                setOverlayContentList={setOverlayContentList}
              />
            )}
        </main>
        <footer className="text-center mt-6">
          <div className="bg-gray-100 p-2.5 flex justify-between">
            <div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open('${SERVER_URL}', '_blank')}
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
                      href={`${SERVER_URL}/prelaunch-overview`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <QuestionMarkIcon className="w-4 h-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    Pre-launch overview
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
                      href={`${SERVER_URL}/about`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <InfoCircledIcon className="w-4 h-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top">About</TooltipContent>
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
