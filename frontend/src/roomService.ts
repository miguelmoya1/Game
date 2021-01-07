import { RoomService } from '@roomservice/browser';

async function authCheck({ room }: any) {
  const response = await fetch('http://192.168.100.141:8080/api/roomservice', {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      room,
    }),
  });

  if (response.status === 401) {
    throw new Error('Unauthorized!');
  }
  return await response.json();
}

const service = new RoomService({
  auth: authCheck,
  ctx: {},
});

export default service;
