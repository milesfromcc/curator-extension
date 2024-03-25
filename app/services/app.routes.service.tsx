import { Curation, Feed } from '../entities/lists';
import { ResponseStatus } from '../entities/response_status';
import { FeedTag } from '../entities/tags';
import { User } from '../entities/user';
import config from '../config';

let SERVER_URL: string;
if (config.environment === 'development') {
  SERVER_URL = config.development_url;
} else {
  SERVER_URL = config.production_url;
}

interface IResponse<Data> {
  success: boolean;
  data: Data;
  error: string;
}

async function returnFormattedResponse(response: Response) {
  return {
    success: response.status === ResponseStatus.Success,
    data: await response.json(),
    error: response.statusText,
  };
}

export async function authenticateUser({
  accountAccessToken,
}: {
  accountAccessToken: string;
}): Promise<IResponse<{ user: User; accountAccessToken: string }>> {
  try {
    const response = await fetch(`${SERVER_URL}/api/browser_extension/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accountAccessToken}`,
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({}),
    });

    return returnFormattedResponse(response);
  } catch (error) {
    throw error;
  }
}

export async function getFeedWithFeedTagsByUid({
  uid,
  accountAccessToken,
}: {
  uid: string;
  accountAccessToken: string;
}): Promise<IResponse<{ feed: Feed; feedTags: FeedTag[] }>> {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/browser_extension/get_feed_with_feed_tags_by_uid/${uid}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accountAccessToken}`,
          'Cache-Control': 'no-cache',
        },
      }
    );

    return returnFormattedResponse(response);
  } catch (error) {
    throw error;
  }
}

export async function getCurationsByUid({
  uid,
  accountAccessToken,
}: {
  uid: string;
  accountAccessToken: string;
}): Promise<
  IResponse<{
    curationsByGroup: {
      Custom: Curation[];
      History: Curation[];
      Favorites: Curation[];
      Queued: Curation[];
      MarkedAsRead: Curation[];
    };
  }>
> {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/browser_extension/get_curations_by_uid/${uid}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accountAccessToken}`,
          'Cache-Control': 'no-cache',
        },
      }
    );

    return returnFormattedResponse(response);
  } catch (error) {
    throw error;
  }
}

export async function pushToOwnerFeed({
  uid,
  url,
  feedTagFtids,
  annotationBody,
  accountAccessToken,
}: {
  uid: string;
  url: string;
  feedTagFtids: string[];
  annotationBody: string;
  accountAccessToken: string;
}): Promise<IResponse<undefined>> {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/browser_extension/push_to_feed/${uid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accountAccessToken}`,
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({
          url: url,
          feedTagFtids: feedTagFtids,
          annotationBody: annotationBody,
        }),
      }
    );

    return returnFormattedResponse(response);
  } catch (error) {
    throw error;
  }
}

export async function pushToOwnerCuration({
  guid,
  url,
  annotationBody,
  accountAccessToken,
}: {
  guid: string;
  url: string;
  annotationBody: string;
  accountAccessToken: string;
}): Promise<IResponse<undefined>> {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/browser_extension/push_to_owner_curation_by_guid/${guid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accountAccessToken}`,
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({
          url: url,
          annotationBody: annotationBody,
        }),
      }
    );

    return returnFormattedResponse(response);
  } catch (error) {
    throw error;
  }
}
