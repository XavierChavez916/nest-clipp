import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Badge } from './entities/badge.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BadgeService {

  constructor(
    @InjectModel(Badge.name)
    private readonly badgeModel: Model<Badge>
  ) { }

  async create(createBadgeDto: CreateBadgeDto) {
    createBadgeDto.titulo = createBadgeDto.titulo.toLocaleLowerCase();
    try {
      const badge = await this.badgeModel.create(createBadgeDto)
      return badge;

    } catch (error) {
      this.handleExceptions(error)
    }
  }

  findAll() {
    return `This action returns all badge`;
  }

  async findOne(term: string) {
    let badge: Badge;
    if (!isNaN(+term)) {
      badge = await this.badgeModel.findOne({ no: term })
    }

    // Mongo ID
    if (!badge && isValidObjectId(term)) {
      badge = await this.badgeModel.findById(term)
    }

    // Name

    if (!badge) {
      badge = await this.badgeModel.findOne({ titulo: term.toLowerCase().trim() })
    }

    if (!badge) throw new NotFoundException(`Badge with id, name or no "${term}" not found`)

    return badge;
  }

  async update(term: string, updateBadgeDto: UpdateBadgeDto) {
    const badge = await this.findOne( term );
    if( updateBadgeDto.titulo ){
      updateBadgeDto.titulo = updateBadgeDto.titulo.toLowerCase()
      
    }

    try {
      await badge.updateOne( updateBadgeDto, { new: true })
      return { ...badge.toJSON(), ...updateBadgeDto };
      
    } catch (error) {
      this.handleExceptions(error)
    }

  }

  async remove(id: string) {
    // const badge = await this.findOne( id )
    // await badge.deleteOne();
    // return { id }
    // const result = await this.badgeModel.findByIdAndDelete( id );
    const { deletedCount } = await this.badgeModel.deleteMany({ _id: id });
    if( deletedCount === 0) {
      throw new BadRequestException(`Badge with id "${ id }" not found`)
    }
    return;
  }

  private handleExceptions( error: any ) {
    if( error.code === 11000 ){
      throw new BadRequestException(`Badge exists in db ${ JSON.stringify( error.keyValue )}`)
    }
    console.log( error )
    throw new InternalServerErrorException(`Can't create Badge - Check server logs`)
  }
}
