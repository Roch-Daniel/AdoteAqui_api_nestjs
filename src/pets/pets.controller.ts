import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetsDTO } from './dto/create-pets-dto';
import { UpdatePutPetsDTO } from './dto/update-put-pets-dto';
import { UpdatePatchPetsDTO } from './dto/update-patch-pets-dto';
import { ParamId } from 'src/decorators/param-id-decorator';
import { AuthGuard } from 'src/guards/auth.guard';

//Interceptors - Executar antes de qualquer execução do controller
//@UseInterceptors(LogInterceptor)
@UseGuards(AuthGuard)
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  async getAll() {
    return this.petsService.findAll();
  }

  @Get(':id')
  async getOne(@ParamId('id') id: number) {
    return this.petsService.findOne(id);
  }

  @Get(':id/:name')
  async getTwo(@ParamId('id') id: number, @Param('name') name: string) {
    return `Id é ${id} e o nome: ${name}`;
  }

  //@HttpCode(204) - Controlar https
  @Post()
  async create(@Body() body: CreatePetsDTO) {
    return this.petsService.create(body);
  }

  @Patch(':id')
  async update(@ParamId('id') id: number, @Body() body: UpdatePatchPetsDTO) {
    return this.petsService.updateOne(id, body);
  }

  @Put(':id')
  async updateAll(@ParamId('id') id: number, @Body() body: UpdatePutPetsDTO) {
    return this.petsService.update(id, body);
  }

  //o HttpStatus.NO_CONTENT é apenas uma conveção onde em vez de colocar 204 ele vai colocar o 204 pra mim
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@ParamId('id') id: number) {
    return this.petsService.remove(id);
  }
}
