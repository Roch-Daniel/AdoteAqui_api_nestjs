import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetsDTO } from './dto/create-pets-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutPetsDTO } from './dto/update-put-pets-dto';
import { UpdatePatchPetsDTO } from './dto/update-patch-pets-dto';

@Injectable()
export class PetsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.pet.findMany();
  }

  async findOne(id: number) {
    //Usei findUnique pois nela só tem o id para passar, o findFirst pode ser várias chaves que poderia pesar
    await this.exists(id);
    return this.prisma.pet.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreatePetsDTO) {
    return await this.prisma.pet.create({
      data,
    });
  }

  async update(id: number, data: UpdatePutPetsDTO) {
    await this.exists(id);
    return this.prisma.pet.update({
      data,
      where: {
        id,
      },
    });
  }

  async updateOne(id: number, data: UpdatePatchPetsDTO) {
    await this.exists(id);
    return this.prisma.pet.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.pet.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    //Fiz um count para usar a memoria do prisma que já sabe quantos id ele tem
    //Dessa forma é mais rápido ele procurar
    if (
      !(await this.prisma.pet.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`Pet ${id} não encontrado`);
    }
  }
}
