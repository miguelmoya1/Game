import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Put,
  Body,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from '../../../global';
import { encode } from '../auth/auth';
import { IsLoggedGuard } from '../shared/guards/isLogged.guard';
import { IRequest } from '../shared/interfaces/request';

@Controller('user')
export class UserController {
  constructor(protected userService: UserService) {}

  @Get()
  @UseGuards(IsLoggedGuard)
  public async getUserLogged(@Req() req: IRequest) {
    const user = await this.userService.get(req.user.id!);

    if (user) {
      return user;
    }
    throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  }

  @Get('/join/:room')
  // @UseGuards(IsLoggedGuard)
  public async joinRoom(@Req() req: IRequest, @Body() room: string) {
    const API_KEY = 'k6ZIUsMJjyNjjCyjjTRrw';
    const user = await this.userService.get(req.user.id!);

    // Check if this is a valid user
    const userID = '1';

    const resources = [
      {
        object: 'room',
        room,
        permission: 'join',
      },
    ];

    const r = await fetch('https://super.roomservice.dev/provision', {
      method: 'POST',
      headers: {
        Authorization: `Bearer: ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userID,
        resources: resources,
      }),
    });

    const response = await r.json();
    console.log(response);
    return response;

    if (user) {
      return user;
    }
    throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  }

  @Get('/all')
  @UseGuards(IsLoggedGuard)
  public async getAllUsers(@Req() req: IRequest) {
    const user = await this.userService.get(req.user.id!);
    if (user.root) {
      return await this.userService.get();
    }
    throw new HttpException(
      'No tienes permisos para ver estos datos',
      HttpStatus.UNAUTHORIZED
    );
  }

  @Put()
  @UseGuards(IsLoggedGuard)
  public async update(@Req() req: IRequest, @Body() user: IUser) {
    const userLogged = await this.userService.get(req.user.id!);

    if (userLogged) {
      return this.userService.edit(user, req.user.id!);
    }
    throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  }

  @Put('/device/info')
  @UseGuards(IsLoggedGuard)
  public async setPhoneInfo(@Req() req: IRequest, @Body() user: IUser) {
    return this.userService.setPhoneInfo(user, req.user.id!);
  }

  @Put('/admin')
  @UseGuards(IsLoggedGuard)
  public async updateAdmin(@Req() req: IRequest, @Body() user: IUser) {
    const userLogged = await this.userService.get(req.user.id!);

    if (userLogged && userLogged.root) {
      return this.userService.edit(user, user.id!);
    }
    throw new HttpException(
      'No tienes permisos para ver estos datos',
      HttpStatus.UNAUTHORIZED
    );
  }

  @Get('/:id')
  @UseGuards(IsLoggedGuard)
  public async getUser(@Req() req: IRequest, @Param('id') id: string) {
    const user = await this.userService.get(req.user.id!);

    if (user && user.root) {
      return await this.userService.get(id);
    }
    throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  }

  @Delete('/:id')
  @UseGuards(IsLoggedGuard)
  public async delete(@Req() req: IRequest, @Param('id') id: string) {
    const user = await this.userService.get(req.user.id!);
    if (user.root) {
      return await this.userService.delete(id);
    }
    throw new HttpException(
      'No tienes permisos para ver estos datos',
      HttpStatus.UNAUTHORIZED
    );
  }

  //////////////////////
  // LOGIN Y REGISTRO //
  //////////////////////
  @Post('login')
  public async login(@Body() body: IUser) {
    if (!body.email || !body.password)
      throw new HttpException(
        'Email y contraseña son requeridos',
        HttpStatus.NOT_ACCEPTABLE
      );
    return {
      token: encode(await this.userService.login(body)),
    };
  }

  @Get('token')
  @UseGuards(IsLoggedGuard)
  public token() {
    return true;
  }

  @Post('register')
  public async register(@Body() body: IUser) {
    return {
      token: encode(await this.userService.register(body)),
    };
  }

  @Get('rehydrate')
  @UseGuards(IsLoggedGuard)
  public async rehydrate(@Req() req: IRequest) {
    return {
      token: encode(await this.userService.rehydrate(req.user)),
    };
  }
}
