import { Curation, Feed } from '../entities/lists';
import { FeedTag } from '../entities/tags';
import { User } from '../entities/user';

export async function authenticateUser(
  userAccessToken: string
): Promise<{ user: User }> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/browser_extension/auth/${userAccessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }
    );

    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw error;
  }
}

export async function getFeedWithFeedTagsByUid(
  uid: string
): Promise<{ feed: Feed; feedTags: FeedTag[] }> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/browser_extension/get_feed_with_feed_tags_by_uid/${uid}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw error;
  }
}

export async function getCurationsByUid(uid: string): Promise<{
  custom: Curation[];
  history: Curation;
  favorites: Curation;
  queued: Curation;
  markedAsRead: Curation;
}> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/browser_extension/get_curations_by_uid/${uid}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const responseJson = await response.json();

    return {
      custom: responseJson.curationsByGroup.Custom,
      history: responseJson.curationsByGroup.History[0],
      favorites: responseJson.curationsByGroup.Favorites[0],
      queued: responseJson.curationsByGroup.Queued[0],
      markedAsRead: responseJson.curationsByGroup.MarkedAsRead[0],
    };
  } catch (error) {
    throw error;
  }
}

export async function pushToOwnerFeed(
  uid: string,
  url: string,
  feedTagFtids: string[],
  annotationBody: string
) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/browser_extension/push_to_feed/${uid}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url,
          feedTagFtids: feedTagFtids,
          annotationBody: annotationBody,
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function pushToOwnerCuration(
  guid: string,
  url: string,
  annotationBody: string
) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/browser_extension/push_to_owner_curation_by_guid/${guid}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url,
          annotationBody: annotationBody,
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
