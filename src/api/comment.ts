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

export async function getComment(videoId: string) {
  try {
    const res = await fetch(
      `/api/comment?videoId=${encodeURIComponent(videoId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (res.status === 200) {
      return res.json();
    }
  } catch (error) {
    console.error('Failed to post user data:', error);
  }
}
