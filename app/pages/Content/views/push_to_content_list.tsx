import React, { useEffect, useState } from 'react';

import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { ScrollArea } from '../components/ui/scroll-area';
import { Spinner, Typography } from '@material-tailwind/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

import {
  ArrowLongDownIcon,
  ArrowLongRightIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDoubleDownIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  SignalIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';

import {
  HeartIcon,
  InboxArrowDownIcon,
  StarIcon,
} from '@heroicons/react/24/solid';

import {
  getCurationsByUid,
  getFeedWithFeedTagsByUid,
  pushToOwnerCuration,
  pushToOwnerFeed,
} from '../../../services/app.routes.service';
import { FeedTagBadge } from '../components/feedTagBadge';
import { FeedTag } from '../../../entities/tags';
import { ContentList, Curation, Feed } from '../../../entities/lists';
import { isFetchableURL } from '../../../utils/inputValidation';
import { BookOpenCheckIcon } from 'lucide-react';

interface DropDownMenuItemContentProps {
  name: string;
  titleSize?: 'small' | 'large';
  children?: React.ReactNode;
  photoURL?: string;
  onClick: () => void;
}

const DropDownMenuItemContent = ({
  name,
  titleSize = 'small',
  children,
  photoURL,
  onClick,
}: DropDownMenuItemContentProps) => (
  <DropdownMenuItem
    className="flex items-center cursor-pointer hover:bg-gray-100 p-2 focus-visible:border-0 w-[260px] gap-1.5"
    onClick={onClick}
  >
    {photoURL && (
      <img
        alt="Curation Picture"
        src={photoURL}
        className="aspect-square h-6 w-6 min-w-6 rounded-lg object-cover"
      />
    )}
    {children}
    <p
      className={`line-clamp-1 truncate ${
        titleSize === 'small' ? 'text-xs' : 'text-md'
      }`}
    >
      {name}
    </p>
  </DropdownMenuItem>
);

function PushToContentList({
  ownerUid,
  setShowOverlay,
}: {
  ownerUid: string;
  setShowOverlay: (overlayTitle: string) => void;
}) {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [feedTags, setFeedTags] = useState<FeedTag[]>([]);

  const [currentTabUrl, setCurrentTabUrl] = useState<string>('');

  const [annotationBody, setAnnotationBody] = useState<string>('');

  const [isShowingFeedTagOptions, setIsShowingFeedTagOptions] = useState(false);
  const [
    isShowingContentAnnotationOptions,
    setIsShowingContentAnnotationOptions,
  ] = useState(false);

  const [selectedContentList, setSelectedContentList] =
    useState<ISelectedContent | null>(null);

  const [customCurations, setCustomCurations] = useState<Curation[]>([]);
  // const [historyCuration, setHistoryCuration] = useState<Curation>();
  const [favoriteCuration, setFavoriteCuration] = useState<Curation>();
  const [queudCuration, setQueudCuration] = useState<Curation>();
  const [markedAsReadCuration, setMarkedAsReadCuration] = useState<Curation>();

  const [pushLinkLoading, setPushedLinkLoading] = useState(false);
  const [showInvalidUrlMessage, setShowInvalidUrlMessage] = useState(false);

  const MAX_ANNOTATION_BODY_LENGTH = 512;

  useEffect(() => {
    (async () => {
      try {
        const feedWithFeedTagsResponse = await getFeedWithFeedTagsByUid(
          ownerUid
        );
        setFeed(feedWithFeedTagsResponse.feed);
        setSelectedContentList({
          ...feedWithFeedTagsResponse.feed,
          contentType: 'feed',
        });
        setFeedTags(feedWithFeedTagsResponse.feedTags);

        const userCurationsResponse = await getCurationsByUid(ownerUid);
        setCustomCurations(userCurationsResponse.custom);
        // setHistoryCuration(userCurationsResponse.history);
        setFavoriteCuration(userCurationsResponse.favorites);
        setQueudCuration(userCurationsResponse.queued);
        setMarkedAsReadCuration(userCurationsResponse.markedAsRead);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [ownerUid]);

  const [appliedTagFtids, _setAppliedTagFtids] = useState<string[]>([]);
  const applyTag = (ftid: string) => {
    if (appliedTagFtids.includes(ftid)) {
      return;
    }

    _setAppliedTagFtids(appliedTagFtids.concat(ftid));
  };

  const removeTag = (ftid: string) => {
    if (!appliedTagFtids.includes(ftid)) {
      return;
    }

    _setAppliedTagFtids(
      appliedTagFtids.filter((appliedFtid) => appliedFtid !== ftid)
    );
  };

  const toggleApplyTag = (ftid: string) => {
    if (appliedTagFtids.includes(ftid)) {
      removeTag(ftid);
    } else {
      applyTag(ftid);
    }
  };

  interface ISelectedContent extends ContentList {
    contentType: 'feed' | 'curation';
  }

  useEffect(() => {
    if (isFetchableURL(currentTabUrl)) {
      setShowInvalidUrlMessage(false);
    } else {
      setShowInvalidUrlMessage(true);
    }
  }, [currentTabUrl]);

  const handlePushToContentList = async () => {
    try {
      if (!isFetchableURL(currentTabUrl)) {
        setShowInvalidUrlMessage(true);
        return;
      }

      if (selectedContentList === null) {
        return;
      }

      setPushedLinkLoading(true);

      if (selectedContentList.contentType === 'feed') {
        const response = await pushToOwnerFeed(
          ownerUid,
          currentTabUrl,
          appliedTagFtids,
          annotationBody
        );

        setPushedLinkLoading(false);
        setShowOverlay('My feed');
      } else if (selectedContentList.contentType === 'curation') {
        const response = await pushToOwnerCuration(
          selectedContentList.guid,
          currentTabUrl,
          annotationBody
        );

        setPushedLinkLoading(false);
        setShowOverlay(selectedContentList.name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCurrentTabUrl(window.location.href);
  }, []);

  return (
    <>
      {selectedContentList !== null && feed !== null ? (
        <form
          className="flex flex-col justify-between h-full"
          onSubmit={(e) => {
            e.preventDefault();
            handlePushToContentList();
          }}
        >
          <Textarea
            placeholder="Link body"
            rows={4}
            value={currentTabUrl}
            className="resize-none"
            onChange={(event) => {
              setCurrentTabUrl(event.target.value);
            }}
          />

          <div className="relative h-5 flex flex-col justify-center">
            <p className="text-xs text-red-400 pl-1">
              {showInvalidUrlMessage &&
                currentTabUrl.length > 0 &&
                'Invalid URL'}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between">
                <p></p>
                <p className="flex text-xs items-center">
                  {selectedContentList.contentType === 'feed' ? (
                    <SignalIcon className="w-4 h-4 mr-1.5"></SignalIcon>
                  ) : (
                    <Square3Stack3DIcon className="w-4 h-4 mr-1.5"></Square3Stack3DIcon>
                  )}
                  {selectedContentList.name}
                </p>
                <p>
                  <ChevronDownIcon className="h-3 w-3" />
                </p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full">
              <ScrollArea className="h-44 w-full">
                <DropdownMenuGroup>
                  <p className="px-2 py-0.5 font-semibold text-black text-xs">
                    Feeds
                  </p>
                  <DropDownMenuItemContent
                    name={feed.name}
                    onClick={() =>
                      setSelectedContentList({ ...feed, contentType: 'feed' })
                    }
                  >
                    <SignalIcon className="w-4 h-4" />
                  </DropDownMenuItemContent>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <p className="px-2 py-0.5 font-semibold text-black text-xs">
                    Native Curations
                  </p>
                  {favoriteCuration && (
                    <DropDownMenuItemContent
                      name={favoriteCuration.name}
                      // photoURL={favoriteCuration.photoURL}
                      onClick={() =>
                        setSelectedContentList({
                          ...favoriteCuration,
                          contentType: 'curation',
                        })
                      }
                    >
                      <HeartIcon className="w-4 h-4 text-gray-800" />
                    </DropDownMenuItemContent>
                  )}
                  {queudCuration && (
                    <DropDownMenuItemContent
                      name={queudCuration.name}
                      // photoURL={historyCuration.photoURL}
                      onClick={() =>
                        setSelectedContentList({
                          ...queudCuration,
                          contentType: 'curation',
                        })
                      }
                    >
                      <InboxArrowDownIcon className="w-4 h-4 text-gray-800" />
                    </DropDownMenuItemContent>
                  )}
                  {markedAsReadCuration && (
                    <DropDownMenuItemContent
                      name={markedAsReadCuration.name}
                      // photoURL={historyCuration.photoURL}
                      onClick={() =>
                        setSelectedContentList({
                          ...markedAsReadCuration,
                          contentType: 'curation',
                        })
                      }
                    >
                      <BookOpenCheckIcon className="w-4 h-4 text-gray-800" />
                    </DropDownMenuItemContent>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <p className="px-2 py-0.5 font-semibold text-black text-xs">
                    My Curations
                  </p>
                  {customCurations.map((item, index) => (
                    <DropDownMenuItemContent
                      name={item.name}
                      photoURL={item.photoURL}
                      onClick={() =>
                        setSelectedContentList({
                          ...item,
                          contentType: 'curation',
                        })
                      }
                    >
                      {/* <Square3Stack3DIcon className="w-4 h-4" /> */}
                    </DropDownMenuItemContent>
                  ))}
                </DropdownMenuGroup>
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            type="submit"
            variant="default"
            className="mt-2 w-full"
            disabled={currentTabUrl.length === 0}
          >
            Push link
            {pushLinkLoading && (
              <Spinner color="gray" className="w-4 h-4 ml-2"></Spinner>
            )}
          </Button>

          <div className="flex justify-center mt-6">
            <p className="absolute transform translate-y-0.5 -translate-x-8 text-[0.65rem]">
              (optional)
            </p>
            <ArrowLongDownIcon className="w-5 h-5 text-gray-600" />
          </div>

          {selectedContentList.contentType === 'feed' && (
            <div className="mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                onClick={() => {
                  setIsShowingFeedTagOptions(!isShowingFeedTagOptions);
                }}
                className="hover:cursor-pointer text-xs font-semibold"
              >
                Tag it up
              </Typography>
              <div className="mt-1 flex flex-wrap gap-x-1 gap-y-1">
                {feedTags.map((tag) => {
                  return (
                    <div
                      className="relative cursor-pointer"
                      onClick={() => {
                        toggleApplyTag(tag.ftid);
                      }}
                    >
                      {appliedTagFtids.includes(tag.ftid) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-gray-300 opacity-80 rounded-md border-2 border-black w-full h-full"></div>
                          <CheckIcon className="w-4 h-4 text-green-600 absolute" />
                        </div>
                      )}
                      <FeedTagBadge tag={tag} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <Typography
            variant="small"
            color="blue-gray"
            onClick={() => {
              setIsShowingFeedTagOptions(!isShowingFeedTagOptions);
            }}
            className="hover:cursor-pointer text-xs font-semibold mt-5"
          >
            Annotation
          </Typography>

          <Textarea
            rows={4}
            placeholder="Annotation body"
            value={annotationBody}
            className="resize-none mt-1 scrollbar scrollbar-thin overflow-auto scrollbar-thumb-gray-500 scrollbar-track-gray-100"
            onChange={(event) => {
              setAnnotationBody(event.target.value);
            }}
          />
          <p className="flex justify-end mt-0.5">
            {annotationBody.length} / {MAX_ANNOTATION_BODY_LENGTH}
          </p>

          <Button
            type="submit"
            variant="default"
            className="w-full mt-4"
            disabled={currentTabUrl.length === 0}
          >
            Push link
            {pushLinkLoading && (
              <Spinner color="gray" className="w-4 h-4 ml-2"></Spinner>
            )}
          </Button>
        </form>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner color="blue" className="w-10 h-10"></Spinner>
        </div>
      )}
    </>
  );
}

export default PushToContentList;
