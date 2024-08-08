import { QueryFunctionContext } from '@tanstack/react-query';

type RequestType = {
  videoId: string;
  userId: string;
  content: string;
};

export async function postComment(reqBody: RequestType, accessToken: string) {
  try {
    const res = await fetch(`/api/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reqBody),
    });
    if (res.status === 200) {
      console.log('ok');
      return true;
    }
  } catch (error) {
    console.error('Failed to post user data:', error);
  }
  return false;
}

export async function getComment({ queryKey }: QueryFunctionContext) {
  const [_1, id] = queryKey as [string, string];
  try {
    const res = await fetch(`/api/comment?videoId=${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.error('Failed to post user data:', error);
  }
}
