import { Body, Controller, Post, Req } from '@nestjs/common';
import axios from 'axios';
import { IRequest } from '../shared/interfaces/request';

@Controller('game')
export class GameController {
  @Post('/join')
  // @UseGuards(IsLoggedGuard)
  public async joinRoom(@Req() req: IRequest, @Body() room: { room: string }) {
    const API_KEY = 'k6ZIUsMJjyNjjCyjjTRrw';
    // const user = await this.userService.get(req.user.id!);
    // Check if this is a valid user
    const userID = '1';

    const resources = [
      {
        object: 'room',
        room: room.room,
        permission: 'join',
      },
    ];

    try {
      const response = await axios.post(
        'https://super.roomservice.dev/provision',
        JSON.stringify({
          user: userID,
          resources: resources,
        }),
        {
          headers: {
            Authorization: `Bearer: ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
}
