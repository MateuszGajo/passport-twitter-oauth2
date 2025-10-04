import { Profile } from './models/profile';
import { TwitterUserInfo } from './models/twitterUserInfo';

export const mapUserProfile = (json: string | TwitterUserInfo): Profile => {
  let parsedJson: TwitterUserInfo;
  if ('string' === typeof json) {
    parsedJson = JSON.parse(json) as unknown as TwitterUserInfo;
  } else {
    parsedJson = json;
  }

  const photos = parsedJson.profile_image_url
    ? [{ value: parsedJson.profile_image_url }]
    : [];
  const emails = parsedJson.confirmed_email
    ? [{ value: parsedJson.confirmed_email }]
    : undefined;
  const profile: Profile = {
    provider: 'twitter',
    id: parsedJson.id,
    username: parsedJson.username,
    displayName: parsedJson.name,
    profileUrl: parsedJson.url,
    photos,
    emails,
  };

  return profile;
};
